from fastapi import FastAPI, Response
from profiling import generate_data
from data_source import Postgresql_connect
from fastapi.middleware.cors import CORSMiddleware
import io
import secrets
import json

app = FastAPI()

QUERIES_FILE = './data/queries.json'

origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pgres = Postgresql_connect(
    secrets.pg_user,
    secrets.pg_password,
    secrets.pg_host,
    5432,
    True,
    secrets.ssh_username,
    secrets.server_ip_address,
    secrets.ssh_private_key_path,
    secrets.host
    )

db = secrets.db

@app.get("/")
def root():
    return {"message": "Hello world"}

@app.get("/get-schemas")
def get_schemas():
    schemas = pgres.schemas(db=db)
    js = schemas.to_json(orient='columns')
    return Response(media_type="application/json", content=js)

@app.get("/get-tables/{schema}")
def get_tables(schema):
    tables = pgres.tables(db,schema)
    js = tables.to_json(orient='columns')
    return Response(media_type="application/json", content=js)

@app.get("/get-report/{schema}-{table}")
def generate_report(schema, table):
    query = '''select * from {schema}.{table};'''.format(schema = schema, table =table)
    df = pgres.query(db,query)
    data = generate_data(df)
    return Response(media_type="application/json", content=data)

@app.get("/get-active-customers")
def generate_active_customer_report():
    query = '''
        select a.*
        from  ufdm.account a
        left join epi_netsuite_2021_07_13.customers c on a.epi_universal_id = c.master_customer_id 
        left join epi_netsuite_2021_07_13.billing_subscriptions bs on bs.customer_id = c.customer_id 
        left join epi_netsuite_2021_07_13.billing_subscription_lines bsl on bsl.subscription_id = bs.subscription_id
        where bsl.date_start <= now()
        and bsl.date_end >= now()
        and 1 = case  
                    when bsl.date_termination > bsl.date_end or bsl.date_termination is null then 1 else 0
                end
        GROUP BY 1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69

        union all

        select a.*
        from ufdm.account a
        left join public.fpa_final_arr_analysis ffaa on a.id = ffaa.account_id 
        where ffaa.audit_month = '2021-06-01'
        group by 1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69
                    
        union all

        select a2.*
        from ufdm.account a2
        left join zaius_salesforce.account a on a2.id = a.id 
        where a.record_type_id = '0121P000000oQMKQA2'
        and a.account_stage_c = 'Onboarding' 
        or a.account_stage_c = 'Ongoing'
        and a.name not like '%%Zaius%%' 
        and a.name not like '%%test%%'
        and a.name not like '%%zira web demo%%'
        group by 1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69
    '''
    df = pgres.query(db,query)
    data = generate_data(df)
    return Response(media_type="application/json", content=data)

@app.get("/get-missing-report/{column}")
def generate_missing_column_csv(column):
    f = open(QUERIES_FILE)
    queries_data = json.load(f)
    f.close()
    if column in queries_data.keys():
        query = queries_data[column]
    else:
        query = '''select a.id, 
                     a.name,
                     a.source,
                     a.{column} as missing_{column},
                     NULL as {column}_found
                from ufdm.account a
                where a.{column} is null;'''.format(column = column)
    df = pgres.query(db,query) 
    s = io.StringIO()
    df.to_csv(s)
    data = s.getvalue()
    return Response(media_type="application/json", content=data)
    
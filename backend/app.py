from fastapi import FastAPI, Response
from profiling import generate_data
from data_source import Postgresql_connect
import secrets

app = FastAPI()

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

@app.get("/get-report")
def generate_report():
    query = "select * from ufdm.account;"
    df = pgres.query(db,query)
    data = generate_data(df)
    return Response(media_type="application/json", content=data)
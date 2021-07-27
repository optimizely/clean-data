from threading import local
from sshtunnel import SSHTunnelForwarder
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy import inspect
import pandas as pd

class PostgresqlConnect(object):
    def __init__(self, psql_user, psql_pass, pgres_host, pgres_port, ssh, ssh_user, ssh_host, ssh_pkey, localhost):
        # SSH Tunnel Variables
        self.pgres_host = pgres_host
        self.pgres_port = pgres_port
        self.localhost = localhost
        ## Postgresql credentials
        self.psql_user = psql_user
        self.psql_pass = psql_pass
        
        if ssh == True:
            self.server = SSHTunnelForwarder(
                (ssh_host, 22),
                ssh_username=ssh_user,
                ssh_private_key=ssh_pkey,
                remote_bind_address=(pgres_host, pgres_port),
            )
            server = self.server
            server.start() #start ssh server
            self.local_port = server.local_bind_port
            print(f'Server connected via SSH || Local Port: {self.local_port}...')
        elif ssh == False:
            pass

    def schemas(self, db):
        engine = create_engine(f'postgresql://{self.psql_user}:{self.psql_pass}@{self.localhost}:{self.local_port}/{db}')
        inspector = inspect(engine)
        print ('Postgres database engine inspector created...')
        schemas = inspector.get_schema_names()
        self.schemas_df = pd.DataFrame(schemas,columns=['schema name'])
        print(f"Number of schemas: {len(self.schemas_df)}")
        engine.dispose()
        return self.schemas_df
    
    def tables(self, db, schema):
        engine = create_engine(f'postgresql://{self.psql_user}:{self.psql_pass}@{self.localhost}:{self.local_port}/{db}')
        inspector = inspect(engine)
        print ('Postgres database engine inspector created...')
        tables = inspector.get_table_names(schema=schema)
        self.tables_df = pd.DataFrame(tables,columns=['table name'])
        print(f"Number of tables: {len(self.tables_df)}")
        engine.dispose()
        return self.tables_df

    def query(self, db, query):
        engine = create_engine(f'postgresql://{self.psql_user}:{self.psql_pass}@{self.localhost}:{self.local_port}/{db}')
        print (f'Database [{db}] session created...')
        self.query_df = pd.read_sql(query,engine)
        print ('<> Query Sucessful <>')
        engine.dispose()
        return self.query_df
from fastapi import FastAPI, Response
from profiling import generate_data

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello world"}

@app.get("/get-report")
def generate_report():
    query = "select * from ufdm.account;"
    data = generate_data(query)
    return Response(media_type="application/json", content=data)
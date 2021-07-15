# clean-data
A data validation system for User-Friendly Data Mart Blue Layer tables \

## Tech Stack
Frontend: React, styled-component \
Backend: FastAPI, pandas 

## For development in local machine
### Start Frontend
cd frontend \
npm install --> only for the first time to insall all needed packages \
npm run start --> browser will open system automatically, if not, go to http://localhost:3000 \
For more detail, please check README in frontend folder 

### Start Backend
cd backend \
python3 -m venv venv --> Create Python development virtual enviornment \
pip install -r requirements.txt --> insall all needed packages \
create secrets.py file inside backend folder \
put the following credential info for connecting to data warehouse \
    pg_user = \
    pg_password = \
    pg_host = \
    host = \
    db = \
    server_ip_address = \
    ssh_username = \
    ssh_private_key_path = \
    ssh_private_key_password = \ 
uvicorn app:app --reload --> start the API 
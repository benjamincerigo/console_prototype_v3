# Phoenix console prototype v3

This console prototype using redefine starting point and fastapi. 

## Set up
### API
Use `pyenv` to get the correct version or just try it with the version on your computer.

```
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

#### Run
```
uvicorn api.main:app --reload
```

You should be able to view the swaggerUI at:
http://localhost:8000/docs

Here you can create an instance using `Try out` on post instances


### webui
```
cd webui
npm install
```
#### run
```
npm run dev
```


If you have the api and the webui running you should be able to go to `http://localhost:3000/` and
see the prototype.


## DB for the prototype
The api uses sqlite and creates the data at sql_app.db. You can delete this file if you want to
delete the data.

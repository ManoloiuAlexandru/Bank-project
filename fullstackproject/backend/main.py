from fastapi import FastAPI,Request,Form
from starlette.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
app = FastAPI()

@app.get("/")
async def home():
    return {"message": "Hello from FastAPI!"}


from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

from app.routers import list_of_routes

app = FastAPI()
for route in list_of_routes:
    app.include_router(route)

app.mount("/app/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")


# @app.exception_handler(404)
# async def custom_404_handler(request: Request, __):
#     return {"404" : "Error"}

@app.get('/')
async def get_root(request: Request):
    return {"Return" : 0}
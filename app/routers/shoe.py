from fastapi import APIRouter, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import FileResponse

route = APIRouter(tags=['shoe'])

route.mount("/app/static", StaticFiles(directory="app/static"), name="static")

templates = Jinja2Templates(directory="app/templates")

# Endpoint to html with that shows the shoe model
@route.get("/shoe")
async def get_shoe(request: Request):
    return templates.TemplateResponse("shoe.html", context={"request": request})


# Endpoint of shoe model to load
@route.get("/shoe.glb")
async def get_shoe_file():
    return FileResponse("app/static/shoe/shoe/shoe.glb")


# Endpoints to materials of shoe \/

# * biegeLeather
@route.get("/textures/biegeLeather/biegeLeather.jpg")
async def get_biegeLeather():
    return FileResponse("app/static/shoe/textures/biegeLeather/biegeLeather.jpg")

@route.get("/textures/biegeLeather/biegeLeatherNormal.jpg")
async def get_biegeLeatherNormal():
    return FileResponse("app/static/shoe/textures/biegeLeather/biegeLeatherNormal.jpg")


# * blackLeather
@route.get("/textures/blackLeather/blackLeather.jpg")
async def get_blackLeather():
    return FileResponse("app/static/shoe/textures/blackLeather/blackLeather.jpg")

@route.get("/textures/blackLeather/blackLeatherNormal.jpg")
async def get_blackLeatherNormal():
    return FileResponse("app/static/shoe/textures/blackLeather/blackLeatherNormal.jpg")


# * blackPlastic
@route.get("/textures/blackPlastic/blackPlastic.jpg")
async def get_blackPlastic():
    return FileResponse("app/static/shoe/textures/blackPlastic/blackPlastic.jpg")

@route.get("/textures/blackPlastic/blackPlasticNormal.jpg")
async def get_blackPlasticNormal():
    return FileResponse("app/static/shoe/textures/blackPlastic/blackPlasticNormal.jpg")


# * blueFabric
@route.get("/textures/blueFabric/blueFabric.jpg")
async def get_blueFabric():
    return FileResponse("app/static/shoe/textures/blueFabric/blueFabric.jpg")

@route.get("/textures/blueFabric/blueFabricNormal.jpg")
async def get_blueFabricNormal():
    return FileResponse("app/static/shoe/textures/blueFabric/blueFabricNormal.jpg")


# * brownLeather
@route.get("/textures/brownLeather/brownLeather.jpg")
async def get_brownLeather():
    return FileResponse("app/static/shoe/textures/brownLeather/brownLeather.jpg")

@route.get("/textures/brownLeather/brownLeatherNormal.jpg")
async def get_brownLeatherNormal():
    return FileResponse("app/static/shoe/textures/brownLeather/brownLeatherNormal.jpg")


# * brownPlastic
@route.get("/textures/brownPlastic/brownPlastic.jpg")
async def get_brownPlastic():
    return FileResponse("app/static/shoe/textures/brownPlastic/brownPlastic.jpg")

@route.get("/textures/brownPlastic/brownPlasticNormal.jpg")
async def get_brownPlasticNormal():
    return FileResponse("app/static/shoe/textures/brownPlastic/brownPlasticNormal.jpg")


# * darkGrayFabric
@route.get("/textures/darkGrayFabric/darkGrayFabric.jpg")
async def get_darkGrayFabric():
    return FileResponse("app/static/shoe/textures/darkGrayFabric/darkGrayFabric.jpg")

@route.get("/textures/darkGrayFabric/darkGrayFabricNormal.jpg")
async def get_darkGrayFabricNormal():
    return FileResponse("app/static/shoe/textures/darkGrayFabric/darkGrayFabricNormal.jpg")


# * grayFabric
@route.get("/textures/grayFabric/grayFabric.jpg")
async def get_grayFabric():
    return FileResponse("app/static/shoe/textures/grayFabric/grayFabric.jpg")

@route.get("/textures/grayFabric/grayFabricNormal.jpg")
async def get_grayFabricNormal():
    return FileResponse("app/static/shoe/textures/grayFabric/grayFabricNormal.jpg")


# * grayFabric2
@route.get("/textures/grayFabric2/grayFabric2.jpg")
async def get_grayFabric2():
    return FileResponse("app/static/shoe/textures/grayFabric2/grayFabric2.jpg")

@route.get("/textures/grayFabric2/grayFabric2Normal.jpg")
async def get_grayFabric2Normal():
    return FileResponse("app/static/shoe/textures/grayFabric2/grayFabric2Normal.jpg")


# * grayPlastic
@route.get("/textures/grayPlastic/grayPlastic.jpg")
async def get_grayPlastic():
    return FileResponse("app/static/shoe/textures/grayPlastic/grayPlastic.jpg")

@route.get("/textures/grayPlastic/grayPlasticNormal.jpg")
async def get_grayPlasticNormal():
    return FileResponse("app/static/shoe/textures/grayPlastic/grayPlasticNormal.jpg")


# * leatherType1
@route.get("/textures/leatherType1/leatherType1.jpg")
async def get_leatherType1():
    return FileResponse("app/static/shoe/textures/leatherType1/leatherType1.jpg")

@route.get("/textures/leatherType1/leatherType1Normal.jpg")
async def get_leatherType1Normal():
    return FileResponse("app/static/shoe/textures/leatherType1/leatherType1Normal.jpg")


# * lightBrownLeather
@route.get("/textures/lightBrownLeather/lightBrownLeather.jpg")
async def get_lightBrownLeather():
    return FileResponse("app/static/shoe/textures/lightBrownLeather/lightBrownLeather.jpg")

@route.get("/textures/lightBrownLeather/lightBrownLeatherNormal.jpg")
async def get_lightBrownLeatherNormal():
    return FileResponse("app/static/shoe/textures/lightBrownLeather/lightBrownLeatherNormal.jpg")


# * pixeledFabric
@route.get("/textures/pixeledFabric/pixeledFabric.jpg")
async def get_pixeledFabric():
    return FileResponse("app/static/shoe/textures/pixeledFabric/pixeledFabric.jpg")

@route.get("/textures/pixeledFabric/pixeledFabricNormal.jpg")
async def get_pixeledFabricNormal():
    return FileResponse("app/static/shoe/textures/pixeledFabric/pixeledFabricNormal.jpg")




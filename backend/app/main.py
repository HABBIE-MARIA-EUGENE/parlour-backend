from fastapi import FastAPI
from sqlalchemy import text

from app.database.connection import engine, Base
from app.models.booking import Booking
from app.routes.bookings import router as booking_router
from app.auth.routes import router as auth_router 
from app.routes.admin_bookings import router as admin_booking_router


from app.models.gallery import Gallery
from app.routes.gallery import router as gallery_router


app = FastAPI()

Base.metadata.create_all(bind = engine)

app.include_router(booking_router)
app.include_router(auth_router)
app.include_router(admin_booking_router)
app.include_router(gallery_router)


@app.get("/")
def home():
    return {"message": "Backend is running!"}


@app.get("/db-test")
def database_test():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        return {
            "database": "connected",
            "result": result.scalar()
        }
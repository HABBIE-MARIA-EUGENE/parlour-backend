from fastapi import FastAPI
from sqlalchemy import text

from app.database.connection import engine, Base
from app.models.booking import Booking
from app.routes.bookings import router as booking_router

app = FastAPI()

Base.metadata.create_all(bind = engine)

app.include_router(booking_router)


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
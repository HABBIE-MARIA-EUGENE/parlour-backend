from fastapi import APIRouter, Depends
from sqlalchemy.orm import session

from app.database.connection import SessionLocal

router = APIRouter()

def get_db():
  db = SessionLocal()

  try:
    yield db
  finally:
    db.close()
    
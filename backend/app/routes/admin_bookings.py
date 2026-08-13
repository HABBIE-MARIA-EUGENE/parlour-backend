from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.security import get_current_admin
from app.database.connection import get_db
from app.models.booking import Booking
from app.schemas.booking import BookingResponse

router = APIRouter(
  prefix = "/admin/bookings",
  tags=["Admin Booking"]
)

@router.get("/", response_model=list[BookingResponse])
def get_all_bookings(
  current_admin:str = Depends(get_current_admin),
  db: Session = Depends(get_db)
):
  bookings = db.query(Booking).all()

  return bookings
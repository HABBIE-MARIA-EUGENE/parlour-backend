from fastapi import APIRouter, Depends
from sqlalchemy.orm import session

from app.database.connection import get_db
from app.models.booking import Booking
from app.schemas.booking import BookingCreate, BookingResponse

router = APIRouter(
  prefix="/bookings",
  tags=["Bookings"]
)


@router.post("/", response_model=BookingResponse)
def create_booking(
  booking: BookingCreate,
  db: session = Depends(get_db)
):
  new_booking = Booking(
    customer_name = booking.customer_name,
    phone = booking.phone,
    service = booking.service,
    booking_date = booking.booking_date,
    booking_time = booking.booking_time
  )


  db.add(new_booking)
  db.commit()
  db.refresh(new_booking)

  return new_booking
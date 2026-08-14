from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.security import get_current_admin
from app.database.connection import get_db
from app.models.booking import Booking
from app.schemas.booking import BookingResponse, BookingUpdate

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


@router.get("/{booking_id}", response_model=BookingResponse)
def get_booking(
  booking_id: int,
  current_admin:str = Depends(get_current_admin),
  db: Session = Depends(get_db)
):
  booking = (
    db.query(Booking)
    .filter(Booking.id == booking_id)
    .first()
  )

  if booking is None:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="No bookings found"
    )

  return booking

@router.put("/{booking_id}", response_model=BookingResponse)
def update_booking(
  booking_id: int,
  booking_data: BookingUpdate,
  _current_admin: str = Depends(get_current_admin),
  db: Session = Depends(get_db)
):
  booking = (
    db.query(Booking).filter(Booking.id == booking_id).first()
  )

  if booking is None:
    raise HTTPException(
      status_code= status.HTTP_404_NOT_FOUND,
      detail = "Booking not found"
    )

  booking.status = booking_data.status

  db.commit()
  db.refresh(booking)

  return booking


@router.delete("/{booking_id}")
def delete_booking(
  booking_id: int,
  _current_admin: str = Depends(get_current_admin),
  db: Session = Depends(get_db)
):
  booking = (
    db.query(Booking)
    .filter(Booking.id == booking_id).first()
  )

  if booking is None:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Booking not found"
    )

  db.delete(booking)
  db.commit()

  return {
    "message": "Booking deleted"
  }
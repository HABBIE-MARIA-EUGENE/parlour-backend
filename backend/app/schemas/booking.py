from datetime import date, time, datetime
from pydantic import BaseModel

class BookingCreate (BaseModel):
  customer_name: str
  phone: str
  service: str
  booking_date: date
  booking_time: time

class BookingResponse(BaseModel):
  id: int
  customer_name: str
  phone: str
  service: str
  booking_date:date
  booking_time:time
  status: str
  created_at: datetime

  class Config:
    from_attributes = True


class BookingUpdate(BaseModel):
  status: str
    
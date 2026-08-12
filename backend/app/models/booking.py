from sqlalchemy import Column, Integer, String, Date, Time, DateTime
from sqlalchemy.sql import func

from app.database.connection import Base

class Booking(Base):
  __tablename__ = "bookings"

  id = Column(Integer, primary_key=True, index=True)
  customer_name = Column(String, nullable=False)
  phone = Column(String, nullable=False)
  service = Column(String, nullable=False)
  booking_date = Column(Date, nullable=False)
  booking_time = Column(Time, nullable=False)
  status = Column(String, default="pending")
  created_at = Column(DateTime, server_default=func.now()) 
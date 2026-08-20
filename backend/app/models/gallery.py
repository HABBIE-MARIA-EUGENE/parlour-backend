from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from app.database.connection import Base

class Gallery(Base):
  __tablename__ = "gallery"

  id = Column(Integer, primary_key=True, index=True)

  title = Column(String, nullable=True)

  image_url = Column(String, nullable=False)

  is_active = Column(Boolean, default=True)

  created_at = Column(
    DateTime, server_default=func.now()
  )

  
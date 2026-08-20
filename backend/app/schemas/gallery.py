from datetime import datetime
from pydantic import BaseModel

class GalleryResponse(BaseModel):
  id: int
  title: str | None
  image_url: str
  is_active: bool
  created_at: datetime

  class Config:
    from_attributes = True
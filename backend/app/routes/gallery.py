import os
import shutil
from uuid import uuid4

from fastapi import (
  APIRouter, Depends, File, HTTPException, UploadFile
)

from sqlalchemy.orm import Session

from app.auth.security import get_current_admin
from app.database.connection import get_db
from app.models.gallery import Gallery
from app.schemas.gallery import GalleryResponse

router = APIRouter(
  prefix="/admin/gallery",
  tags=["Admin Gallery"]
)

UPLOAD_DIR = "uploads/gallery"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/", response_model=GalleryResponse)
def upload_gallery_image(
  title: str,
  image: UploadFile = File(...),
  _current_admin: str = Depends(get_current_admin),
  db: Session = Depends(get_db)
):
  allowed_extensions = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
  }

  extension = os.path.splitext(image.filename)[1].lower()

  if extension not in allowed_extensions:
    raise HTTPException(
      status_code=400,
      detail="Inval img format"
    )

  filename = f"{uuid4()}{extension}"

  file_path = os.path.join(
    UPLOAD_DIR,
    filename
  )

  with open(file_path, "wb") as buffer:
    shutil.copyfileobj(image.file, buffer)

  image_url = f"/uploads/gallery/{filename}"

  gallery = Gallery(
    title=title,image_url=image_url
  )

  db.add(gallery)
  db.commit()
  db.refresh(gallery)

  return gallery


public_router = APIRouter(
  prefix="/gallery",
  tags=["Gallery"]
)

@public_router.get("/", response_model=list[GalleryResponse])
def get_gallery(
  db: Session = Depends(get_db)
):
  gallery = (
    db.query(Gallery)
    .filter(Gallery.is_active == True)
    .all()
  )
  return gallery



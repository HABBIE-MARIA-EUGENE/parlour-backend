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
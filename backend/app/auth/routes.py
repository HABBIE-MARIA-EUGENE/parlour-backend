import os

from fastapi import APIRouter, HTTPException, status

from app.auth.schemas import LoginRequest, TokenResponse
from app.auth.security import create_access_token

router = APIRouter(
  prefix="/auth",
  tags=["Authenticcation"]
)


import os
from datetime import datetime, timedelta, timezone

from jose import jwt
from passlib.context import CryptContext
from dotenv import load_dotenv
load_dotenv()

pwd_context = CryptContext(
                           schemes=["bcrypt"],
                           deprecated = "auto"
                           )

def verify_password(plain_password: str, stored_password: str):
  return pwd_context.verify(plain_password, stored_password)

# load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
  to_encode = data.copy()

  expire = datetime.now(timezone.utc) + timedelta(
    minutes=ACCESS_TOKEN_EXPIRE_MINUTES
  )

  to_encode.update({
    "exp": expire
  })

  token = jwt.encode(
    to_encode,
    SECRET_KEY,
    algorithm=ALGORITHM
  )

  return token
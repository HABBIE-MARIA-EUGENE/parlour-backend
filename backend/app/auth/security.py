import os
from datetime import datetime, timedelta, timezone

from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status


from dotenv import load_dotenv
load_dotenv()

# pwd_context = CryptContext(
#                            schemes=["bcrypt"],
#                            deprecated = "auto"
#                            )

# def verify_password(plain_password: str, stored_password: str):
#   return pwd_context.verify(plain_password, stored_password)

# load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl= "/auth/login")

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

  # return token

def get_current_admin(token: str = Depends(oauth2_scheme)):
  credentials_exception = HTTPException(
    status_code= status.HTTP_401_UNAUTHORIZED,
    detail="could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
  )
  try:
    payload = jwt.decode(
      token,
      SECRET_KEY,
      algorithms=[ALGORITHM]
    )  

    username = payload.get("sub")

    if username is None:
      raise credentials_exception

    return username

  except JWTError:
    raise credentials_exception

  
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta

router = APIRouter()

SECRET_KEY = "majah-nagpur-smart-city-super-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 # 24 hours

class LoginRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    user_id: int
    name: str
    email: str
    role: str
    token: str

@router.post("/login", response_model=UserResponse)
async def login_user(login_data: LoginRequest):
    # Dummy authentication logic
    # In a real app, verify against a database
    
    user_id = 1
    name = "Citizen"
    role = "citizen"
    
    if login_data.email == "admin@nagpur.gov.in" and login_data.password == "admin123":
        user_id = 999
        name = "District Admin"
        role = "admin"
    elif login_data.email == "user@nagpur.gov.in" and login_data.password == "user123":
        user_id = 1
        name = "Demo Citizen"
        role = "citizen"
    elif not login_data.email or not login_data.password:
        raise HTTPException(status_code=400, detail="Email and password required")
    else:
        # Default behavior: generic citizen login for any other email/pwd combo during demo
        user_id = sum([ord(c) for c in login_data.email]) % 1000
        name = login_data.email.split("@")[0].capitalize()
        role = "citizen"

    # Generate JWT Token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.utcnow() + access_token_expires
    to_encode = {"sub": login_data.email, "role": role, "id": user_id, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return UserResponse(
        user_id=user_id,
        name=name,
        email=login_data.email,
        role=role,
        token=encoded_jwt
    )

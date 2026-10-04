from fastapi import APIRouter
from controllers.auth_controller import (create_user, login_user)
router = APIRouter()

@router.post("/signup")

def signup(data: dict):
    return create_user(data)

@router.post("/login")

def login(data: dict):
    email = data.get("email")
    password = data.get("password")
    return login_user(email, password)
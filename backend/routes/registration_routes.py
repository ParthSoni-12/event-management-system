from fastapi import APIRouter
from controllers.registration_controller import (register_user)
router = APIRouter()

@router.post("/register")
def register(data: dict):
    result = register_user(data)
    return result
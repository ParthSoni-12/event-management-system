import os
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt

from database.connection import users_collection


JWT_SECRET = os.getenv("JWT_SECRET", "eventhub_secret_key_2026")
JWT_ALGORITHM = "HS256"


def create_token(email, role):
    payload = {
        "email": email,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=24)
    }
    token = jwt.encode(
        payload,
        JWT_SECRET,
        algorithm=JWT_ALGORITHM
    )
    return token


def create_user(data):

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name:
        return {"success": False, "message": "Name is required"}

    if not email:
        return {"success": False, "message": "Email is required"}

    if not password:
        return {"success": False, "message": "Password is required"}

    existing_user = users_collection.find_one({"email": email})

    if existing_user:
        return {"success": False, "message": "Email already registered"}

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )
    user = {
        "name": name,
        "email": email,
        "password": hashed_password.decode("utf-8"),
        "role": "user"
    }
    users_collection.insert_one(user)
    return {"success": True, "message": "Account created successfully!"}

def login_user(email, password):

    admin_email = os.getenv("ADMIN_EMAIL")
    admin_password = os.getenv("ADMIN_PASSWORD")

    if email == admin_email and password == admin_password:
        token = create_token(email, "admin")

        return {
            "success": True,
            "message": "Admin login successful",
            "token": token,
            "role": "admin"
        }

    user = users_collection.find_one({ "email": email})

    if not user:
        return {"success": False, "message": "Invalid email or password"
}

    password_match = bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    )

    if not password_match:
        return {"success": False, "message": "Invalid email or password"}

    token = create_token(email, "user")
    return {
        "success": True,
        "message": "Login successful",
        "token": token,
        "role": "user"
    }

def verify_token(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.InvalidTokenError:
        return None
from bson import ObjectId
from database.connection import (events_collection,registrations_collection)

def register_user(data):
    event_id = data.get("event_id")
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")

    if not event_id:
        return {
            "success": False,
            "message": "Event ID is required"
        }

    if not name:
        return {
            "success": False,
            "message": "Name is required"
        }

    if not email:
        return {
            "success": False,
            "message": "Email is required"
        }

    if not phone:
        return {
            "success": False,
            "message": "Phone is required"
        }

    if not ObjectId.is_valid(event_id):

        return {
            "success": False,
            "message": "Invalid event ID"
        }

    event = events_collection.find_one(
        {
            "_id": ObjectId(event_id)
        }
    )
    if not event:
        return {
            "success": False,
            "message": "Event not found"
        }
    
    registration = {
        "event_id": ObjectId(event_id),
        "name": name,
        "email": email,
        "phone": phone
    }
    
    registrations_collection.insert_one(
        registration
    )
    return {
        "success": True,
        "message": "Registration successful!"
    }
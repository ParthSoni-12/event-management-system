from bson import ObjectId

from database.connection import events_collection
from models.event_model import event_serializer


def get_all_admin_events():

    events = events_collection.find()

    return [
        event_serializer(event)
        for event in events
    ]


def add_event(data):

    event = {
        "name": data.get("name"),
        "category": data.get("category"),
        "date": data.get("date"),
        "location": data.get("location"),
        "description": data.get("description"),
        "image": data.get("image_url")
    }

    result = events_collection.insert_one(event)

    return {
        "success": True,
        "message": "Event added successfully!",
        "event_id": str(result.inserted_id)
    }


def update_event(event_id, data):

    if not ObjectId.is_valid(event_id):

        return {
            "success": False,
            "message": "Invalid event ID"
        }

    event = {
        "name": data.get("name"),
        "category": data.get("category"),
        "date": data.get("date"),
        "location": data.get("location"),
        "description": data.get("description"),
        "image": data.get("image_url")
    }

    result = events_collection.update_one(
        {
            "_id": ObjectId(event_id)
        },
        {
            "$set": event
        }
    )

    if result.matched_count == 0:

        return {
            "success": False,
            "message": "Event not found"
        }

    return {
        "success": True,
        "message": "Event updated successfully!"
    }


def delete_event(event_id):

    if not ObjectId.is_valid(event_id):

        return {
            "success": False,
            "message": "Invalid event ID"
        }

    result = events_collection.delete_one(
        {
            "_id": ObjectId(event_id)
        }
    )

    if result.deleted_count == 0:

        return {
            "success": False,
            "message": "Event not found"
        }

    return {
        "success": True,
        "message": "Event deleted successfully!"
    }
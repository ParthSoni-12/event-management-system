from bson import ObjectId
from database.connection import events_collection
from models.event_model import event_serializer

def get_all_events():
    events = events_collection.find()
    return [
        event_serializer(event)
        for event in events
    ]

def get_event_by_id(event_id):
    if not ObjectId.is_valid(event_id):
        return None
    event = events_collection.find_one(
        {
            "_id": ObjectId(event_id)
        }
    )
    if not event:
        return None
    return event_serializer(event)
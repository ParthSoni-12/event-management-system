def event_serializer(event):
    return {
        "_id": str(event["_id"]),
        "name": event["name"],
        "category": event["category"],
        "date": event["date"],
        "location": event["location"],
        "description": event["description"],
        "image": event["image"]
    }
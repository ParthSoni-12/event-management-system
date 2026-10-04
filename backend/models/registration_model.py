def registration_serializer(registration):
    return {
        "_id": str(registration["_id"]),
        "event_id": str(registration["event_id"]),
        "name": registration["name"],
        "email": registration["email"],
        "phone": registration["phone"]
    }
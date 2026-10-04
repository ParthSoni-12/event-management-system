def user_serializer(user):
    return {
        "_id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"]
    }
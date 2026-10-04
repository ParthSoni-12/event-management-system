from fastapi import (
    APIRouter,
    Header,
    HTTPException,
    Form
)

from controllers.auth_controller import verify_token

from controllers.admin_controller import (
    get_all_admin_events,
    add_event,
    update_event,
    delete_event
)


router = APIRouter()


def check_admin(authorization):

    if not authorization:

        raise HTTPException(
            status_code=401,
            detail="Authorization token required"
        )

    if not authorization.startswith("Bearer "):

        raise HTTPException(
            status_code=401,
            detail="Invalid authorization format"
        )

    token = authorization.replace(
        "Bearer ",
        ""
    )

    payload = verify_token(token)

    if not payload:

        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    if payload.get("role") != "admin":

        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )


@router.get("/events")
def get_admin_events(
    authorization: str = Header(None)
):

    check_admin(authorization)

    return {
        "success": True,
        "events": get_all_admin_events()
    }


@router.post("/events")
def create_event(

    name: str = Form(...),
    category: str = Form(...),
    date: str = Form(...),
    location: str = Form(...),
    description: str = Form(...),
    image_url: str = Form(...),

    authorization: str = Header(None)
):

    check_admin(authorization)

    data = {
        "name": name,
        "category": category,
        "date": date,
        "location": location,
        "description": description,
        "image_url": image_url
    }

    return add_event(data)


@router.put("/events/{event_id}")
def edit_event(

    event_id: str,

    name: str = Form(...),
    category: str = Form(...),
    date: str = Form(...),
    location: str = Form(...),
    description: str = Form(...),
    image_url: str = Form(...),

    authorization: str = Header(None)
):

    check_admin(authorization)

    data = {
        "name": name,
        "category": category,
        "date": date,
        "location": location,
        "description": description,
        "image_url": image_url
    }

    return update_event(
        event_id,
        data
    )


@router.delete("/events/{event_id}")
def remove_event(

    event_id: str,

    authorization: str = Header(None)
):

    check_admin(authorization)

    return delete_event(event_id)
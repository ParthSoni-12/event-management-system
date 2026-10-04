from fastapi import APIRouter, HTTPException
from controllers.event_controller import (get_all_events,get_event_by_id)
router = APIRouter()

@router.get("/events")
def get_events():
    events = get_all_events()
    return {
        "success": True,
        "events": events
    }

@router.get("/events/{event_id}")
def get_event(event_id: str):
    event = get_event_by_id(event_id)
    if not event:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )
    return {
        "success": True,
        "event": event
    }
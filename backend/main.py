from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes.event_routes import router as event_router
from routes.registration_routes import router as registration_router
from routes.auth_routes import router as auth_router
from routes.admin_routes import router as admin_router


app = FastAPI(
    title="EventHub API",
    description="Event Management System Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.include_router(event_router, prefix="/api")
app.include_router(registration_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(admin_router, prefix="/api/admin")

@app.get("/")
def home():
    return {"message": "EventHub Backend is running!"}
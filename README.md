# Event Management System

## Project Overview

The Event Management System is a Python full-stack web application that allows users to browse available events, view event details, register/login, and book events.
The system also provides an admin dashboard for managing events.
The frontend is developed using React, the backend is developed using Python FastAPI, and MongoDB is used as the database.

## Features

- User Registration
- User Login
- User Authentication
- Browse Events
- View Event Details
- Event Booking/Registration
- Admin Dashboard
- Add Events
- Edit Events
- Event Management
- Frontend-Backend API Integration
- MongoDB Database Integration

## Technologies Used

### Frontend

- React
- Vite
- React Router
- Axios
- HTML
- CSS

### Backend

- Python
- FastAPI
- Uvicorn
- PyMongo
- JWT
- bcrypt

### Database

- MongoDB

## Project Structure

```text
Event Management System/
│
├── backend/
│   │
│   │
│   ├── controllers/
│   │   ├── admin_controller.py
│   │   ├── auth_controller.py
│   │   ├── event_controller.py
│   │   └── registration_controller.py
│   │
│   ├── database/
│   │   └── connection.py
│   │
│   ├── models/
│   │   ├── event_model.py
│   │   ├── registration_model.py
│   │   └── user_model.py
│   │
│   ├── routes/
│   │   ├── admin_routes.py
│   │   ├── auth_routes.py
│   │   ├── event_routes.py
│   │   └── registration_routes.py
│   │
│   ├── .env.example
│   ├── main.py
│   └── requirements.txt
│
│
├── frontend/
│   │
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── components/
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── Navbar.css
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── AddEvent.jsx
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   └── EditEvent.jsx
│   │   │   │
│   │   │   ├── CreateAccount.jsx
│   │   │   ├── EventDetails.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

## Setup Instructions

1. Clone the Repository:

git clone YOUR_GITHUB_REPOSITORY_LINK
cd Event-Management-System

2. Backend Setup:

cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

3. Start Backend:

uvicorn main:app --reload --port 8000

4. Frontend Setup

Open another terminal:

cd frontend
npm install
npm run dev

## Team Members and Contributions

Member 1 – Dhrumi Prajapati
Frontend development
React UI
Event browsing
Event details
Authentication/booking flow
Frontend-backend integration
Testing

Member 2 – Parth Soni
Backend development
FastAPI APIs
MongoDB integration
Authentication
Event APIs
Registration APIs
Admin functionality
Testing

## Screen Recording

Project demonstration:

https://drive.google.com/file/d/1ANxERs1RhI7u1qzmuSgjyoDzvPfsw9IO/view?usp=sharing

## Conclusion

The Event Management System provides a simple and user-friendly platform for browsing and registering for events while providing administrators with tools to manage events.

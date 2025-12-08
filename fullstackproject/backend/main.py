from fastapi import FastAPI, Form, Depends, HTTPException
from backend.classes.db import *
from sqlalchemy.orm import Session
from backend.classes.models import User
from fastapi.middleware.cors import CORSMiddleware
from backend.classes.User import UserValid

from backend.classes.utils import check_message

app = FastAPI()

init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/add_user")
def add_user(
        user: UserValid,
        db: Session = Depends(get_db)
):
    try:
        db_user = User(
            first_name=user.first_name,
            last_name=user.last_name,
            date_of_birth=user.date_of_birth,
            nationality=user.nationality,
            phone_number=user.phone_number,
            address=user.address,
            email=user.email
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return {"response": "Added"}
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@app.post("/contactForm")
async def contact_form(requester_name=Form(...), email=Form(...), message=Form(...), db: Session = Depends(get_db)):
    return {"request": await check_message(requester_name, email, message, db)}

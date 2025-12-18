import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.classes.db import SessionLocal, init_db, get_db
from backend.classes.models import User

client = TestClient(app)


@pytest.fixture(scope="function")
def db_seeded():
    init_db()
    db = SessionLocal()
    user1 = User(first_name="Ion", last_name="Vasile", date_of_birth="15.04.1999", nationality="asdfas",
                 phone_number="+40755678912", address="dafasd", email="ion@yahoo.com")
    db.add(user1)
    db.commit()
    yield db
    db.query(User).delete()
    db.commit()
    db.close()


def test_server_contact_fail_not_in_db():
    payload = {
        "requester_name": "Ion Vasile",
        "email": "ion@yahoo.com",
        "message": "Hello!"
    }
    response = client.post("/contactForm", data=payload)
    assert response.status_code == 200
    assert response.json().get("result") == "You need to be registered for us to contact you"


def test_server_contact_fail_not_full_name(db_seeded):
    payload = {
        "requester_name": "Ion",
        "email": "ion@yahoo.com",
        "message": "Hello!"
    }
    response = client.post("/contactForm", data=payload)
    assert response.status_code == 200
    assert response.json().get("result") == "You have to put your full name"


def test_server_contact_correct(db_seeded):
    payload = {
        "requester_name": "Ion Vasile",
        "email": "ion@yahoo.com",
        "message": "Hello!"
    }
    response = client.post("/contactForm", data=payload)
    assert response.status_code == 200
    assert response.json().get("result") == "We will contact you soon"


def test_server_fail_wrong_format():
    payload = {
        "requester_name": "Ion Vasile",
        "vasile": "ion@yahoo.com",
        "message": "Hello!"
    }
    response = client.post("/contactForm", data=payload)
    assert response.status_code == 422

def test_add_new_user():
    payload = {
        "first_name": "Ion",
        "last_name": "Vasile",
        "date_of_birth": "1997-12-10",
        "nationality": "Romanian",
        "phone_number": "+40743287546",
        "address": "Str. Valea Rajnitelor",
        "email": "ada@example.com"
    }

    response = client.post("/add_user", json=payload)

    assert response.status_code == 200

def test_fail_to_add_new_user():
    payload = {
        "first_name": "Ion",
        "last_name": "Vasile",
        "date_of_birth": "1997-12-10",
        "nationality": "Romanian",
        "phone_number": "+407432",
        "address": "Str. Valea Rajnitelor",
        "email": "ada@example.com"
    }

    response = client.post("/add_user", json=payload)

    assert response.status_code == 422

def test_fail_to_add_new_user_wrong_number():
    payload = {
        "first_name": "Ion",
        "last_name": "Vasile",
        "date_of_birth": "1997-12-10",
        "nationality": "Romanian",
        "phone_number": "0965748390085",
        "address": "Str. Valea Rajnitelor",
        "email": "ada@example.com"
    }

    response = client.post("/add_user", json=payload)

    assert response.status_code == 422
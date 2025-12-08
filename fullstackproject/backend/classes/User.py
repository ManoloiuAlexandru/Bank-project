from pydantic import BaseModel, field_validator


class UserValid(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: str
    nationality: str
    phone_number: str
    address: str
    email: str

    @field_validator("phone_number")
    def check_phone_number(cls, phone_number):
        if len(phone_number) > 13 or len(phone_number) < 12:
            raise ValueError("Phone number is wrong")
        else:
            if len(phone_number) == 12 and phone_number[0] != "+":
                raise ValueError("Phone number is wrong")
            elif len(phone_number) == 13 and phone_number[0:2] != "00":
                raise ValueError("Phone number is wrong")
        return phone_number

    @field_validator("first_name")
    def check_first_name(cls, first_name):
        if first_name.isalpha() is not True:
            raise ValueError("First name is wrong")
        return first_name

    @field_validator("last_name")
    def check_last_name(cls, last_name):
        if last_name.isalpha() is not True:
            raise ValueError("Last name is wrong")
        return last_name

    class Config:
        orm_mode = True

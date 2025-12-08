import asyncio
from sqlalchemy import select
from .models import User


def get_all_users(db):
    result = db.execute(select(User))
    return result.scalars().all()


async def check_message(name, email, message, db):
    await time_test()
    for user in get_all_users(db):
        if user.last_name == name.split()[1] and user.first_name == name.split()[0] and user.email == email:
            return "You need to register first"


async def time_test():
    await asyncio.sleep(0.2)

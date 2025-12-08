import asyncio
from sqlalchemy import select
from .models import User


def get_all_users(db):
    result = db.execute(select(User))
    return result.scalars().all()


async def check_message(name, email, message, db):
    await time_test()
    print(get_all_users(db))
    if message != "":
        return "ceva"


async def time_test():
    await asyncio.sleep(0.2)

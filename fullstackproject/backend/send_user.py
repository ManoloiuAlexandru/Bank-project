import asyncio
from aio_pika import connect_robust, Message, ExchangeType
import os

RABBITMQ_URL = os.getenv("RABBITMQ_URL", "amqp://devuser:devpass123@rabbitmq:5672/")
EXCHANGE_NAME = "app.events"

async def main():
    conn = await connect_robust(RABBITMQ_URL)
    ch = await conn.channel()
    exchange = await ch.declare_exchange(EXCHANGE_NAME, ExchangeType.DIRECT, durable=True)

    # Send a test message
    payload = "alex123"
    msg = Message(payload.encode())
    await exchange.publish(msg, routing_key="demo")
    print(f"Message sent: {payload}")

    await conn.close()

if __name__ == "__main__":
    while True:
        asyncio.run(main())

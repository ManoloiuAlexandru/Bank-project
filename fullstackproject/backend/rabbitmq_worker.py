from __future__ import annotations

# backend/worker/rabbitmq_worker.py
import os
from aio_pika import connect_robust, ExchangeType
from aio_pika.abc import AbstractRobustConnection, AbstractRobustChannel, AbstractQueue, AbstractExchange

RABBITMQ_URL = os.getenv("RABBITMQ_URL", "amqp://devuser:devpass123@rabbitmq:5672/")
EXCHANGE_NAME = "app.events"
QUEUE_NAME = "app.worker.queue"  # worker's queue name
BINDINGS = [
    ("user.created", "user.created"),
    ("contact.message", "contact.message"),
    ("demo.test", "demo")
    # add more bindings as you create more event types
]


class RabbitWorker:
    def __init__(self):
        self.conn: AbstractRobustConnection | None = None
        self.ch: AbstractRobustChannel | None = None
        self.exchange: AbstractExchange | None = None
        self.queue: AbstractQueue | None = None

    async def connect(self):
        self.conn = await connect_robust(RABBITMQ_URL)
        self.ch = await self.conn.channel()
        await self.ch.set_qos(prefetch_count=10)

        # Declare durable exchange (must match API's)
        self.exchange = await self.ch.declare_exchange(EXCHANGE_NAME, ExchangeType.DIRECT, durable=True)

        # (Optional) Dead-letter setup: uncomment if you want DLQ now
        # dlx = await self.ch.declare_exchange("app.dlx", ExchangeType.DIRECT, durable=True)
        # dlq = await self.ch.declare_queue("app.dlq", durable=True)
        # await dlq.bind(dlx, routing_key="dead")
        # args = {"x-dead-letter-exchange": "app.dlx", "x-dead-letter-routing-key": "dead"}

        # Worker queue (durable)
        self.queue = await self.ch.declare_queue(
            QUEUE_NAME,
            durable=True,
            # arguments=args if you enabled DLQ above
        )

        # Bind routing keys
        for binding_key, routing_key in BINDINGS:
            await self.queue.bind(self.exchange, routing_key=routing_key)

    async def consume_forever(self, handler):
        async with self.queue.iterator() as iterator:
            async for msg in iterator:
                try:
                    payload = msg.body.decode()
                    await handler(payload)
                    await msg.ack()
                except Exception as e:
                    # For now, don't requeue to avoid poison loops
                    print(f"[worker] error: {e}")
                    await msg.nack(requeue=False)

    async def close(self) -> None:
        """Close connection gracefully."""
        if self.conn and not self.conn.is_closed:
            await self.conn.close()

import asyncio
from rabbitmq_worker import RabbitWorker


async def handle_message(payload: str):
    print("Sunt un mare cartof")
    print(payload)
    print("Sunt un mare pufos")


async def connect_with_retry(worker: RabbitWorker, retries=5, delay=3):
    for i in range(retries):
        try:
            await worker.connect()
            return
        except Exception as e:
            print(f"[worker] RabbitMQ not ready, retry {i + 1}/{retries}... ({e})")
            await asyncio.sleep(delay)
    raise RuntimeError("Could not connect to RabbitMQ after retries")


async def main():
    worker = RabbitWorker()
    await connect_with_retry(worker)
    print("[worker] connected and consuming")
    await worker.consume_forever(handle_message)


if __name__ == "__main__":
    asyncio.run(main())

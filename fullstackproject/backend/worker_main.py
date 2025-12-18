import asyncio
import httpx
from rabbitmq_worker import RabbitWorker

FASTAPI_URL = "http://fullstack:5001/add_user"  # container name + port inside Docker

async def handle_message(payload: str):
    print(f"[worker] received payload: {payload}")

    # Prepare the data to send (you can adjust this)
    data = {"username": "payload"}  # simple example

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(FASTAPI_URL, json=data)
            if resp.status_code == 200:
                print(f"[worker] successfully added user: {payload}")
            else:
                print(f"[worker] failed to add user: {resp.status_code} - {resp.text}")
        except Exception as e:
            print(f"[worker] error sending request to FastAPI: {e}")

async def connect_with_retry(worker: RabbitWorker, retries=5, delay=3):
    for i in range(retries):
        try:
            await worker.connect()
            return
        except Exception as e:
            print(f"[worker] RabbitMQ not ready, retry {i+1}/{retries}... ({e})")
            await asyncio.sleep(delay)
    raise RuntimeError("Could not connect to RabbitMQ after retries")

async def main():
    worker = RabbitWorker()
    await connect_with_retry(worker)
    print("[worker] connected and consuming")
    await worker.consume_forever(handle_message)

if __name__ == "__main__":
    asyncio.run(main())

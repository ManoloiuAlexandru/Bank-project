
# backend/worker/worker.py
import asyncio
import json
from .rabbitmq_worker import RabbitWorker

async def handle_message(payload: str):
    data = json.loads(payload)
    kind = data.get("type")
    if kind == "user.created":
        print(f"[worker] user.created -> email={data.get('email')} id={data.get('id')}")
        # TODO: welcome email, audit logging, etc.
    elif kind == "contact.message":
        preview = (data.get("message") or "")[:80]
        print(f"[worker] contact.message from {data.get('email')}: {preview}")
        # TODO: spam check, send email, write to table, etc.
    else:
        print(f"[worker] unknown type={kind} payload={data}")

async def main():
    rw = RabbitWorker()
    await rw.connect()
    await rw.consume_forever(handle_message)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        pass

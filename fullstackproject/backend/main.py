from fastapi import FastAPI, Request, Form

app = FastAPI()


@app.post("/contactForm")
async def test(
        requester_name=Form(...),
        email=Form(...),
        message=Form(...)):
    return {"request": message}

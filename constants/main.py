from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from your Next.js domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your Next.js dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GET example
@app.get("/get-data")
def get_data():
    return {"message": "Hello from Bunty", "number": 123}

# POST example
@app.post("/send-data")
async def send_data(request: Request):
    body = await request.json()
    name = body.get("name")
    return {"status": "success", "received": name}

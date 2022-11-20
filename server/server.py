from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import uvicorn
import routers.categories as categories
import routers.transactions as transactions
import routers.users as users

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(categories.router)
app.include_router(transactions.router)
app.include_router(users.router)


@app.get("/")
def sanity():
    return {"data": "hello world"}


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)

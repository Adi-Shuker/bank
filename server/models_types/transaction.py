from pydantic import BaseModel


class Transaction(BaseModel):
    user_id: int
    amount: int
    category_name: str
    details: str
    vendor: str

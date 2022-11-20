from fastapi import APIRouter
from models.users import Users
from models_types.balance import Balance

router = APIRouter()
users = Users()


@router.get('/users/{user_id}')
def get_user_balance(user_id):
    return users.get_user(user_id)


@router.get('/users/{user_id}/breakdown')
def get_user_breakdown_by_categories(user_id):
    return users.get_user_breakdown_by_categories(user_id)


@router.put("/users/{user_id}")
def update_user_balance(user_id, balance: Balance):
    return users.update_user_balance(user_id, balance.amount)

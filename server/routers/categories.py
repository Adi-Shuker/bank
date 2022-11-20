from fastapi import APIRouter
from models.categories import Categories

router = APIRouter()
categories = Categories()


@router.get('/categories')
def get_all_categories():
    return categories.get_all_categories()

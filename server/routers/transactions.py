from fastapi import APIRouter
from models.transactions import Transactions
from models_types.transaction import Transaction

router = APIRouter()
transactions = Transactions()


@router.get('/transactions')
def get_all_transactions():
    return transactions.get_all_transactions()


@router.post('/transaction')
def add_transaction(transaction: Transaction):
    return transactions.add_transaction(transaction)


@router.delete('/transaction/{transaction_id}')
def delete_transaction(transaction_id):
    return transactions.delete_transaction(transaction_id)

import pymysql
from fastapi import HTTPException
from models_types.transaction import Transaction
from models.users import Users


class Transactions():
    def __init__(self):
        self.connection = pymysql.connect(
            host="localhost",
            user="root",
            password="123456",
            db="bank",
            charset="utf8",
            cursorclass=pymysql.cursors.DictCursor
        )
        self.users_models = Users()

    def get_all_transactions(self):
        try:
            with self.connection.cursor() as cursor:
                query = "SELECT * FROM transactions"
                cursor.execute(query)
                categories = cursor.fetchall()
                return categories
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="DB Error - get_all_transactions")

    def add_transaction(self, transaction: Transaction):
        try:
            with self.connection.cursor() as cursor:
                query = f"""
                INSERT ignore into transactions(user_id, amount, category_name, details, vendor) 
                values({transaction.user_id}, {transaction.amount}, '{transaction.category_name}', '{transaction.details}', 
                '{transaction.vendor}');
                """
                cursor.execute(query)
                self.connection.commit()
                self.users_models.update_user_balance(
                    transaction.user_id, transaction.amount)
                return self.users_models.get_user(transaction.user_id)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="DB Error - add_transaction")
        return {"status": "Success. Added transaction"}

    def delete_transaction(self, transaction_id):
        try:
            with self.connection.cursor() as cursor:
                transaction_details = f"select user_id, amount from transactions where transaction_id = {transaction_id}"
                cursor.execute(transaction_details)
                res = cursor.fetchall()
                amount = -res[0]['amount']
                user_id = res[0]['user_id']
                self.users_models.update_user_balance(
                    user_id, amount)
                query = f"DELETE FROM transactions where transaction_id = {transaction_id};"
                cursor.execute(query)
                self.connection.commit()
                return self.users_models.get_user(user_id)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="DB Error - delete_transaction")
        return {"status": "Success. Deleted transaction"}

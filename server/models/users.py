from fastapi import HTTPException
import pymysql


class Users():
    def __init__(self):
        self.connection = pymysql.connect(
            host="localhost",
            user="root",
            password="123456",
            db="bank",
            charset="utf8",
            cursorclass=pymysql.cursors.DictCursor
        )
        self.connection.autocommit(True)

    def get_all_users(self):
        try:
            with self.connection.cursor() as cursor:
                query = "SELECT * FROM users"
                cursor.execute(query)
                categories = cursor.fetchall()
                return categories
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="DB Error - get_all_users")

    def add_user(self, name, balance):
        try:
            with self.connection.cursor() as cursor:
                query = f"INSERT into users(name, balance) values('{name}', {balance});"
                cursor.execute(query)
                self.connection.commit()
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="DB Error - add_user")
        return {"status": "Success. Added user"}

    def get_user(self, user_id):
        try:
            with self.connection.cursor() as cursor:
                query = f"SELECT * FROM users WHERE id={user_id};"
                cursor.execute(query)
                user = cursor.fetchall()
                return user
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="DB Error - get_user_balance")

    def get_user_breakdown_by_categories(self, user_id):
        try:
            with self.connection.cursor() as cursor:
                query = f"""SELECT category_name, sum(amount) as total_amount 
                FROM transactions
                    WHERE user_id={user_id} GROUP BY category_name;"""
                cursor.execute(query)
                res = cursor.fetchall()
                return res
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="DB Error - get_user_breakdown_by_categories")

    def update_user_balance(self, user_id, amount):
        try:
            with self.connection.cursor() as cursor:
                query = f"update users set balance = balance +{amount} where id={user_id};"
                cursor.execute(query)
                self.connection.commit()
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="DB Error - update_user_balance")

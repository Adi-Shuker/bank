from fastapi import HTTPException

import pymysql


class Categories():
    def __init__(self):
        self.connection = pymysql.connect(
            host="localhost",
            user="root",
            password="123456",
            db="bank",
            charset="utf8",
            cursorclass=pymysql.cursors.DictCursor
        )

    def get_all_categories(self):
        try:
            with self.connection.cursor() as cursor:
                query = "SELECT * FROM categories;"
                cursor.execute(query)
                categories = cursor.fetchall()
                return categories
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="DB Error - get_all_categories")

    def add_category(self, name):
        try:
            with self.connection.cursor() as cursor:
                query = f"INSERT ignore into categories(name) values('{name}');"
                cursor.execute(query)
                self.connection.commit()
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="DB Error - add_category")
        return {"status": "Success. Added category"}

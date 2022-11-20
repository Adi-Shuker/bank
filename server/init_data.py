from models.categories import Categories
from models.users import Users
categories = ['transportation', 'food', 'entertainment']
categories_model = Categories()
users_model = Users()
for category in categories:
    categories_model.add_category(category)

users = [{"name": "Adi", "balance": 100}]

for user in users:
    users_model.add_user(user["name"], user["balance"])

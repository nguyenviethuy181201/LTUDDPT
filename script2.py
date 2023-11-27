import pymongo
import requests
import os
from datetime import datetime, timezone
from pymongo import MongoClient

uri = "mongodb+srv://commerce:commerce@cluster0.lygmgn5.mongodb.net/netflix?retryWrites=true&w=majority"

now = datetime.now(timezone.utc)



# Tạo kết nối đến MongoDB
client = MongoClient(uri)

db = client['netflix']

users_collection = db['users']

myquery = { "isMember": True }


users = users_collection.find(myquery)

num_users = users_collection.count_documents(myquery)
if num_user > 0:
	for user in users:
		distance = (now - user['registerDate'].replace(tzinfo=timezone.utc)).days
		if(distance + 1 > user['registerPackage']):
			users_collection.update_one({'_id': user['_id']}, {'$set': {'isMember': False}})
			print({"da xoa: " : distance + 1})
else:
	print("Không có Member nào");
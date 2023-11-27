import pymongo
import requests
import os
from pymongo import MongoClient

uri = "mongodb+srv://commerce:commerce@cluster0.lygmgn5.mongodb.net/netflix?retryWrites=true&w=majority"

# Tạo kết nối đến MongoDB
client = MongoClient(uri)



db = client['netflix']



movie_collection = db['movies']

myquery = { "video": { "$regex": ".mp4\?alt=media$" } }


movies = movie_collection.find(myquery)

num_movies = movie_collection.count_documents(myquery)


if num_movies > 0:
    for movie in movies:
        movie_id = movie['_id']
        movie_video = movie['video']
        print(f"ID: {movie_id}, URL: {movie_video}")


        filename = f"{movie_id}.mp4"
        response = requests.get(movie_video)
   	    with open(filename, 'wb') as f:
   	        f.write(response.content)
   	    print(f"Tải về file {filename} từ URL {movie_video} thành công!")
   	    output_filename = f"/var/www/html/hls/{movie_id}/{movie_id}.m3u8"
   	    if not os.path.exists(f"/var/www/html/hls/{movie_id}"):
   		    os.makedirs(f"/var/www/html/hls/{movie_id}")
   	    command = f"ffmpeg -i {filename} -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls {output_filename}"
   	    os.system(command)
   	    print(f"Chuyển đổi file {filename} sang {output_filename} thành công!")


        os.remove(filename)
   	    print(f"Đã xóa file {filename} sau khi chuyển đổi thành công!")
   	 
   	    new_video = f"http://192.168.1.166/hls/{movie_id}/{movie_id}.m3u8"
   	    movie_collection.update_one({}, {'$set': {'video': new_video}})
   	    print(f"Cập nhật thành công URL mới cho phim {movie_id}!")
else:
    print("Không có phim nào cần cập nhật url")

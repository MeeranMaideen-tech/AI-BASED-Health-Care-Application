from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId
from database import main_db

# Database connection
client = MongoClient("mongodb://localhost:27017/")
db = client["MBBSSTUDENTREGISTRATION"]

# Collections
users_collection = db["users"]
mbbs_collection = db["students"]
public_users_collection = db["public_users"]

# ✅ General User (PG, Dean, etc.)
class User:
    @staticmethod
    def create_user(data):
        data["password"] = generate_password_hash(data["password"])
        users_collection.insert_one(data)

    @staticmethod
    def find_by_unique_id(unique_id):
        return users_collection.find_one({"unique_id": unique_id})

    @staticmethod
    def verify_password(hashed_password, password):
        return check_password_hash(hashed_password, password)

# ✅ MBBS Student Model
class MBBSStudent:
    @staticmethod
    def create_student(data):
        data["password"] = generate_password_hash(data["password"])
        mbbs_collection.insert_one(data)

    @staticmethod
    def find_by_unique_id(unique_id):
        return mbbs_collection.find_one({"unique_id": unique_id})

    @staticmethod
    def find_many(query):
        return list(mbbs_collection.find(query, {"_id": 0}))

    @staticmethod
    def assign_students(student_ids, pg_id):
        mbbs_collection.update_many(
            {"_id": {"$in": [ObjectId(sid) for sid in student_ids]}},
            {"$set": {"assigned_to": pg_id}}
        )

# ✅ Public User Model
class PublicUserModel:
    @staticmethod
    def register_user(data):
        user_doc = {
            "user_id": data["userId"],
            "name": data["name"],
            "email": data["email"],
            "phone": data["phone"],
            "address": data["address"],
            "zone": data["zone"],
            "age": data["age"],
            "gender": data["gender"],
            "registered_at": data["registerDate"],
            "location": data.get("location"),
            "symptoms": data.get("symptoms", []),
            "status": "unassigned",  # ✅ Default to unassigned
            "profile_pic": data.get("profile_pic_path"),
        }
        public_users_collection.insert_one(user_doc)
        return user_doc

    @staticmethod
    def find_by_user_id(public_id):
        return public_users_collection.find_one({"user_id": public_id})

    @staticmethod
    def get_all_patients():
        return list(public_users_collection.find({}, {"_id": 0}))

    @staticmethod
    def get_unassigned_users_by_zone(zone):
        return list(public_users_collection.find(
            {"zone": zone, "status": "unassigned"},
            {"_id": 0}
        ))

    @staticmethod
    def assign_user_to_team(public_id, pg_id):
        result = public_users_collection.update_one(
            {"user_id": public_id},
            {"$set": {"status": "assigned", "assigned_to": pg_id}}
        )
        return result.modified_count > 0
    @staticmethod
    def get_all_users_by_zone(zone):
        return list(public_users_collection.find(
        {"zone": zone},
        {"_id": 0}
    ))
    @staticmethod
    def get_all_patients():
        return list(public_users_collection.find({}, {"_id": 0}))
    from database import main_db
from bson import ObjectId

# … existing code …

class TeamModel:
    @staticmethod
    def create_team(data):
        """
        Expects data = {
          team_leader_id: str,
          leader_name:   str,
          zone:          str,
          team_name:     str,
          members:       [ { unique_id, name, department, … }, … ]
        }
        """
        # Insert into “teams” collection
        return main_db["teams"].insert_one(data)

    @staticmethod
    def get_teams_by_leader(pg_id):
        return list(main_db["teams"].find(
            {"team_leader_id": pg_id},
            {"_id": 0}
        ))



# # from flask import Blueprint, request, jsonify
# # from models import PublicUserModel, public_users_collection
# # from werkzeug.utils import secure_filename
# # import os
# # import json

# # public_user = Blueprint("public_user", __name__)
# # UPLOAD_FOLDER = "uploads/user_photos"
# # os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# # # ✅ Register Public User
# # @public_user.route("/public", methods=["POST"])
# # def register_public_user():
# #     try:
# #         form = request.form
# #         user_id = form.get("userId")

# #         # ✅ Handle profile picture
# #         image_file = request.files.get("profilePic")
# #         profile_pic_path = ""
# #         if image_file:
# #             filename = secure_filename(f"{user_id}.jpg")
# #             path = os.path.join(UPLOAD_FOLDER, filename)
# #             image_file.save(path)
# #             profile_pic_path = f"/uploads/user_photos/{filename}"

# #         # ✅ Get location & symptoms
# #         location = json.loads(form.get("location", "{}"))
# #         symptoms = json.loads(form.get("symptoms", "[]"))

# #         user_data = {
# #             "userId": user_id,
# #             "name": form.get("name"),
# #             "email": form.get("email"),
# #             "phone": form.get("phone"),
# #             "address": form.get("address"),
# #             "zone": form.get("zone"),
# #             "age": form.get("age"),
# #             "gender": form.get("gender"),
# #             "registerDate": form.get("registerDate"),
# #             "location": location,
# #             "symptoms": symptoms,
# #             "profile_pic_path": profile_pic_path,
# #         }

# #         PublicUserModel.register_user(user_data)
# #         return jsonify({"message": "User registered successfully", "token": user_id}), 201

# #     except Exception as e:
# #         print("Error in /register/public:", str(e))
# #         return jsonify({"error": "Registration failed"}), 500


# # # ✅ Fetch public user profile
# # @public_user.route("/login/profile/<public_id>", methods=["GET"])
# # def get_public_user_profile(public_id):
# #     try:
# #         user = PublicUserModel.find_by_user_id(public_id)
# #         if not user:
# #             return jsonify({"error": "User not found"}), 404
# #         user["_id"] = str(user["_id"])
# #         return jsonify(user), 200
# #     except Exception as e:
# #         print("Error fetching profile:", str(e))
# #         return jsonify({"error": "Failed to fetch profile"}), 500


# # # ✅ Fetch all public users (no filtering)
# # @public_user.route("/all", methods=["GET"])
# # def get_all_public_users():
# #     try:
# #         users = PublicUserModel.get_all_patients()
# #         return jsonify(users), 200
# #     except Exception as e:
# #         print("Error fetching all users:", str(e))
# #         return jsonify({"error": "Failed to fetch users"}), 500


# # # ✅ Fetch all users by zone (optional)
# # @public_user.route("/all/<zone>", methods=["GET"])
# # def get_all_users_by_zone(zone):
# #     try:
# #         users = PublicUserModel.get_all_users_by_zone(zone)
# #         return jsonify(users), 200
# #     except Exception as e:
# #         print("Error fetching users by zone:", str(e))
# #         return jsonify({"error": "Failed to fetch users by zone"}), 500


# # # ✅ Unassigned users only (optional)
# # @public_user.route("/unassigned/<zone>", methods=["GET"])
# # def get_unassigned_users(zone):
# #     try:
# #         users = PublicUserModel.get_unassigned_users_by_zone(zone)
# #         return jsonify(users), 200
# #     except Exception as e:
# #         print("Error fetching unassigned users:", str(e))
# #         return jsonify({"error": "Failed to fetch unassigned users"}), 500


# # # ✅ Assign care plan
# # @public_user.route("/assign_care", methods=["POST"])
# # def assign_care_plan():
# #     try:
# #         data = request.get_json()
# #         user_id = data.get("user_id")
# #         pg_id = data.get("pg_id")
# #         care_plan = data.get("care_plan")

# #         update_fields = {
# #             "status": "assigned",
# #             "assigned_to": pg_id,
# #             "care_plan": care_plan,
# #             "vitals": data.get("vitals"),
# #             "symptoms": data.get("symptoms"),
# #             "treatment": data.get("treatment"),
# #             "assigned_at": data.get("timestamp", None)
# #         }

# #         result = public_users_collection.update_one(
# #             {"user_id": user_id},
# #             {"$set": update_fields}
# #         )

# #         if result.modified_count == 0:
# #             return jsonify({"error": "User not found or already assigned"}), 404

# #         return jsonify({"message": "Care plan assigned successfully"}), 200

# #     except Exception as e:
# #         print("❌ Error in assign_care_plan:", str(e))
# #         return jsonify({"error": "Failed to assign care plan"}), 500
# # from database import db  # Ensure this is imported at the top

# # @public_user.route("/assign_home", methods=["POST"])
# # def assign_home():
# #     try:
# #         data = request.get_json()
# #         db["manage_at_home"].insert_one(data)
# #         return jsonify({"message": "User assigned to Home Care"}), 200
# #     except Exception as e:
# #         print("❌ Error in assign_home:", str(e))
# #         return jsonify({"error": "Failed to assign to Home Care"}), 500

# # @public_user.route("/assign_hospital", methods=["POST"])
# # def assign_hospital():
# #     try:
# #         data = request.get_json()
# #         db["transfer_to_hospital"].insert_one(data)
# #         return jsonify({"message": "User transferred to Hospital"}), 200
# #     except Exception as e:
# #         print("❌ Error in assign_hospital:", str(e))
# #         return jsonify({"error": "Failed to transfer to Hospital"}), 500


# # from flask import Blueprint, request, jsonify
# # from models import PublicUserModel, public_users_collection
# # from werkzeug.utils import secure_filename
# # import os, json
# # from database import db   # ← make sure your database.py exports `db`

# # public_user = Blueprint("public_user", __name__)

# # UPLOAD_FOLDER = "uploads/user_photos"
# # os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# # # ✅ Register Public User
# # @public_user.route("/public", methods=["POST"])
# # def register_public_user():
# #     try:
# #         form = request.form
# #         user_id = form.get("userId")

# #         # Handle profile picture
# #         image_file = request.files.get("profilePic")
# #         profile_pic_path = ""
# #         if image_file:
# #             filename = secure_filename(f"{user_id}.jpg")
# #             path = os.path.join(UPLOAD_FOLDER, filename)
# #             image_file.save(path)
# #             profile_pic_path = f"/uploads/user_photos/{filename}"

# #         # Parse location & symptoms
# #         location = json.loads(form.get("location", "{}"))
# #         symptoms = json.loads(form.get("symptoms", "[]"))

# #         user_data = {
# #             "userId":        user_id,
# #             "name":          form.get("name"),
# #             "email":         form.get("email"),
# #             "phone":         form.get("phone"),
# #             "address":       form.get("address"),
# #             "zone":          form.get("zone"),
# #             "age":           form.get("age"),
# #             "gender":        form.get("gender"),
# #             "registerDate":  form.get("registerDate"),
# #             "location":      location,
# #             "symptoms":      symptoms,
# #             "profile_pic_path": profile_pic_path,
# #         }

# #         PublicUserModel.register_user(user_data)
# #         return jsonify({"message": "User registered successfully", "token": user_id}), 201

# #     except Exception as e:
# #         print("Error in /public:", e)
# #         return jsonify({"error": "Registration failed"}), 500


# # # ✅ Fetch public user profile
# # @public_user.route("/login/profile/<public_id>", methods=["GET"])
# # def get_public_user_profile(public_id):
# #     try:
# #         user = PublicUserModel.find_by_user_id(public_id)
# #         if not user:
# #             return jsonify({"error": "User not found"}), 404
# #         user["_id"] = str(user["_id"])
# #         return jsonify(user), 200
# #     except Exception as e:
# #         print("Error fetching profile:", e)
# #         return jsonify({"error": "Failed to fetch profile"}), 500


# # # ✅ Fetch *all* public users
# # @public_user.route("/all", methods=["GET"])
# # def get_all_public_users():
# #     try:
# #         users = PublicUserModel.get_all_patients()
# #         return jsonify(users), 200
# #     except Exception as e:
# #         print("Error fetching all users:", e)
# #         return jsonify({"error": "Failed to fetch users"}), 500


# # # ✅ Fetch users by zone
# # @public_user.route("/all/<zone>", methods=["GET"])
# # def get_all_users_by_zone(zone):
# #     try:
# #         users = PublicUserModel.get_all_users_by_zone(zone)
# #         return jsonify(users), 200
# #     except Exception as e:
# #         print("Error fetching users by zone:", e)
# #         return jsonify({"error": "Failed to fetch users by zone"}), 500


# # # ✅ Fetch unassigned users by zone
# # @public_user.route("/unassigned/<zone>", methods=["GET"])
# # def get_unassigned_users(zone):
# #     try:
# #         users = PublicUserModel.get_unassigned_users_by_zone(zone)
# #         return jsonify(users), 200
# #     except Exception as e:
# #         print("Error fetching unassigned users:", e)
# #         return jsonify({"error": "Failed to fetch unassigned users"}), 500


# # # ✅ Assign care plan (updates public_users_collection)
# # @public_user.route("/assign_care", methods=["POST"])
# # def assign_care_plan():
# #     try:
# #         data = request.get_json()
# #         user_id   = data.get("user_id")
# #         pg_id     = data.get("pg_id")
# #         care_plan = data.get("care_plan")

# #         update_fields = {
# #             "status":       "assigned",
# #             "assigned_to":  pg_id,
# #             "care_plan":    care_plan,
# #             "vitals":       data.get("vitals"),
# #             "symptoms":     data.get("symptoms"),
# #             "treatment":    data.get("treatment"),
# #             "assigned_at":  data.get("timestamp", None)
# #         }

# #         result = public_users_collection.update_one(
# #             {"user_id": user_id},
# #             {"$set": update_fields}
# #         )
# #         if result.modified_count == 0:
# #             return jsonify({"error": "User not found or already assigned"}), 404

# #         return jsonify({"message": "Care plan assigned successfully"}), 200

# #     except Exception as e:
# #         print("❌ Error in assign_care_plan:", e)
# #         return jsonify({"error": "Failed to assign care plan"}), 500


# # # ─── NEW ───
# # # ✅ Assign to Home Care (also logs into manage_at_home collection)
# # @public_user.route("/assign_home", methods=["POST"])
# # def assign_home():
# #     try:
# #         data = request.get_json()
# #         # update and log if you like:
# #         public_users_collection.update_one(
# #             {"user_id": data.get("user_id")},
# #             {"$set": {"care_plan": "homeCare"}}
# #         )
# #         db["manage_at_home"].insert_one(data)
# #         return jsonify({"message": "User assigned to Home Care"}), 200

# #     except Exception as e:
# #         print("❌ Error in assign_home:", e)
# #         return jsonify({"error": "Failed to assign to Home Care"}), 500


# # # ✅ Assign to Hospital (also logs into transfer_to_hospital collection)
# # @public_user.route("/assign_hospital", methods=["POST"])
# # def assign_hospital():
# #     try:
# #         data = request.get_json()
# #         public_users_collection.update_one(
# #             {"user_id": data.get("user_id")},
# #             {"$set": {"care_plan": "hospitalCare"}}
# #         )
# #         db["transfer_to_hospital"].insert_one(data)
# #         return jsonify({"message": "User transferred to Hospital"}), 200

# #     except Exception as e:
# #         print("❌ Error in assign_hospital:", e)
# #         return jsonify({"error": "Failed to transfer to Hospital"}), 500
# #     # ─── after your assign_hospital endpoint ───

# # # ✅ Fetch all home-care assignments
# # @public_user.route("/care/home", methods=["GET"])
# # def get_home_care_patients():
# #     try:
# #         docs = list(db["manage_at_home"].find({}, {"_id": 0}))
# #         return jsonify(docs), 200
# #     except Exception as e:
# #         print("Error fetching home care patients:", e)
# #         return jsonify({"error": "Failed to fetch home care patients"}), 500

# # # ✅ Fetch all hospital-care assignments
# # @public_user.route("/care/hospital", methods=["GET"])
# # def get_hospital_care_patients():
# #     try:
# #         docs = list(db["transfer_to_hospital"].find({}, {"_id": 0}))
# #         return jsonify(docs), 200
# #     except Exception as e:
# #         print("Error fetching hospital care patients:", e)
# #         return jsonify({"error": "Failed to fetch hospital care patients"}), 500

# # routes/public_user_routes.py

# from flask import Blueprint, request, jsonify
# from werkzeug.utils import secure_filename
# import os
# import json

# from models import PublicUserModel,public_users_collection
# from database import db  # import your Mongo client/db instance

# public_user = Blueprint("public_user", __name__)

# UPLOAD_FOLDER = "uploads/user_photos"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# @public_user.route("/public", methods=["POST"])
# def register_public_user():
#     try:
#         form = request.form
#         user_id = form.get("userId")

#         # Handle file upload
#         image_file = request.files.get("profilePic")
#         if image_file:
#             filename = secure_filename(f"{user_id}.jpg")
#             image_path = os.path.join(UPLOAD_FOLDER, filename)
#             image_file.save(image_path)
#             profile_pic_path = f"/uploads/user_photos/{filename}"
#         else:
#             profile_pic_path = ""

#         # Parse location & symptoms
#         location = json.loads(form.get("location", "{}"))
#         symptoms = json.loads(form.get("symptoms", "[]"))

#         # Build the document
#         user_data = {
#             "userId":      user_id,
#             "name":        form.get("name"),
#             "email":       form.get("email"),
#             "phone":       form.get("phone"),
#             "address":     form.get("address"),
#             "zone":        form.get("zone"),       # e.g. "Zone A"
#             "age":         form.get("age"),
#             "gender":      form.get("gender"),
#             "registerDate":form.get("registerDate"),
#             "location":    location,
#             "symptoms":    symptoms,
#             "profile_pic": profile_pic_path
#         }

#         # 1️⃣ Insert into the master collection
#         PublicUserModel.register_user(user_data)

#         # 2️⃣ Also insert into the zone‑specific collection
#         #    normalize the zone name for the collection
#         zone_key = user_data["zone"].lower().replace(" ", "_")  # e.g. "zone_a"
#         zone_collection = f"{zone_key}_users"                   # e.g. "zone_a_users"
#         db[zone_collection].insert_one(user_data)

#         return jsonify({
#             "message": "User registered successfully",
#             "token": user_id
#         }), 201

#     except Exception as e:
#         print("Error in /register/public:", str(e))
#         return jsonify({"error": "Registration failed"}), 500

# @public_user.route("/login/profile/<public_id>", methods=["GET"])
# def get_public_user_profile(public_id):
#     try:
#         user = PublicUserModel.find_by_user_id(public_id)
#         if not user:
#             return jsonify({"error": "User not found"}), 404
#         user["_id"] = str(user["_id"])  # Convert ObjectId to string
#         return jsonify(user), 200
#     except Exception as e:
#         print("Error fetching public profile:", str(e))
#         return jsonify({"error": "Failed to fetch user"}), 500

# @public_user.route("/api/user/report", methods=["POST", "OPTIONS"])
# def submit_symptoms():
#     if request.method == "OPTIONS":
#         response = jsonify({"status": "ok"})
#         response.headers.add("Access-Control-Allow-Origin", "*")
#         response.headers.add("Access-Control-Allow-Headers", "Content-Type")
#         response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
#         return response

#     try:
#         data = request.get_json()
#         from database import db as main_db
#         main_db["user_symptoms"].insert_one(data)
#         return jsonify({"message": "Symptoms received"}), 200
#     except Exception as e:
#         print("Error saving symptoms:", str(e))
#         return jsonify({"error": "Failed to save symptoms"}), 500
# @public_user.route("/api/user/zone_counts", methods=["GET"])
# def get_zone_counts():
#     try:
#         pipeline = [
#             {"$group": {"_id": "$zone", "count": {"$sum": 1}}}
#         ]
#         agg = public_users_collection.aggregate(pipeline)
#         # build a simple dict: { "Zone A": 23, "Zone B": 47, ... }
#         counts = {doc["_id"]: doc["count"] for doc in agg}
#         return jsonify(counts), 200
#     except Exception as e:
#         print("Error in /api/user/zone_counts:", e)
#         return jsonify({"error": "Failed to aggregate zone counts"}), 500

# backend/routes/public_user_routes.py

# from flask import Blueprint, request, jsonify
# from werkzeug.utils import secure_filename
# import os
# import json

# from models import PublicUserModel, public_users_collection
# from database import db  # your Mongo client instance

# public_user = Blueprint("public_user", __name__)

# UPLOAD_FOLDER = "uploads/user_photos"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# @public_user.route("/public", methods=["POST"])
# def register_public_user():
#     try:
#         form = request.form
#         user_id = form.get("userId")

#         # ─── handle profile pic ───
#         image_file = request.files.get("profilePic")
#         if image_file:
#             fn = secure_filename(f"{user_id}.jpg")
#             path = os.path.join(UPLOAD_FOLDER, fn)
#             image_file.save(path)
#             profile_pic = f"/uploads/user_photos/{fn}"
#         else:
#             profile_pic = ""

#         # ─── parse payload ───
#         location = json.loads(form.get("location", "{}"))
#         symptoms = json.loads(form.get("symptoms", "[]"))

#         user_doc = {
#             "user_id":      user_id,
#             "name":         form.get("name"),
#             "email":        form.get("email"),
#             "phone":        form.get("phone"),
#             "address":      form.get("address"),
#             "zone":         form.get("zone"),   # e.g. "Zone A"
#             "age":          form.get("age"),
#             "gender":       form.get("gender"),
#             "registerDate": form.get("registerDate"),
#             "location":     location,
#             "symptoms":     symptoms,
#             "profile_pic":  profile_pic,
#             "status":       "submitted"
#         }

#         # 1️⃣ master collection
#         PublicUserModel.register_user(user_doc)

#         # 2️⃣ zone‑specific collection
#         zone_key = user_doc["zone"].lower().replace(" ", "_")  # "zone_a"
#         zone_col = f"{zone_key}_users"
#         db[zone_col].insert_one(user_doc)

#         return jsonify(message="User registered successfully", token=user_id), 201

#     except Exception as e:
#         print("Error in /public:", e)
#         return jsonify(error="Registration failed"), 500


# @public_user.route("/login/profile/<public_id>", methods=["GET"])
# def get_public_user_profile(public_id):
#     try:
#         user = PublicUserModel.find_by_user_id(public_id)
#         if not user:
#             return jsonify(error="User not found"), 404
#         user["_id"] = str(user["_id"])
#         return jsonify(user), 200

#     except Exception as e:
#         print("Error fetching profile:", e)
#         return jsonify(error="Failed to fetch user"), 500


# @public_user.route("/api/user/report", methods=["POST", "OPTIONS"])
# def submit_symptoms():
#     if request.method == "OPTIONS":
#         resp = jsonify(status="ok")
#         resp.headers.update({
#             "Access-Control-Allow-Origin":  "*",
#             "Access-Control-Allow-Headers": "Content-Type",
#             "Access-Control-Allow-Methods": "POST, OPTIONS"
#         })
#         return resp

#     try:
#         data = request.get_json()
#         db["user_symptoms"].insert_one(data)
#         return jsonify(message="Symptoms received"), 200

#     except Exception as e:
#         print("Error saving symptoms:", e)
#         return jsonify(error="Failed to save symptoms"), 500


# @public_user.route("/api/user/zone_counts", methods=["GET"])
# def get_zone_counts():
#     try:
#         pipeline = [
#             {"$group": {"_id": "$zone", "count": {"$sum": 1}}}
#         ]
#         agg = public_users_collection.aggregate(pipeline)
#         counts = {doc["_id"]: doc["count"] for doc in agg}
#         return jsonify(counts), 200

#     except Exception as e:
#         print("Error in /api/user/zone_counts:", e)
#         return jsonify(error="Failed to aggregate zone counts"), 500


# @public_user.route("/api/user/locations", methods=["GET"])
# def get_public_user_locations():
#     """
#     Returns every public user’s basic info + lat/lng
#     so the front-end can drop individual pins.
#     """
#     try:
#         cursor = public_users_collection.find({}, {
#             "_id": 0,
#             "user_id": 1,
#             "name": 1,
#             "age": 1,
#             "phone": 1,
#             "zone": 1,
#             "address": 1,
#             "profile_pic": 1,
#             "location": 1
#         })
#         out = []
#         for u in cursor:
#             loc = u.get("location", {})
#             out.append({
#                 "userId":     u.get("user_id"),
#                 "name":       u.get("name"),
#                 "age":        u.get("age"),
#                 "phone":      u.get("phone"),
#                 "zone":       u.get("zone"),
#                 "address":    u.get("address"),
#                 "profilePic": u.get("profile_pic"),
#                 "lat":        loc.get("lat"),
#                 "lng":        loc.get("lng")
#             })
#         return jsonify(out), 200

#     except Exception as e:
#         print("Error in /api/user/locations:", e)
#         return jsonify(error="Failed to fetch locations"), 500


# @public_user.route("/api/user/all/<zone>", methods=["GET"])
# def get_users_by_zone(zone):
#     """
#     New endpoint so PatientList.js can do:
#       axios.get(`/api/user/all/${zone}`)
#     """
#     try:
#         cursor = public_users_collection.find({"zone": zone}, {
#             "_id": 0,
#             "user_id": 1,
#             "name": 1,
#             "age": 1,
#             "phone": 1,
#             "zone": 1,
#             "profile_pic": 1,
#             "address": 1,
#             "location": 1
#         })
#         users = []
#         for u in cursor:
#             loc = u.get("location", {})
#             users.append({
#                 "user_id":    u["user_id"],
#                 "name":       u["name"],
#                 "age":        u["age"],
#                 "phone":      u["phone"],
#                 "zone":       u["zone"],
#                 "address":    u["address"],
#                 "profile_pic":u["profile_pic"],
#                 "lat":        loc.get("lat"),
#                 "lng":        loc.get("lng")
#             })
#         return jsonify(users), 200

#     except Exception as e:
#         print("Error in /api/user/all/<zone>:", e)
#         return jsonify(error="Failed to fetch zone users"), 500






    
# routes/public_user_routes.py

# routes/public_user_routes.py

from flask import Blueprint, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import os, json
from database import db                             # your PyMongo database instance
from models import PublicUserModel, public_users_collection

# ─── Upload folder for profile pics ─────────────────────
UPLOAD_FOLDER = "uploads/user_photos"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ─── Blueprint for register & login ─────────────────────
register_bp = Blueprint("register_bp", __name__)

@register_bp.route("/uploads/user_photos/<filename>")
def serve_user_photo(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@register_bp.route("/register/public", methods=["POST"])
def register_public_user():
    try:
        form = request.form
        user_id = form["userId"]

        # ── Handle profile pic upload ───────────────────
        image_file = request.files.get("profilePic")
        if image_file:
            fn = secure_filename(f"{user_id}.jpg")
            path = os.path.join(UPLOAD_FOLDER, fn)
            image_file.save(path)
            profile_pic_path = f"/uploads/user_photos/{fn}"
        else:
            profile_pic_path = ""

        # ── Parse location & symptoms ───────────────────
        loc = json.loads(form.get("location", "{}"))
        symptoms = json.loads(form.get("symptoms", "[]"))

        # ── Master insert via your model ─────────────────
        master = {
            "userId":           user_id,
            "name":             form.get("name"),
            "email":            form.get("email"),
            "phone":            form.get("phone"),
            "address":          form.get("address"),
            "zone":             form.get("zone"),
            "age":              form.get("age"),
            "gender":           form.get("gender"),
            "registerDate":     form.get("registerDate"),
            "location":         loc,
            "symptoms":         symptoms,
            "profile_pic_path": profile_pic_path
        }
        PublicUserModel.register_user(master)

        # ── Also insert into zone‑specific collection ────
        zone_key   = master["zone"].lower().replace(" ", "_")    # e.g. "Zone A" → "zone_a"
        coll_name  = f"{zone_key}_users"                        # e.g. "zone_a_users"
        zone_doc   = {
            "user_id":      user_id,
            "name":         master["name"],
            "phone":        master["phone"],
            "age":          master["age"],
            "zone":         master["zone"],
            "address":      master["address"],
            "profile_pic":  profile_pic_path,
            "location":     loc,
            "symptoms":     symptoms
        }
        db[coll_name].insert_one(zone_doc)

        return jsonify({"message": "User registered", "token": user_id}), 201

    except Exception as e:
        print("⚠️ register_public_user error:", e)
        return jsonify({"error": "Registration failed"}), 500


@register_bp.route("/register/login/profile/<public_id>", methods=["GET"])
def get_public_user_profile(public_id):
    try:
        user = PublicUserModel.find_by_user_id(public_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        user["_id"] = str(user["_id"])
        return jsonify(user), 200

    except Exception as e:
        print("⚠️ get_public_user_profile error:", e)
        return jsonify({"error": "Fetch failed"}), 500



# ─── Blueprint for `/api/user/...` endpoints ────────────
api_bp = Blueprint("public_api", __name__)

@api_bp.route("/api/user/all/<zone>", methods=["GET"])
def get_users_by_zone(zone):
    """
    Return all users in the specified zone.
    Reads from the zone-specific collection we created at registration.
    """
    try:
        zone_key = zone.lower().replace(" ", "_")
        coll_name = f"{zone_key}_users"
        if coll_name not in db.list_collection_names():
            return jsonify([]), 200

        users = list(db[coll_name].find({}, {"_id": 0}))
        return jsonify(users), 200

    except Exception as e:
        print("⚠️ get_users_by_zone error:", e)
        return jsonify({"error": "Internal error"}), 500


@api_bp.route("/api/user/zone_counts", methods=["GET"])
def get_zone_counts():
    """
    Aggregate total counts of all public users by zone
    from the master public_users collection.
    """
    try:
        pipeline = [
            {"$group": {"_id": "$zone", "count": {"$sum": 1}}}
        ]
        agg = public_users_collection.aggregate(pipeline)
        counts = {doc["_id"]: doc["count"] for doc in agg}
        return jsonify(counts), 200

    except Exception as e:
        print("⚠️ get_zone_counts error:", e)
        return jsonify({"error": "Aggregation failed"}), 500


@api_bp.route("/api/user/assign_home", methods=["OPTIONS", "POST"])
def assign_home():
    # CORS preflight
    if request.method == "OPTIONS":
        resp = jsonify({"status": "ok"})
        resp.headers["Access-Control-Allow-Origin"]  = "*"
        resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
        resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        return resp

    data = request.get_json()
    db["home_care"].insert_one(data)
    return jsonify({"message": "Assigned to home care"}), 200


@api_bp.route("/api/user/assign_hospital", methods=["OPTIONS", "POST"])
def assign_hospital():
    if request.method == "OPTIONS":
        resp = jsonify({"status": "ok"})
        resp.headers["Access-Control-Allow-Origin"]  = "*"
        resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
        resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        return resp

    data = request.get_json()
    db["hospital_care"].insert_one(data)
    return jsonify({"message": "Assigned to hospital"}), 200
# ─── after your assign_home / assign_hospital ─────────────────

@api_bp.route("/api/user/care/home", methods=["GET"])
def get_home_care():
    """
    Return all documents inserted into db['home_care'].
    """
    try:
        # exclude Mongo _id for front‑end simplicity
        docs = list(db["home_care"].find({}, {"_id": 0}))
        return jsonify(docs), 200
    except Exception as e:
        print("‼️ get_home_care error:", e)
        return jsonify({"error": "Failed to fetch home‑care list"}), 500


@api_bp.route("/api/user/care/hospital", methods=["GET"])
def get_hospital_care():
    """
    Return all documents inserted into db['hospital_care'].
    """
    try:
        docs = list(db["hospital_care"].find({}, {"_id": 0}))
        return jsonify(docs), 200
    except Exception as e:
        print("‼️ get_hospital_care error:", e)
        return jsonify({"error": "Failed to fetch hospital‑care list"}), 500



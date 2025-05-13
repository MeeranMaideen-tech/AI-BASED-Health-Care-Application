# from flask import Blueprint, request, jsonify, send_from_directory
# from werkzeug.utils import secure_filename
# from models import MBBSStudent
# import os, uuid

# student_routes = Blueprint("student_routes", __name__)

# UPLOAD_FOLDER = "uploads/mbbs_photos"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # ✅ MBBS Student Registration
# @student_routes.route("/mbbs/register", methods=["POST"])
# def register_mbbs_student():
#     data = request.form.to_dict()

#     required_fields = ["name", "phone", "department", "university", "registration_number", "password"]
#     if not all(field in data for field in required_fields):
#         return jsonify({"error": "Missing required fields"}), 400

#     # Handle profile image
#     image = request.files.get("image")
#     image_path = ""
#     if image:
#         filename = f"{uuid.uuid4().hex}_{secure_filename(image.filename)}"
#         filepath = os.path.join(UPLOAD_FOLDER, filename)
#         image.save(filepath)
#         image_path = f"/uploads/mbbs_photos/{filename}"

#     # Generate unique ID
#     unique_id = f"MT-{uuid.uuid4().int % 1000}"

#     # Final student data
#     data["unique_id"] = unique_id
#     data["image"] = image_path
#     data["assigned_to"] = ""  # Unassigned initially

#     MBBSStudent.create_student(data)

#     return jsonify({"message": "MBBS Student registered successfully", "unique_id": unique_id}), 201

# # ✅ Get Available Students
# @student_routes.route("/mbbs/available", methods=["GET"])
# def get_available_students():
#     students = MBBSStudent.find_many({"$or": [{"assigned_to": ""}, {"assigned_to": None}]})
#     return jsonify(students), 200

# # ✅ Assign Students to PG
# @student_routes.route("/mbbs/assign", methods=["POST"])
# def assign_students_to_pg():
#     data = request.json  # expects: { "pg_id": "PG001", "student_ids": [ObjectId strings] }
#     MBBSStudent.assign_students(data["student_ids"], data["pg_id"])
#     return jsonify({"message": "Students assigned successfully"}), 200

# # ✅ Serve uploaded profile images
# @student_routes.route("/uploads/mbbs_photos/<filename>")
# def serve_mbbs_photo(filename):
#     return send_from_directory(UPLOAD_FOLDER, filename)
from flask import Blueprint, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from models import MBBSStudent
import os, uuid

student_routes = Blueprint("student_routes", __name__)

UPLOAD_FOLDER = "uploads/mbbs_photos"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ MBBS Student Registration
@student_routes.route("/register", methods=["POST"])
def register_mbbs_student():
    data = request.form.to_dict()
    required = ["name", "phone", "department", "university", "registration_number", "password"]
    if not all(f in data for f in required):
        return jsonify({"error": "Missing required fields"}), 400

    # Handle profile image
    image = request.files.get("image")
    image_path = ""
    if image:
        fname = f"{uuid.uuid4().hex}_{secure_filename(image.filename)}"
        filepath = os.path.join(UPLOAD_FOLDER, fname)
        image.save(filepath)
        image_path = f"/uploads/mbbs_photos/{fname}"

    # Generate unique ID
    unique_id = f"MT-{uuid.uuid4().int % 1000}"

    data.update({
        "unique_id": unique_id,
        "image": image_path,
        "assigned_to": ""
    })

    MBBSStudent.create_student(data)
    return jsonify({"message": "MBBS Student registered successfully", "unique_id": unique_id}), 201

# ✅ Get Available Students
@student_routes.route("/available", methods=["GET"])
def get_available_students():
    students = MBBSStudent.find_many({"$or": [{"assigned_to": ""}, {"assigned_to": None}]})
    return jsonify(students), 200

# ✅ Assign Students to PG
@student_routes.route("/assign", methods=["POST"])
def assign_students_to_pg():
    payload = request.json  # { pg_id: "...", student_ids: [...] }
    MBBSStudent.assign_students(payload["student_ids"], payload["pg_id"])
    return jsonify({"message": "Students assigned successfully"}), 200

# ✅ Serve uploaded profile images
@student_routes.route("/uploads/mbbs_photos/<filename>")
def serve_mbbs_photo(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

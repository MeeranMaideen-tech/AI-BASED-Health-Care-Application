# from flask import Blueprint, request, jsonify, send_from_directory
# from werkzeug.utils import secure_filename
# from werkzeug.security import generate_password_hash, check_password_hash
# from database import pg_students_collection
# import os
# import uuid

# pg_routes = Blueprint("pg_routes", __name__)

# UPLOAD_FOLDER = "uploads/pg_photos"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # ✅ Utility to generate unique PG ID
# def generate_unique_pg_id():
#     count = pg_students_collection.count_documents({})
#     return f"P-{100 + count + 1}"  # e.g. P-101, P-102

# # ✅ Registration route
# @pg_routes.route("/register-pg-student", methods=["POST"])
# def register_pg_student():
#     try:
#         name = request.form.get("name")
#         dob = request.form.get("dob")
#         age = request.form.get("age")
#         gender = request.form.get("gender")
#         address = request.form.get("address")
#         aadhaar = request.form.get("aadhaar")
#         email = request.form.get("email")
#         hospital = request.form.get("hospital")
#         specialization = request.form.get("specialization")
#         mbbs_passing_year = request.form.get("mbbs_passing_year")
#         license_number = request.form.get("license_number")
#         password = request.form.get("password")

#         photo = request.files.get("photo")
#         internship_certificate = request.files.get("internship_certificate")

#         if not photo or not internship_certificate or not password:
#             return jsonify({"error": "All fields and files are required."}), 400

#         # Save files
#         photo_filename = secure_filename(f"{uuid.uuid4().hex}_{photo.filename}")
#         photo.save(os.path.join(UPLOAD_FOLDER, photo_filename))

#         cert_filename = secure_filename(f"{uuid.uuid4().hex}_{internship_certificate.filename}")
#         internship_certificate.save(os.path.join(UPLOAD_FOLDER, cert_filename))

#         unique_id = generate_unique_pg_id()
#         hashed_password = generate_password_hash(password)

#         pg_students_collection.insert_one({
#             "unique_id": unique_id,
#             "name": name,
#             "dob": dob,
#             "age": age,
#             "gender": gender,
#             "address": address,
#             "aadhaar": aadhaar,
#             "email": email,
#             "hospital_name": hospital,
#             "specialization": specialization,
#             "mbbs_passing_year": mbbs_passing_year,
#             "license_number": license_number,
#             "photo": photo_filename,  # Save just the filename, not full path
#             "internship_certificate": cert_filename,
#             "password": hashed_password
            
#         })

#         return jsonify({"message": "PG student registered successfully", "unique_id": unique_id}), 201

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # ✅ Login route
# @pg_routes.route("/login-pg-student", methods=["POST"])
# def login_pg_student():
#     try:
#         unique_id = request.json.get("unique_id")
#         password = request.json.get("password")

#         pg_student = pg_students_collection.find_one({"unique_id": unique_id})

#         if not pg_student:
#             return jsonify({"error": "Invalid unique ID"}), 400

#         if not check_password_hash(pg_student["password"], password):
#             return jsonify({"error": "Incorrect password"}), 400

#         return jsonify({"message": "Login successful", "unique_id": pg_student["unique_id"]}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # ✅ Route to get all PG students
# @pg_routes.route('/api/pgstudents', methods=['GET'])
# def get_pg_students():
#     try:
#         students = []
#         for student in pg_students_collection.find():
#             students.append({
#                 "id": str(student["_id"]),
#                 "name": student.get("name", ""),
#                 "department": student.get("hospital_name", ""),
#                 "specialization": student.get("specialization", ""),
#                 "phone": student.get("phone", ""),
#                 "image": f"/uploads/pg_photos/{student.get('photo', 'default.jpg')}"
#             })
#         return jsonify(students)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
# from flask import Blueprint, request, jsonify, send_from_directory
# from werkzeug.utils import secure_filename
# from werkzeug.security import generate_password_hash, check_password_hash
# from database import pg_students_collection
# import os
# import uuid

# pg_routes = Blueprint("pg_routes", __name__)

# UPLOAD_FOLDER = "uploads/pg_photos"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # ✅ Serve uploaded PG photos
# @pg_routes.route("/uploads/pg_photos/<filename>")
# def serve_pg_photo(filename):
#     return send_from_directory(UPLOAD_FOLDER, filename)

# # ✅ Utility to generate unique PG ID
# def generate_unique_pg_id():
#     count = pg_students_collection.count_documents({})
#     return f"P-{100 + count + 1}"  # e.g. P-101, P-102

# # ✅ Registration route
# @pg_routes.route("/register-pg-student", methods=["POST"])
# def register_pg_student():
#     try:
#         name = request.form.get("name")
#         dob = request.form.get("dob")
#         age = request.form.get("age")
#         gender = request.form.get("gender")
#         address = request.form.get("address")
#         aadhaar = request.form.get("aadhaar")
#         email = request.form.get("email")
#         hospital = request.form.get("hospital")
#         specialization = request.form.get("specialization")
#         mbbs_passing_year = request.form.get("mbbs_passing_year")
#         license_number = request.form.get("license_number")
#         password = request.form.get("password")

#         photo = request.files.get("photo")
#         internship_certificate = request.files.get("internship_certificate")

#         if not photo or not internship_certificate or not password:
#             return jsonify({"error": "All fields and files are required."}), 400

#         # Save files
#         photo_filename = secure_filename(f"{uuid.uuid4().hex}_{photo.filename}")
#         photo.save(os.path.join(UPLOAD_FOLDER, photo_filename))

#         cert_filename = secure_filename(f"{uuid.uuid4().hex}_{internship_certificate.filename}")
#         internship_certificate.save(os.path.join(UPLOAD_FOLDER, cert_filename))

#         unique_id = generate_unique_pg_id()
#         hashed_password = generate_password_hash(password)

#         pg_students_collection.insert_one({
#             "unique_id": unique_id,
#             "name": name,
#             "dob": dob,
#             "age": age,
#             "gender": gender,
#             "address": address,
#             "aadhaar": aadhaar,
#             "email": email,
#             "hospital_name": hospital,
#             "specialization": specialization,
#             "mbbs_passing_year": mbbs_passing_year,
#             "license_number": license_number,
#             "photo": photo_filename,  # Save just the filename, not full path
#             "internship_certificate": cert_filename,
#             "password": hashed_password
#         })

#         return jsonify({"message": "PG student registered successfully", "unique_id": unique_id}), 201

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # ✅ Login route
# @pg_routes.route("/login-pg-student", methods=["POST"])
# def login_pg_student():
#     try:
#         unique_id = request.json.get("unique_id")
#         password = request.json.get("password")

#         pg_student = pg_students_collection.find_one({"unique_id": unique_id})

#         if not pg_student:
#             return jsonify({"error": "Invalid unique ID"}), 400

#         if not check_password_hash(pg_student["password"], password):
#             return jsonify({"error": "Incorrect password"}), 400

#         return jsonify({"message": "Login successful", "unique_id": pg_student["unique_id"]}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # ✅ Route to get all PG students
# @pg_routes.route('/api/pgstudents', methods=['GET'])
# def get_pg_students():
#     try:
#         students = []
#         for student in pg_students_collection.find():
#             students.append({
#                 "id": str(student["_id"]),
#                 "name": student.get("name", ""),
#                 "department": student.get("hospital_name", ""),
#                 "specialization": student.get("specialization", ""),
#                 "phone": student.get("phone", ""),
#                 "image": f"/uploads/pg_photos/{student.get('photo', 'default.jpg')}"
#             })
#         return jsonify(students)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# routes/pg_routes.py

# from flask import Blueprint, request, jsonify, send_from_directory
# from werkzeug.utils import secure_filename
# from werkzeug.security import generate_password_hash, check_password_hash
# from database import pg_students_collection
# import os, uuid

# pg_routes = Blueprint("pg_routes", __name__)

# # where photos & certs go
# UPLOAD_FOLDER = "uploads/pg_photos"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# def generate_unique_pg_id():
#     count = pg_students_collection.count_documents({})
#     return f"P-{100 + count + 1}"

# @pg_routes.route("/uploads/pg_photos/<filename>")
# def serve_pg_photo(filename):
#     return send_from_directory(UPLOAD_FOLDER, filename)

# @pg_routes.route("/register-pg-student", methods=["POST"])
# def register_pg_student():
#     try:
#         # ⬇ all your text fields
#         name                = request.form["name"]
#         phone               = request.form["phone"]
#         dob                 = request.form["dob"]
#         age                 = request.form["age"]
#         gender              = request.form["gender"]
#         address             = request.form["address"]
#         aadhaar             = request.form["aadhaar"]
#         email               = request.form["email"]
#         hospital            = request.form["hospital"]
#         specialization      = request.form["specialization"]
#         mbbs_passing_year   = request.form["mbbs_passing_year"]
#         license_number      = request.form["license_number"]
#         password            = request.form["password"]

#         # ⬇ PG’s own coords
#         pg_lat = float(request.form.get("pg_lat", 0))
#         pg_lng = float(request.form.get("pg_lng", 0))

#         # ⬇ file uploads
#         photo = request.files.get("photo")
#         cert  = request.files.get("internship_certificate")
#         if not photo or not cert:
#             return jsonify({"error": "Photo and certificate are required"}), 400

#         # save files
#         photo_fn = f"{uuid.uuid4().hex}_{secure_filename(photo.filename)}"
#         photo.save(os.path.join(UPLOAD_FOLDER, photo_fn))

#         cert_fn = f"{uuid.uuid4().hex}_{secure_filename(cert.filename)}"
#         cert.save(os.path.join(UPLOAD_FOLDER, cert_fn))

#         # generate and hash
#         unique_id = generate_unique_pg_id()
#         hashed_pw = generate_password_hash(password)

#         # insert to Mongo
#         pg_students_collection.insert_one({
#             "unique_id": unique_id,
#             "name": name,
#             "phone": phone,
#             "dob": dob,
#             "age": age,
#             "gender": gender,
#             "address": address,
#             "aadhaar": aadhaar,
#             "email": email,
#             "hospital_name": hospital,
#             "specialization": specialization,
#             "mbbs_passing_year": mbbs_passing_year,
#             "license_number": license_number,
#             "password": hashed_pw,
#             "photo": photo_fn,
#             "internship_certificate": cert_fn,
#             "location": {"lat": pg_lat, "lng": pg_lng}
#         })

#         return jsonify({"message": "PG student registered successfully", "unique_id": unique_id}), 201

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @pg_routes.route("/login-pg-student", methods=["POST"])
# def login_pg_student():
#     try:
#         unique_id = request.json.get("unique_id")
#         password  = request.json.get("password")
#         pg = pg_students_collection.find_one({"unique_id": unique_id})
#         if not pg or not check_password_hash(pg["password"], password):
#             return jsonify({"error": "Invalid credentials"}), 400
#         return jsonify({"message": "Login successful", "unique_id": unique_id}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @pg_routes.route("/api/pgstudents", methods=["GET"])
# def get_pg_students():
#     try:
#         out = []
#         for s in pg_students_collection.find():
#             out.append({
#                 "id": str(s["_id"]),
#                 "unique_id": s["unique_id"],
#                 "name": s.get("name", ""),
#                 "hospital": s.get("hospital_name", ""),
#                 "specialization": s.get("specialization", ""),
#                 "phone": s.get("phone", ""),
#                 "photo_url": f"/api/pg/uploads/pg_photos/{s.get('photo','')}",
#                 "location": s.get("location", {})      # <-- now includes lat/lng
#             })
#         return jsonify(out), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

from flask import Blueprint, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from database import pg_students_collection
import os, uuid

pg_routes = Blueprint("pg_routes", __name__)

# where photos & certs go
UPLOAD_FOLDER = "uploads/pg_photos"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def generate_unique_pg_id():
    count = pg_students_collection.count_documents({})
    return f"P-{100 + count + 1}"

@pg_routes.route("/uploads/pg_photos/<filename>")
def serve_pg_photo(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@pg_routes.route("/register-pg-student", methods=["POST"])
def register_pg_student():
    try:
        # ⬇ all your text fields
        name              = request.form["name"]
        phone             = request.form["phone"]
        dob               = request.form["dob"]
        age               = request.form["age"]
        gender            = request.form["gender"]
        address           = request.form["address"]
        aadhaar           = request.form["aadhaar"]
        email             = request.form["email"]
        hospital          = request.form["hospital"]
        specialization    = request.form["specialization"]
        mbbs_passing_year = request.form["mbbs_passing_year"]
        license_number    = request.form["license_number"]
        password          = request.form["password"]

        # ⬇ PG’s own coords, now coming as "lat" and "lng"
        lat = float(request.form.get("lat", 0))
        lng = float(request.form.get("lng", 0))

        # ⬇ file uploads
        photo = request.files.get("photo")
        cert  = request.files.get("internship_certificate")
        if not photo or not cert:
            return jsonify({"error": "Photo and certificate are required"}), 400

        # save files
        photo_fn = f"{uuid.uuid4().hex}_{secure_filename(photo.filename)}"
        photo.save(os.path.join(UPLOAD_FOLDER, photo_fn))

        cert_fn = f"{uuid.uuid4().hex}_{secure_filename(cert.filename)}"
        cert.save(os.path.join(UPLOAD_FOLDER, cert_fn))

        # generate and hash
        unique_id = generate_unique_pg_id()
        hashed_pw = generate_password_hash(password)

        # insert to Mongo
        pg_students_collection.insert_one({
            "unique_id": unique_id,
            "name": name,
            "phone": phone,
            "dob": dob,
            "age": age,
            "gender": gender,
            "address": address,
            "aadhaar": aadhaar,
            "email": email,
            "hospital_name": hospital,
            "specialization": specialization,
            "mbbs_passing_year": mbbs_passing_year,
            "license_number": license_number,
            "password": hashed_pw,
            "photo": photo_fn,
            "internship_certificate": cert_fn,
            # NEW: store leader’s location
            "location": {"lat": lat, "lng": lng}
        })

        return jsonify({"message": "PG student registered successfully", "unique_id": unique_id}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@pg_routes.route("/login-pg-student", methods=["POST"])
def login_pg_student():
    try:
        unique_id = request.json.get("unique_id")
        password  = request.json.get("password")
        pg = pg_students_collection.find_one({"unique_id": unique_id})
        if not pg or not check_password_hash(pg["password"], password):
            return jsonify({"error": "Invalid credentials"}), 400
        return jsonify({"message": "Login successful", "unique_id": unique_id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@pg_routes.route("/api/pgstudents", methods=["GET"])
def get_pg_students():
    try:
        out = []
        for s in pg_students_collection.find():
            out.append({
                "id": str(s["_id"]),
                "unique_id": s["unique_id"],
                "name": s.get("name", ""),
                "hospital": s.get("hospital_name", ""),
                "specialization": s.get("specialization", ""),
                "phone": s.get("phone", ""),
                "photo_url": f"/api/pg/uploads/pg_photos/{s.get('photo','')}",
                # expose the saved coords back to the front‑end
                "location": s.get("location", {})
            })
        return jsonify(out), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


from flask import Blueprint, request, jsonify
from models import User
import uuid

auth_routes = Blueprint("auth_routes", __name__)

# 🚀 REGISTER USER (PROFILE CREATION)
@auth_routes.route("/register", methods=["POST"])
def register():
    data = request.json
    if not data.get("name") or not data.get("phone") or not data.get("password"):
        return jsonify({"error": "Missing required fields"}), 400

    # Generate a unique ID based on role
    role = data.get("role", "user")  # Default role: normal user
    unique_id_prefix = {
        "user": "U",
        "medical_team": "MT",
        "doctor": "D",
        "dean": "DEAN"
    }.get(role, "U")

    unique_id = f"{unique_id_prefix}-{uuid.uuid4().int % 1000}"  # Example: D-123

    data["unique_id"] = unique_id
    User.create_user(data)

    return jsonify({"message": "User registered successfully", "unique_id": unique_id}), 201

# 🚀 LOGIN USER
@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.find_by_unique_id(data.get("unique_id"))

    if user and User.verify_password(user["password"], data["password"]):
        return jsonify({"message": "Login successful", "unique_id": user["unique_id"]}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

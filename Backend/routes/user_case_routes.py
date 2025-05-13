from flask import Blueprint, request, jsonify
from database import db  # ✅ Ensure this is importing the right database instance

user_case_routes = Blueprint("user_case_routes", __name__)

@user_case_routes.route("/api/user/report", methods=["POST", "OPTIONS"])
def report_symptoms():
    if request.method == "OPTIONS":
        response = jsonify({"status": "ok"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response

    try:
        data = request.get_json()
        print("📥 Received symptom report:", data)

        if not data.get("userId") or not data.get("symptoms"):
            return jsonify({"error": "Missing userId or symptoms"}), 400

        # ✅ Log the symptom submission into a separate collection
        db["user_symptoms"].insert_one(data)

        return jsonify({"message": "Symptoms submitted and logged"}), 200

    except Exception as e:
        print("❌ Error saving symptoms:", str(e))
        return jsonify({"error": "Internal server error"}), 500

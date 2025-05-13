from flask import Blueprint, request, jsonify
from database import db  # your already‐configured PyMongo database

team_routes = Blueprint("team_routes", __name__)

# ✅ Create a new medical team
@team_routes.route("/api/mbbs/teams", methods=["POST"])
def create_medical_team():
    try:
        data = request.get_json()
        # optional: validate required fields
        required = ["team_leader_id", "leader_name", "zone", "team_name", "members"]
        if not all(key in data for key in required):
            return jsonify({"error": "Missing required team fields"}), 400

        # insert into 'medical_teams' collection
        db["medical_teams"].insert_one(data)
        return jsonify({"message": "Team created successfully"}), 201
    except Exception as e:
        print("❌ Error creating medical team:", e)
        return jsonify({"error": "Failed to create team"}), 500

# ✅ (Optional) List all teams
@team_routes.route("/api/mbbs/teams", methods=["GET"])
def list_medical_teams():
    try:
        teams = list(db["medical_teams"].find({}, {"_id": 0}))
        return jsonify(teams), 200
    except Exception as e:
        print("❌ Error fetching medical teams:", e)
        return jsonify({"error": "Failed to fetch teams"}), 500

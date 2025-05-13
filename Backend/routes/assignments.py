# # routes/assignments.py
# from flask import Blueprint, request, jsonify,make_response
# from flask_cors import cross_origin
# from pymongo import MongoClient
# from datetime import datetime 
# from bson import ObjectId, errors as bson_errors
# from bson import ObjectId
# from database import patients_collection, patients_ai_input,virus_reports
# from flask import Blueprint, request, jsonify, make_response
# from flask_cors import cross_origin
# from bson.objectid import ObjectId
# from bson.errors import InvalidId
# from datetime import datetime



# # ─── MONGO SETUP ──────────────────────────────────────────
# client = MongoClient("mongodb://localhost:27017")
# db = client["medical_db"]
# pg_assignments = db["pg_assignments"]

# from flask import Blueprint, request, jsonify, make_response
# from pymongo import MongoClient

# assignments = Blueprint('assignments', __name__)

# # ✅ MongoDB connection
# client = MongoClient("mongodb://localhost:27017")
# db = client["medical_db"]
# pg_assignments = db["pg_assignments"]

# # ✅ Dean assigns PG to zone
# @assignments.route("/assign_pg", methods=["POST", "OPTIONS"])
# def assign_pg():
#     if request.method == "OPTIONS":
#         response = make_response()
#         response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
#         response.headers.add("Access-Control-Allow-Headers", "Content-Type")
#         response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
#         return response

#     data = request.json
#     pg_assignments.update_one(
#         {"pg_id": data["pg_id"]},
#         {"$set": {
#             "pg_name": data["pg_name"],
#             "zone": data["zone"],
#             "phone": data["phone"],
#             "assigned_on": data.get("assigned_on")
#         }},
#         upsert=True
#     )
#     response = jsonify({"message": "PG assigned successfully"})
#     response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
#     return response

# # ─── 4) High-severity cases for Dean verification ──────────
# @assignments.route("/high_severity_cases", methods=["GET"])
# @cross_origin(origins="http://localhost:3000")
# def high_severity_cases():
#     out = []
#     for visit in patients_ai_input.find({"symptoms.severity": "High"}):
#         pid     = visit["patientId"]
#         # only attempt ObjectId if it really looks like one
#         try:
#             _id = ObjectId(pid)
#         except Exception:
#             # skip any dummy/test IDs
#             continue

#         patient = patients_collection.find_one({"_id": _id})
#         if not patient:
#             continue

#         high_syms = [s["name"] for s in visit["symptoms"] if s.get("severity") == "High"]
#         out.append({
#             "id":        str(_id),
#             "name":      patient.get("name"),
#             "age":       patient.get("age"),
#             "zone":      patient.get("zone", ""),
#             "symptoms":  ", ".join(high_syms),
#             "risk":      "High"
#         })

#     return jsonify(out), 200

# # ─── Dean “Approve & Forward” → persist confirmed virus ─────
# @assignments.route("/confirm_case", methods=["POST", "OPTIONS"])
# @cross_origin(origins="http://localhost:3000")
# def confirm_case():
#     if request.method == "OPTIONS":
#         resp = make_response()
#         resp.headers["Access-Control-Allow-Origin"]  = "http://localhost:3000"
#         resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
#         resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
#         return resp

#     data = request.get_json()
#     record = {
#         "patientId":    data["id"],
#         "name":         data["name"],
#         "symptoms":     data["symptoms"],
#         "zone":         data["zone"],
#         "risk":         data["risk"],
#         "virusName":    data["virusName"],
#         "confirmed_on": datetime.utcnow()
#     }
#     virus_reports.insert_one(record)

#     resp = jsonify({"message": "Case confirmed"})
#     resp.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
#     return resp, 200

# routes/assignments.py

from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from bson import ObjectId
from datetime import datetime

# import your shared database + collections
from database import db, patients_collection, patients_ai_input, virus_reports

assignments = Blueprint("assignments", __name__)

# our PG-assignment collection
pg_assignments = db["pg_assignments"]


# ─── 1) Dean assigns a PG student to a zone ───────────────
@assignments.route("/assign_pg", methods=["POST"])
@cross_origin(origins="http://localhost:3000")
def assign_pg():
    data = request.get_json()
    pg_id   = data.get("pg_id")
    pg_name = data.get("pg_name")
    zone    = data.get("zone")
    phone   = data.get("phone")
    assigned_on = data.get("assigned_on") or datetime.utcnow().isoformat()

    pg_assignments.update_one(
        {"pg_id": pg_id},
        {"$set": {
            "pg_id": pg_id,
            "pg_name": pg_name,
            "zone": zone,
            "phone": phone,
            "assigned_on": assigned_on
        }},
        upsert=True
    )
    return jsonify({"message": "PG assigned successfully"}), 200


# ─── 2) Fetch the zone for a given PG (for your team pages) ─
@assignments.route("/assigned_zone/<pg_id>", methods=["GET"])
@cross_origin(origins="http://localhost:3000")
def get_pg_zone(pg_id):
    record = pg_assignments.find_one({"pg_id": pg_id}, {"_id": 0})
    if not record:
        return jsonify({"error": "No assignment found for this PG ID"}), 404
    return jsonify(record), 200


# ─── 3) List all PG team leaders (sorted by zone) ──────────
@assignments.route("/team_leaders", methods=["GET"])
@cross_origin(origins="http://localhost:3000")
def get_team_leaders():
    leaders = list(pg_assignments.find({}, {"_id": 0}).sort("zone"))
    return jsonify(leaders), 200


@assignments.route("/high_severity_cases", methods=["GET"])
def high_severity_cases():
    out = []
    for visit in patients_ai_input.find({"symptoms.severity": "High"}):
        pid = visit.get("patientId")
        # skip invalid IDs
        if not pid or not ObjectId.is_valid(pid):
            continue

        patient = patients_collection.find_one({"_id": ObjectId(pid)})
        if not patient:
            continue

        high_syms = [s["name"] for s in visit["symptoms"] if s.get("severity") == "High"]
        out.append({
            "id":        pid,
            "name":      patient.get("name"),
            "age":       patient.get("age"),
            "zone":      patient.get("zone", ""),
            "symptoms":  ", ".join(high_syms),
            "risk":      "High"
        })

    return jsonify(out), 200

# ─── 5) (Optional) Save a new “confirmed” virus report ─────
@assignments.route("/new_virus_report", methods=["POST"])
@cross_origin(origins="http://localhost:3000")
def new_virus_report():
    data = request.get_json()
    report = {
        "patientId":   data.get("id"),
        "virusName":   data.get("name"),
        "symptoms":    data.get("symptoms"),
        "zone":        data.get("zone"),
        "risk":        data.get("risk"),
        "reported_at": datetime.utcnow()
    }
    virus_reports.insert_one(report)
    return jsonify({"message": "Virus report saved"}), 201

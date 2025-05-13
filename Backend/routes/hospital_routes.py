from flask import Blueprint, request, jsonify
from datetime import datetime
from bson import ObjectId
from database import (
    patients_collection,
    patients_ai_input,
    patient_visits_collection,
    symptom_spike_alerts
)

hospital_bp = Blueprint("hospital", __name__)

# 1) Register a new patient
@hospital_bp.route("/add_patient", methods=["POST"])
def add_patient():
    data = request.get_json() or {}
    for f in ["name","age","gender","address","zone","bp","sugar","height","weight"]:
        if not data.get(f):
            return jsonify({"error": f"Missing {f}"}), 400

    doc = {
      "name":       data["name"],
      "age":        int(data["age"]),
      "gender":     data["gender"],
      "address":    data["address"],
      "zone":       data["zone"],
      "bp":         data["bp"],
      "sugar":      float(data["sugar"]),
      "height":     float(data["height"]),
      "weight":     float(data["weight"]),
      "created_at": datetime.utcnow()
    }
    patients_collection.insert_one(doc)
    return jsonify({"message":"Patient added"}), 201

# 2) List basic patient info for Outpatient.js
# backend/routes/hospital_routes.py
@hospital_bp.route("/patients_basic", methods=["GET"])
def get_patients_basic():
    out = []
    for p in patients_collection.find():
        out.append({
            "id":           str(p["_id"]),
            "name":         p.get("name",""),
            "age":          p.get("age",""),
            "gender":       p.get("gender",""),
            "address":      p.get("address",""),
            "bp":           p.get("bp",""),
            "sugar":        p.get("sugar",""),
            "height":       p.get("height",""),
            "weight":       p.get("weight",""),
            # ← no more KeyError:
            "zone":         p.get("zone",""),
        })
    return jsonify(out), 200



# 3) Doctor submits a visit
@hospital_bp.route("/patient_visit", methods=["POST"])
def add_patient_visit():
    data = request.get_json() or {}
    for f in ["patientId","symptoms","treatmentPlan","tablets"]:
        if not data.get(f):
            return jsonify({"error": f"Missing {f}"}), 400

    patients_ai_input.insert_one({
      "patientId": data["patientId"],
      "symptoms":  data["symptoms"],
      "timestamp": data.get("timestamp", datetime.utcnow())
    })
    patient_visits_collection.insert_one({
      "patientId":     data["patientId"],
      "treatmentPlan": data["treatmentPlan"],
      "tablets":       data["tablets"],
      "timestamp":     data.get("timestamp", datetime.utcnow())
    })
    return jsonify({"message":"Visit saved"}), 201

# 4) Fetch un-escalated spikes
@hospital_bp.route("/symptom_spikes", methods=["GET"])
def get_symptom_spikes():
    zone = request.args.get("zone")
    if not zone:
        return jsonify({"error":"Missing zone parameter"}), 400

    docs = list(symptom_spike_alerts
                .find({"zone": zone, "escalated": False})
                .sort("detected_at", -1))
    for d in docs:
        d["_id"]          = str(d["_id"])
        d["window_start"] = d["window_start"].isoformat()
        d["window_end"]   = d["window_end"].isoformat()
        d["detected_at"]  = d["detected_at"].isoformat()
    return jsonify(docs), 200

# 5) Escalate one spike
@hospital_bp.route("/symptom_spikes/<alert_id>/escalate", methods=["POST"])
def escalate_spike(alert_id):
    res = symptom_spike_alerts.update_one(
        {"_id": ObjectId(alert_id)},
        {"$set": {"escalated": True}}
    )
    if res.matched_count:
        return jsonify({"status":"escalated"}), 200
    return jsonify({"error":"Alert not found"}), 404

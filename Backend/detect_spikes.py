# backend/detect_spikes.py
from datetime import datetime, timedelta
from database import patients_ai_input, symptom_spike_alerts

# 20-case threshold for a zone-level spike
THRESHOLD = 20
# how far back to look
WINDOW     = timedelta(hours=24)

def run_detection():
    now   = datetime.utcnow()
    start = now - WINDOW

    pipeline = [
        { "$match": { "timestamp": { "$gte": start, "$lt": now } } },
        { "$unwind": "$symptoms" },
        { "$group": {
            "_id": { "zone": "$zone", "symptom": "$symptoms.name" },
            "count": { "$sum": 1 }
        }},
        { "$match": { "count": { "$gte": THRESHOLD } } }
    ]

    for doc in patients_ai_input.aggregate(pipeline):
        zone    = doc["_id"]["zone"]
        symptom = doc["_id"]["symptom"]
        count   = doc["count"]

        # avoid duplicate alerts for same window
        exists = symptom_spike_alerts.find_one({
            "zone":         zone,
            "symptom":      symptom,
            "window_start": start,
            "window_end":   now
        })
        if not exists:
            symptom_spike_alerts.insert_one({
                "zone":         zone,
                "symptom":      symptom,
                "count":        count,
                "window_start": start,
                "window_end":   now,
                "detected_at":  now,
                "escalated":    False
            })

if __name__ == "__main__":
    run_detection()
    print("Spike detection complete.")

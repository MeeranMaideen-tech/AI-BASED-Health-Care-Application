from pymongo import MongoClient
import config

# ✅ Connect to MongoDB
client = MongoClient(config.MONGO_URI)

# ✅ Use default DB from connection string (or specify if needed)
main_db = client.get_database()

# ✅ Named collections (used by some modules directly)
users_collection = main_db["users"]
students_collection = main_db["mbbs_students"]
pg_students_collection = main_db["pg_students"]
doctors_collection = main_db["doctors"]
deans_collection = main_db["deans"]
public_users_collection = main_db["public_users"]
user_symptoms_collection = main_db["user_symptoms"] 
assigned_home_collection      = main_db["assigned_home"]
assigned_hospital_collection  = main_db["assigned_hospital"] # ✅ optional access
medical_teams_collection  = main_db["medical_teams"]
# New collections for hospital portal:
patients_collection        = main_db["patients"]
patients_ai_input          = main_db["patients_ai_input"]
patients_ai_alerts         = main_db["patients_ai_alerts"]
patient_visits_collection  = main_db["patient_visits"]
symptom_spike_alerts       = main_db["symptom_spike_alerts"]
virus_reports       =main_db["new_virus_reports"]
# ✅ Export main_db if needed
db = main_db

# backend/app.py
from flask import Flask
from flask_cors import CORS

# ─── your existing imports ───────────────────────────────
from routes.auth_routes        import auth_routes
from routes.student            import student_routes
from routes.pg                 import pg_routes
from routes.assignments        import assignments
from routes.user_case_routes   import user_case_routes
from routes.team_routes        import team_routes
from routes.public_user_routes import register_bp, api_bp
from routes.hospital_routes    import hospital_bp

app = Flask(__name__)

# ← ONLY ONE CORS call—let it handle everything under /api/*
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# ─── register blueprints ───────────────────────────────
app.register_blueprint(auth_routes,     url_prefix="/api")
app.register_blueprint(student_routes,  url_prefix="/api/mbbs")
app.register_blueprint(pg_routes,       url_prefix="/api/pg")
app.register_blueprint(assignments,     url_prefix="/api/dean")
app.register_blueprint(register_bp)      
app.register_blueprint(api_bp)           
app.register_blueprint(user_case_routes) 
app.register_blueprint(team_routes)      
app.register_blueprint(hospital_bp,      url_prefix="/api/hospital")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=False)

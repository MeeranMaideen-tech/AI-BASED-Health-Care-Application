# AI-Based Epidemic Monitoring & Response System

## 📌 Project Overview

This project is an AI-powered, real-time healthcare platform designed to detect outbreaks early, issue geo-targeted alerts, and coordinate medical response teams. Built with a modular, role-based structure, it ensures seamless interaction between users, doctors, deans, PG students, and MBBS students for managing epidemic situations effectively.

---

## 💡 Key Features

- 🧠 **AI-Powered Symptom Classification** using Scikit-learn & TensorFlow
- 📍 **Geo-Targeted Alerts** via Twilio (SMS & WhatsApp)
- 🧑‍⚕️ **Dean Portal** for PG zone assignments & public guideline issuance
- 🧑‍🎓 **Medical Team Portal** for PG–MBBS coordination and case reporting
- 🧾 **Doctor Panel** for case verification and AI override
- 👨‍👩‍👧‍👦 **User Portal** for symptom reporting and zone updates
- 🗺️ **Google Maps Integration** for real-time zone visualization
- 🔐 **Firebase Authentication** for secure, role-based access
- ☁️ **MongoDB** for scalable, real-time data storage

---

## 🔧 Tech Stack

| Layer           | Technology                              |
|----------------|------------------------------------------|
| Frontend       | React.js, Tailwind CSS                   |
| Backend        | Flask (Python), Node.js (optional APIs)  |
| AI Engine      | Scikit-learn, TensorFlow                 |
| Database       | MongoDB                                  |
| Authentication | Firebase Auth                            |
| Alerts         | Twilio API (SMS/WhatsApp)                |
| Mapping        | Google Maps API                          |
| Testing Tools  | Postman, PyTest                          |

---

## 🏗️ Modules

- **User Management Module** – Role-based registration and login
- **Dean Module** – PG student assignment and guideline management
- **PG Team Formation** – Forming and locking 5-member MBBS teams
- **MBBS Field Reporting** – Patient visits and report uploads
- **Doctor Portal** – AI flag verification and confirmation reports
- **Alert System** – Automated, zone-based notifications
- **Dashboard** – Outbreak analytics and zone-wise tracking

---

## 🧪 Testing

- ✅ API validation using **Postman**
- ✅ Backend testing with **PyTest**
- ✅ Frontend unit testing with React test utilities

---

## 🚀 Future Enhancements

- 🌐 Multilingual interface (Tamil, Hindi, Telugu, etc.)
- 🗣️ Voice-based symptom reporting
- 📶 Offline sync for MBBS field reporting
- 📲 Full-featured mobile app (React Native)

## 🛠️ How to Run

1. Clone the repo  
   `git clone https://github.com/your-username/epidemic-response-system.git`
2. Install dependencies  
   `npm install` (frontend)  
   `pip install -r requirements.txt` (backend)
3. Run frontend  
   `npm start`
4. Run backend  
   `python app.py`
5. Connect MongoDB & Firebase with your credentials





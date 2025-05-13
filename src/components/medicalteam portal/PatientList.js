// // src/components/PatientList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export default function PatientList({ zone }) {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vitals, setVitals] = useState({ bp: "", sugar: "", height: "", weight: "" });
  const [treatment, setTreatment] = useState("");
  const [advice, setAdvice] = useState("");
  const navigate = useNavigate();

  //  fetch patients for the given zone
  useEffect(() => {
    if (!zone) return;
    axios
      .get(`${API_BASE}/api/user/all/${encodeURIComponent(zone)}`)
      .then(res => setPatients(res.data || []))
      .catch(err => console.error("❌ Failed to fetch zone patients:", err));
  }, [zone]);

  // open Google Maps with origin=PG leader or fallback to browser geolocation
  const openMap = patient => {
    const dest = patient.location;
    if (!dest || dest.lat == null || dest.lng == null) {
      return alert("🚫 No location available for this user.");
    }

    // try PG leader location from localStorage
    let origin;
    try {
      const pgLoc = JSON.parse(localStorage.getItem("pgLocation") || "{}");
      if (pgLoc.lat != null && pgLoc.lng != null) {
        origin = `${pgLoc.lat},${pgLoc.lng}`;
      }
    } catch {}

    const launch = orig => {
      const destination = `${dest.lat},${dest.lng}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${orig}&destination=${destination}`;
      window.open(url, "_blank");
    };

    if (origin) {
      launch(origin);
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => launch(`${coords.latitude},${coords.longitude}`),
        () => alert("🚫 Could not get your location. Enable location services or set PG location."),
        { enableHighAccuracy: true }
      );
    }
  };

  // open symptom/details modal
  const openModal = patient => {
    setSelectedPatient({ ...patient, symptoms: [] });
    setIsModalOpen(true);

    axios
      .get(`${API_BASE}/api/user/symptoms/${patient.user_id.replace("public-", "")}`)
      .then(res => {
        if (res.data?.symptoms) {
          setSelectedPatient(p => ({ ...p, symptoms: res.data.symptoms }));
        }
      })
      .catch(err => console.error("❌ Failed to fetch symptoms:", err));
  };

  // close modal & reset
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
    setVitals({ bp: "", sugar: "", height: "", weight: "" });
    setTreatment("");
    setAdvice("");
  };

  // assign to home or hospital
  const assignCare = type => {
    const endpoint = type === "home" ? "/api/user/assign_home" : "/api/user/assign_hospital";
    const payload = {
      user_id: selectedPatient.user_id,
      name: selectedPatient.name,
      age: selectedPatient.age,
      phone: selectedPatient.phone,
      zone: selectedPatient.zone,
      profile_pic: selectedPatient.profile_pic,
      symptoms: selectedPatient.symptoms,
      vitals,
      treatment,
      advice,
    };

    axios
      .post(`${API_BASE}${endpoint}`, payload)
      .then(res => {
        if (res.status === 200) {
          setPatients(prev => prev.filter(p => p.user_id !== selectedPatient.user_id));
          closeModal();
          navigate(type === "home" ? "/medicalteam/manage-at-home" : "/medicalteam/transfer-to-hospital");
        } else {
          alert("❌ Failed to assign care plan.");
        }
      })
      .catch(err => {
        console.error("❌ Error assigning care:", err);
        alert("Assignment failed.");
      });
  };

  if (!zone) {
    return <p className="p-6 text-gray-600">Select a zone to view patients.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Patients in {zone}</h2>

      {patients.length === 0 ? (
        <p className="text-gray-600">No patients found in this zone.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {patients.map(p => (
            <div
              key={p.user_id}
              className="bg-gray-100 shadow rounded-lg p-4 text-center border border-blue-500"
            >
              <img
                src={p.profile_pic || "/patientm.jpg"}
                alt={p.name}
                className="w-20 h-20 rounded-full border-2 mx-auto mb-2"
              />
              <h4 className="font-semibold">{p.name}</h4>
              <p className="text-sm text-gray-600"><strong>Age:</strong> {p.age}</p>
              <p className="text-sm text-gray-600"><strong>Phone:</strong> {p.phone}</p>
              <p className="text-sm text-gray-600">
                <strong>Address:</strong>{" "}
                <button
                  onClick={() => openMap(p)}
                  className="text-blue-600 hover:underline"
                >
                  {p.address}
                </button>
              </p>
              <button
                onClick={() => openModal(p)}
                className="mt-3 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-red-500 text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="text-center">
              <img
                src={selectedPatient.profile_pic || "/patientm.jpg"}
                alt={selectedPatient.name}
                className="w-24 h-24 rounded-full border mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">{selectedPatient.name}</h3>
              <p className="text-gray-600">📞 {selectedPatient.phone}</p>
              <p className="text-gray-600">📍 {selectedPatient.zone}</p>
              <p className="text-gray-600">🎂 Age: {selectedPatient.age}</p>

              <div className="mt-4 text-left">
                <h4 className="font-semibold text-blue-800">🩺 Reported Symptoms:</h4>
                {selectedPatient.symptoms.length > 0 ? (
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    {selectedPatient.symptoms.map((s, i) => (
                      <li key={i}>✅ {s}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="italic text-gray-500">No symptoms recorded.</p>
                )}
              </div>

              <div className="mt-6 space-y-2 text-left">
                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Blood Pressure"
                  value={vitals.bp}
                  onChange={e => setVitals(v => ({ ...v, bp: e.target.value }))}
                />
                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Sugar Level"
                  value={vitals.sugar}
                  onChange={e => setVitals(v => ({ ...v, sugar: e.target.value }))}
                />
                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Height"
                  value={vitals.height}
                  onChange={e => setVitals(v => ({ ...v, height: e.target.value }))}
                />
                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Weight"
                  value={vitals.weight}
                  onChange={e => setVitals(v => ({ ...v, weight: e.target.value }))}
                />
                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Treatment"
                  value={treatment}
                  onChange={e => setTreatment(e.target.value)}
                />
                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Advice"
                  value={advice}
                  onChange={e => setAdvice(e.target.value)}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => assignCare("home")}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Manage at Home
                </button>
                <button
                  onClick={() => assignCare("hospital")}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Transfer to Hospital
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PatientProfilePage = ({ selectedPatient, updatePatientLists }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = selectedPatient || location.state?.patient;

  // State for BP, Oxygen Level, Symptoms, and Treatment
  const [bp, setBp] = useState("");
  const [oxygenLevel, setOxygenLevel] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [treatment, setTreatment] = useState("");

  if (!patient) {
    return <div className="p-6 text-xl text-red-500">No patient selected.</div>;
  }

  const handleAssign = (careType) => {
    if (!bp || !oxygenLevel || !symptoms || !treatment) return; // Ensure all fields are filled

    const updatedPatient = {
      ...patient,
      vitals: { bp, oxygenLevel },
      symptoms,
      treatment,
      carePlan: careType === "home" ? "homeCare" : "hospitalCare",
    };

    updatePatientLists(updatedPatient);
    navigate("/patients"); // Redirect back to patient list after assigning
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Patient Profile</h2>
      <div className="flex flex-col items-center">
        <img
          src={patient.image}
          alt={patient.name}
          className="w-24 h-24 rounded-full border-4 border-blue-500 dark:border-blue-400 mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{patient.name}</h3>
        <p className="text-gray-600 dark:text-gray-300"><strong>Age:</strong> {patient.age}</p>
        <p className="text-gray-600 dark:text-gray-300"><strong>Condition:</strong> {patient.condition}</p>

        {/* Input Fields for BP, Oxygen Level, Symptoms, and Treatment */}
        <div className="w-full mt-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold">Blood Pressure (BP):</label>
          <input
            type="text"
            value={bp}
            onChange={(e) => setBp(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="e.g. 120/80"
          />

          <label className="block text-gray-700 dark:text-gray-300 font-semibold mt-2">Oxygen Level (%):</label>
          <input
            type="text"
            value={oxygenLevel}
            onChange={(e) => setOxygenLevel(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="e.g. 98"
          />

          <label className="block text-gray-700 dark:text-gray-300 font-semibold mt-2">Symptoms:</label>
          <input
            type="text"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="e.g. Fever, Cough"
          />

          <label className="block text-gray-700 dark:text-gray-300 font-semibold mt-2">Treatment:</label>
          <input
            type="text"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="e.g. Paracetamol, Rest"
          />
        </div>

        {/* Assign Buttons - Disabled until all fields are filled */}
        <div className="mt-4 space-x-4">
          <button
            onClick={() => handleAssign("home")}
            className={`px-4 py-2 rounded-lg transition-all ${
              bp && oxygenLevel && symptoms && treatment
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!bp || !oxygenLevel || !symptoms || !treatment}
          >
            Assign to Home Care
          </button>

          <button
            onClick={() => handleAssign("hospital")}
            className={`px-4 py-2 rounded-lg transition-all ${
              bp && oxygenLevel && symptoms && treatment
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!bp || !oxygenLevel || !symptoms || !treatment}
          >
            Transfer to Hospital
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;




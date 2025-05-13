import React, { useState } from "react";
import "./doctorportalcss/HospitalInpatients.css";

const hospitalPatientList = [
  {
    id: 1,
    patientName: "John Doe",
    patientAge: 50,
    patientZone: "Zone A",
    assignedMedicalTeam: "Dr. Smith, Nurse Emily",
    healthStage: "In Danger",
    profilePhoto: "patientm.jpg",
    dailyUpdates: [{ day: "Day 1", notes: "Admitted with severe symptoms. Treatment ongoing." }],
  },
  {
    id: 2,
    patientName: "Alice Johnson",
    patientAge: 38,
    patientZone: "Zone B",
    assignedMedicalTeam: "Dr. Lee, Nurse Ava",
    healthStage: "Intermediate",
    profilePhoto: "patientf.jpg",
    dailyUpdates: [{ day: "Day 1", notes: "Stable, under observation." }],
  },
];

const HospitalInpatients = () => {
  const [patients, setPatients] = useState(hospitalPatientList);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatientUpdate, setNewPatientUpdate] = useState("");

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const handleNewUpdate = () => {
    if (!newPatientUpdate.trim()) return;

    const updatedPatients = patients.map((patient) =>
      patient.id === selectedPatient.id
        ? {
            ...patient,
            dailyUpdates: [
              ...patient.dailyUpdates,
              { day: `Day ${patient.dailyUpdates.length + 1}`, notes: newPatientUpdate },
            ],
          }
        : patient
    );

    setPatients(updatedPatients);
    setSelectedPatient(updatedPatients.find((p) => p.id === selectedPatient.id));
    setNewPatientUpdate("");
  };

  return (
    <div className="hospital-inpatients-container">
      <h2>Hospital Inpatients</h2>

      {/* ✅ Patient List in Card Format */}
      <div className="hospital-patient-list">
        {patients.map((patient) => (
          <div 
            key={patient.id} 
            className="hospital-patient-card"
            onClick={() => handlePatientSelect(patient)}
          >
            <img src={patient.profilePhoto} alt={patient.patientName} className="patient-photo" />
            <div className="patient-info">
              <h3>{patient.patientName}</h3>
              <p><strong>Zone:</strong> {patient.patientZone}</p>
              <p><strong>Stage:</strong> {patient.healthStage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Selected Patient Details in a Card */}
      {selectedPatient && (
        <div className="selected-patient-card">
          <button className="back-to-list-btn" onClick={() => setSelectedPatient(null)}>← Back</button>
          <div className="selected-patient-info">
            <img src={selectedPatient.profilePhoto} alt={selectedPatient.patientName} className="selected-patient-photo" />
            <div>
              <h2>{selectedPatient.patientName}</h2>
              <p><strong>Age:</strong> {selectedPatient.patientAge}</p>
              <p><strong>Zone:</strong> {selectedPatient.patientZone}</p>
              <p><strong>Medical Team:</strong> {selectedPatient.assignedMedicalTeam}</p>
              <p><strong>Stage:</strong> {selectedPatient.healthStage}</p>
            </div>
          </div>

          {/* ✅ Daily Updates Section */}
          <div className="patient-updates-section">
            <h3>Daily Updates</h3>
            <div className="patient-updates-list">
              {selectedPatient.dailyUpdates.map((update, index) => (
                <div key={index} className="patient-update-entry">
                  <strong>{update.day}:</strong> {update.notes}
                </div>
              ))}
            </div>

            {/* ✅ Add New Update Input */}
            <div className="new-patient-update">
              <textarea
                value={newPatientUpdate}
                onChange={(e) => setNewPatientUpdate(e.target.value)}
                placeholder="Enter today's update..."
                className="new-update-textarea"
              ></textarea>
              <button className="add-patient-update-btn" onClick={handleNewUpdate}>
                Add Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalInpatients;

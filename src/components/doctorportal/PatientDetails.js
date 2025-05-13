import React, { useEffect } from "react";
import "./doctorportalcss/PatientDetails.css";

const PatientDetails = ({ patient, setContent }) => {
  useEffect(() => {
    console.log("Rendering PatientDetails:", patient); // ✅ Debugging Log
  }, [patient]);

  if (!patient) {
    console.log("Patient data is missing!"); // ✅ Debugging Log
    return <p className="error-message">Patient details not found.</p>;
  }

  return (
    <div className="patient-details-page">
      <button className="back-button" onClick={() => setContent({ page: "Inpatient" })}>
        ← Back
      </button>
      <h2>Patient Details</h2>
      <img src={patient.image} alt={patient.name} />
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Zone:</strong> {patient.zone}</p>
      <p><strong>Medical Team:</strong> {patient.medicalTeam}</p>
      <p><strong>Stage:</strong> {patient.stage}</p>
    </div>
  );
};

export default PatientDetails;

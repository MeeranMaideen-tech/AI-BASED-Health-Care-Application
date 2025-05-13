import React from "react";
import "./doctorportalcss/Inpatient.css";

const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    zone: "Zone A",
    medicalTeam: "Dr. Smith, Nurse Emily",
    stage: "In Danger",
    image: "patientm.jpg",
  },
  {
    id: 2,
    name: "Alice Johnson",
    age: 32,
    zone: "Zone B",
    medicalTeam: "Dr. Lee, Nurse Ava",
    stage: "Intermediate",
    image: "patientf.jpg",
  },
  {
    id: 3,
    name: "Michael Brown",
    age: 50,
    zone: "Zone C",
    medicalTeam: "Dr. Carter, Nurse Mia",
    stage: "No Issue",
    image: "patientm.jpg",
  },
];

const Inpatient = ({ setContent }) => {
  const handleCardClick = (patient) => {
    console.log("Clicked on patient:", patient); // ✅ Debugging Log
    setContent({ page: "PatientDetails", patient });
  };

  return (
    <div className="inpatient-container">
      <h2>Team Report Patients</h2>
      <div className="patient-cards">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="patient-card"
            onClick={() => handleCardClick(patient)}
          >
            <img src={patient.image} alt={patient.name} />
            <h3>{patient.name}</h3>
            <p><strong>Stage:</strong> {patient.stage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inpatient;

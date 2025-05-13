import React, { createContext, useContext, useState, useEffect } from "react";

// ✅ Create Context
const MedicalTeamContext = createContext();

// ✅ Custom Hook to Access Context
export const useMedicalTeam = () => useContext(MedicalTeamContext);

// ✅ Context Provider Component
export const MedicalTeamProvider = ({ children }) => {
  // ✅ **Patient List**
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", age: 45, condition: "Diabetes", zone: "Zone A", carePlan: null, image: "/john.jpg" },
    { id: 2, name: "Jane Smith", age: 38, condition: "Hypertension", zone: "Zone B", carePlan: null, image: "/jane.jpg" },
    { id: 3, name: "Michael Johnson", age: 50, condition: "Asthma", zone: "Zone C", carePlan: null, image: "/michael.jpg" },
    { id: 4, name: "Emily Davis", age: 29, condition: "Migraine", zone: "Zone D", carePlan: null, image: "/emily.jpg" },
  ]);

  // ✅ **Manage Home Care & Hospital Care Patients**
  const [homeCarePatients, setHomeCarePatients] = useState([]);
  const [hospitalCarePatients, setHospitalCarePatients] = useState([]);

  // ✅ **Log Updated Lists**
  useEffect(() => {
    console.log("🏠 Home Care Patients:", homeCarePatients);
    console.log("🏥 Hospital Care Patients:", hospitalCarePatients);
  }, [homeCarePatients, hospitalCarePatients]);

  // ✅ **Update Patient Care Plan**
  const updatePatientLists = (updatedPatient) => {
    console.log("📌 Updating patient:", updatedPatient);

    setPatients((prev) => prev.filter((p) => p.id !== updatedPatient.id));

    if (updatedPatient.carePlan === "homeCare") {
      setHomeCarePatients((prev) => [...prev, updatedPatient]);
      setHospitalCarePatients((prev) => prev.filter((p) => p.id !== updatedPatient.id));
    } else if (updatedPatient.carePlan === "hospitalCare") {
      setHospitalCarePatients((prev) => [...prev, updatedPatient]);
      setHomeCarePatients((prev) => prev.filter((p) => p.id !== updatedPatient.id));
    }
  };

  return (
    <MedicalTeamContext.Provider value={{ patients, homeCarePatients, hospitalCarePatients, setPatients, updatePatientLists }}>
      {children}
    </MedicalTeamContext.Provider>
  );
};

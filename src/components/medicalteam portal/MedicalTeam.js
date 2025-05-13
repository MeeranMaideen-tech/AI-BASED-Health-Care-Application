// import React, { useState, useCallback, useEffect } from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import Topmenu from "./Topmenu";
// import Sidebar from "./Sidebar";
// import Team from "./Team";
// import DoctorProfile from "./DoctorProfile";
// import PatientList from "./PatientList";
// import PatientProfilePage from "./PatientProfilePage";
// import ManageAtHome from "./ManageAtHome";
// import TransferToHospital from "./TransferToHospital";
// import OutbreakZones from "../common/OutbreakZones";
// import MedicalTeamLeaders from "./MedicalTeamleaders";
// import axios from "axios";


// import "./medicalteamcss/medical.tailwind.css";

// function MedicalTeam() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   const [patients, setPatients] = useState([]);
//   const [homeCarePatients, setHomeCarePatients] = useState([]);
//   const [hospitalCarePatients, setHospitalCarePatients] = useState([]);

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const pgId = localStorage.getItem("pg_id");
//         if (!pgId) return;
  
//         const zoneRes = await axios.get(`http://localhost:5000/api/dean/assigned_zone/${pgId}`);
//         const zone = zoneRes.data.zone;
  
//         const res = await axios.get(`http://localhost:5000/api/user/all/${zone}`);
//         setPatients(res.data); // ✅ Real backend patients
//       } catch (err) {
//         console.error("❌ Failed to fetch patients:", err);
//       }
//     };
  
//     fetchPatients();
//   }, []);
  

//   const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), []);

//   const handleSelectPatient = useCallback(
//     (patient) => navigate("/patient-profile", { state: { patient } }),
//     [navigate]
//   );

//   const updatePatientLists = useCallback(
//     (updatedPatient) => {
//       console.log("📌 Updating patient:", updatedPatient);
//       setPatients((prev) => prev.filter((p) => p.user_id !== updatedPatient.user_id));

//       if (updatedPatient.carePlan === "homeCare") {
//         setHomeCarePatients((prev) => [...prev.filter((p) => p.user_id !== updatedPatient.user_id), updatedPatient]);
//         setHospitalCarePatients((prev) => prev.filter((p) => p.user_id !== updatedPatient.user_id));
//         setTimeout(() => navigate("/manage-at-home"), 150);
//       } else if (updatedPatient.carePlan === "hospitalCare") {
//         setHospitalCarePatients((prev) => [...prev.filter((p) => p.user_id !== updatedPatient.user_id), updatedPatient]);
//         setHomeCarePatients((prev) => prev.filter((p) => p.user_id !== updatedPatient.user_id));
//         setTimeout(() => navigate("/transfer-to-hospital"), 150);
//       } else {
//         console.warn("⚠️ No care plan selected. Patient remains unassigned.");
//       }
//     },
//     [navigate]
//   );

//   return (
//     <div className="flex h-screen">
//       <Topmenu toggleSidebar={toggleSidebar} />
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
//         <Routes>
//           <Route path="/" element={<MedicalTeamLeaders />} />
//           <Route path="/team" element={<Team />} />
//           <Route path="/students" element={<DoctorProfile />} />
//           <Route path="/patients" element={<PatientList patients={patients} onSelectPatient={handleSelectPatient} />} />
//           <Route path="/patient-profile" element={<PatientProfilePage updatePatientLists={updatePatientLists} />} />
//           <Route path="/manage-at-home" element={<ManageAtHome patients={homeCarePatients} />} />
//           <Route path="/transfer-to-hospital" element={<TransferToHospital patients={hospitalCarePatients} />} />
//           <Route path="/medicalportal/outbreakzone" element={<OutbreakZones userType="medicalTeam" />} />
//           <Route path="/patients" element={<PatientList />} />

//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default MedicalTeam;

// src/components/MedicalTeam.js
import React, { useState, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Topmenu from "./Topmenu";
import Sidebar from "./Sidebar";
import Team from "./Team";
import DoctorProfile from "./DoctorProfile";
import PatientProfilePage from "./PatientProfilePage";
import ManageAtHome from "./ManageAtHome";
import TransferToHospital from "./TransferToHospital";
import OutbreakZones from "../common/OutbreakZones";
import MedicalTeamLeaders from "./MedicalTeamleaders";

// ⚙️ NEW
import ZoneSelector from "./ZoneSelector";
import PatientListWithModal from "./PatientList";

import "./medicalteamcss/medical.tailwind.css";

function MedicalTeam() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [zone, setZone] = useState("");              // ← track the clicked zone
  const [homeCarePatients, setHomeCarePatients] = useState([]);
  const [hospitalCarePatients, setHospitalCarePatients] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((prev) => !prev),
    []
  );

  const updatePatientLists = useCallback(
    (updatedPatient) => {
      // remove from “unassigned” list by simply
      // letting PatientListWithModal re‑fetch on zone change,
      // so here we just manage the home/hospital lists:
      if (updatedPatient.carePlan === "homeCare") {
        setHomeCarePatients((prev) => [
          ...prev.filter((p) => p.user_id !== updatedPatient.user_id),
          updatedPatient,
        ]);
        setHospitalCarePatients((prev) =>
          prev.filter((p) => p.user_id !== updatedPatient.user_id)
        );
        navigate("/manage-at-home");
      } else if (updatedPatient.carePlan === "hospitalCare") {
        setHospitalCarePatients((prev) => [
          ...prev.filter((p) => p.user_id !== updatedPatient.user_id),
          updatedPatient,
        ]);
        setHomeCarePatients((prev) =>
          prev.filter((p) => p.user_id !== updatedPatient.user_id)
        );
        navigate("/transfer-to-hospital");
      }
    },
    [navigate]
  );

  return (
    <div className="flex h-screen">
      <Topmenu toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Routes>
          <Route path="/" element={<MedicalTeamLeaders />} />
          <Route path="/team" element={<Team />} />
          <Route path="/students" element={<DoctorProfile />} />

          {/* ── PICK A ZONE ── */}
          <Route
            path="/patients"
            element={
              <>
                <ZoneSelector
                  selectedZone={zone}
                  onZoneChange={setZone}
                />
                <PatientListWithModal zone={zone} />
              </>
            }
          />

          {/* ── DETAILED CASE VIEW ── */}
          <Route
            path="/patient-profile"
            element={
              <PatientProfilePage
                onAssign={updatePatientLists}
              />
            }
          />

          {/* ── ASSIGNED TO HOME/HOSPITAL ── */}
          <Route
            path="/manage-at-home"
            element={<ManageAtHome patients={homeCarePatients} />}
          />
          <Route
            path="/transfer-to-hospital"
            element={
              <TransferToHospital patients={hospitalCarePatients} />
            }
          />

          <Route
            path="/medicalportal/outbreakzone"
            element={<OutbreakZones userType="medicalTeam" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default MedicalTeam;


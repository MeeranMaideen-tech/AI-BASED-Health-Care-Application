// ✅ Updated App.js with Team Creation Route
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import DoctorPortal from "./components/doctorportal/DoctorPortal";
import DeanPortal from "./components/deanportal/DeanPortal";
import MedicalTeam from "./components/medicalteam portal/MedicalTeam";
import UserPortal from "./components/userportal/UserPortal";
import Registration from "./components/profile/Registration";
import NormalUserProfile from "./components/profile/NormalUserProfile";
import MBBSStudent from "./components/profile/MBBSStudent";
import PGStudentRegistration from "./components/profile/PGStudentRegistration";
import Login from "./components/profile/Login";
import Team from "./components/medicalteam portal/Team";
import HospitalPortal from "./components/Hospitalportal/HospitalPortal";  // ✅ Import the team creation component

import "./App.css";

function App() {
  const [userRole, setUserRole] = useState(null);

  const handleLoginRedirect = () => {
    if (userRole === "normaluser") {
      return <Navigate to="/userportal" />;
    } else if (userRole === "mbbsstudent" || userRole === "pgstudent") {
      return <Navigate to="/medicalteam" />;
    } else if (userRole === "doctor") {
      return <Navigate to="/doctorportal" />;
    } else if (userRole === "dean") {
      return <Navigate to="/deanportal" />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />

        {/* Portals */}
        <Route path="/doctorportal" element={<DoctorPortal />} />
        <Route path="/deanportal" element={<DeanPortal />} />
        {/* <Route path="/medicalteam" element={<MedicalTeam />} /> */}
        <Route path="/medicalteam/*" element={<MedicalTeam />} />
        <Route path="/userportal/*" element={<UserPortal />} />
        <Route path="/hospitalportal/*" element={<HospitalPortal />} /> 
        <Route path="/createteam/:pg_id" element={<Team />} /> {/* ✅ use this one only */}

 {/* ✅ Route to team creation */}

        {/* Registration */}
        <Route path="/register" element={<Registration />} />
        <Route path="/normaluser" element={<NormalUserProfile />} />
        <Route path="/mbbsstudent" element={<MBBSStudent />} />
        <Route path="/PGStudentRegistration" element={<PGStudentRegistration />} />

        {/* Login */}
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/loginredirect" element={handleLoginRedirect()} />
      </Routes>
    </Router>
  );
}

export default App;

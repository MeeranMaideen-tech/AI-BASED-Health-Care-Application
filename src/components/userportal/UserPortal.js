import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import './userportalcss/tailwind-userportal.css';

import BigVirusCard from './BigVirusCard';
import SymptomChatBot from './SymptomChatBot';
import VirusChecklist from './VirusChecklist';
import UserHome from './UserHome';
import UserRegister from "./UserRegister";

function UserPortal() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleKnowMore = () => {
    navigate('/userportal/symptomchecker');
  };

  const handleProceedToChecklist = () => {
    navigate('/userportal/checklist');
  };

  const handleChecklistSubmit = async (selectedSymptoms) => {
    const token = localStorage.getItem("publicUserToken");
    if (!token || !token.startsWith("public-")) {
      alert("You must register before reporting symptoms.");
      navigate("/homepage/register/user", {
        state: { redirectTo: "/userportal/checklist" },
      });
      return;
    }

    try {
      const userId = token.replace("public-", "");
      const zone = "Zone A"; // 🔁 Optional: fetch user zone from profile later
      const report = {
        userId,
        symptoms: selectedSymptoms,
        zone,
        timestamp: new Date().toISOString(),
      };

      await fetch("http://localhost:5000/api/user/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report),
      });

      navigate('/userportal/home');
    } catch (err) {
      console.error("Failed to submit symptoms:", err);
      alert("Error submitting your case.");
    }
  };

  return (
    <div className="user-portal-container p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">User Portal</h1>

      <Routes>
        <Route path="/" element={<BigVirusCard onKnowMore={handleKnowMore} />} />
        <Route path="/symptomchecker" element={<SymptomChatBot onProceed={handleProceedToChecklist} />} />
        <Route path="/checklist" element={<VirusChecklist onSubmit={handleChecklistSubmit} />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/register" element={<UserRegister />} />
      </Routes>
    </div>
  );
}

export default UserPortal;

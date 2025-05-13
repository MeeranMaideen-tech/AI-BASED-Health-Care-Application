import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VirusChecklist({ onSubmit }) {
  const navigate = useNavigate();

  const checklistItems = [
    "Fever or chills", "Persistent cough", "Shortness of breath",
    "Loss of taste or smell", "Fatigue or tiredness", "Sore throat",
    "Headache", "Body aches", "Nausea or vomiting", "Diarrhea"
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  const handleToggle = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleSymptomSubmit = useCallback(async (symptoms) => {
    try {
      const userId = `${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
      sessionStorage.setItem("pendingUserId", userId);
      sessionStorage.setItem("pendingSymptoms", JSON.stringify(symptoms));
  
      const payload = {
        userId,
        symptoms,
        virus: "COVID-19",
        zone: "Zone 5",
        timestamp: new Date().toISOString(),
      };
  
      await axios.post("http://localhost:5000/api/user/report", payload, {
        headers: { "Content-Type": "application/json" },
      });
  
      navigate("/userportal/register");
    } catch (error) {
      console.error("Error submitting symptoms:", error);
      alert("Failed to submit symptoms. Please try again.");
    }
  }, [navigate]);
  

  useEffect(() => {
    const token = localStorage.getItem("publicUserToken");
    const pending = sessionStorage.getItem("pendingSymptoms");

    if (token && pending) {
      const storedSymptoms = JSON.parse(pending);
      sessionStorage.removeItem("pendingSymptoms");
      handleSymptomSubmit(storedSymptoms);
    }
  }, [handleSymptomSubmit]);

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      alert("⚠️ Please select at least one symptom.");
      return;
    }

    const isRegistered = !!localStorage.getItem("publicUserToken");

    if (!isRegistered) {
      // Save symptoms and redirect to registration
      sessionStorage.setItem("pendingSymptoms", JSON.stringify(selectedItems));
      navigate("/userportal/register");
    } else {
      handleSymptomSubmit(selectedItems);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {!localStorage.getItem("publicUserToken") && (
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg font-medium text-center">
          🔒 Please{" "}
          <button
            onClick={() => navigate("/userportal/register")}
            className="underline text-blue-600 hover:text-blue-800 font-semibold"
          >
            register
          </button>{" "}
          before submitting symptoms.
        </div>
      )}

      <h2 className="text-2xl font-bold text-center mb-6">Symptom Checklist</h2>
      <ul className="grid gap-4">
        {checklistItems.map((item, index) => (
          <li key={index} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => handleToggle(item)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {localStorage.getItem("publicUserToken")
            ? "Submit Case"
            : "Register to Report"}
        </button>
      </div>
    </div>
  );
}

export default VirusChecklist;

// src/components/hospitalportal/HospitalContentDisplay.js

import React from "react";
import { Routes, Route } from "react-router-dom";

import AddPatient from "./Addpatient";
// Later you can add more: Reports.js, History.js, etc.

const HospitalContentDisplay = () => {
  return (
    <div className="p-4 w-full">
      <Routes>
        <Route path="addpatient" element={<AddPatient />} />
        {/* Add more routes here as needed */}
      </Routes>
    </div>
  );
};

export default HospitalContentDisplay;

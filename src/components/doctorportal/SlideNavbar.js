import React from "react";
import "./doctorportalcss/SlideNavbar.css";

const SlideNavbar = ({ isOpen, toggleMenu, setContent }) => {
  const handleComponentChange = (component) => {
    console.log("Changing content to:", component); // ✅ Debugging Log
    setContent(component); // Update content in Topmenu
  };

  return (
    <div className={`slide-navbar ${isOpen ? "open" : ""}`}>
      <div className="profile-container">
        <img 
          src="/doctorm.jpg" 
          alt="Doctor" 
          className="profile-picture"
          onError={(e) => (e.target.src = "/default-doctor.jpg")} // ✅ Prevents broken images
        />
        <p className="doctor-name">Dr. John Doe</p>
      </div>

      <div className="nav-title">Navigation</div>
      <nav className="nav-links">
        <ul>
          <li onClick={() => handleComponentChange("Inpatient")}>
            Team Report Patients
          </li>
          <li onClick={() => handleComponentChange("Outpatient")}>
            Outpatient
          </li>
          <li onClick={() => handleComponentChange("New Infection")}>New Infection</li>
          <li onClick={() => handleComponentChange("Outbreak Zones")}>Outbreak Zones</li>
          <li onClick={() => handleComponentChange("HospitalPatients")}>
            Inpatient
          </li>
        </ul> 
      </nav>

      <button className="close-btn" onClick={toggleMenu}>Close</button>
    </div>
  );
};

export default SlideNavbar;

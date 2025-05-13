import React from "react";
import "./deanportalcss/deanslidenavbar.css";

const Deanslidenavbar = ({ isOpen, toggleMenu, setContent }) => {
  return (
    <div className={`Dean-slide-navbar ${isOpen ? "open" : ""}`}>
      <div className="profile-container">
        <img src="dean.jpg" alt="Dean" className="profile-picture" />
        <p className="dean-name">Dean John Doe</p>
      </div>

      <div className="nav-title">Dean Portal</div>
      <nav className="nav-links">
        <ul>
          <li onClick={() => setContent("AI Alerts")}>AI Detection Alerts</li>
          <li onClick={() => setContent("Verification")}>Verification Cases</li>
          <li onClick={() => setContent("New Virus Report")}>New Virus Report</li>
          <li onClick={() => setContent("Allocate Medical Team")}>Allocate Medical Team</li>
          <li onClick={() => setContent("Outbreak Zones")}>Outbreak Zones</li>
          <li onClick={() => setContent("Manage Users")}>Manage Users</li>

          {/* ▼ New Dean‐side items ▼ */}
          <li onClick={() => setContent("Manage at Home")}>Manage at Home</li>
          <li onClick={() => setContent("Transfer to Hospital")}>Transfer to Hospital</li>
        </ul>
      </nav>

      <button className="close-btn" onClick={toggleMenu}>
        Close
      </button>
    </div>
  );
};

export default Deanslidenavbar;

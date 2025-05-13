import React from "react";
import "./deanportalcss/deanhamburgermenu.css";

const DeanHamburgerMenu = ({ setContent, isOpen, toggleMenu }) => {
  const handleMenuItemClick = (item) => {
    setContent(item);  // Update content in parent component
    toggleMenu();      // Close menu after selection
  };

  return (
    <div>
      {/* Dean's Hamburger Button */}
      <div className="hamburger-container">
        <button className="hamburger-button" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/* Slide-in Menu */}
      <div className={`slide-menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => handleMenuItemClick("AI Alerts")}>AI Alerts</li>
          <li onClick={() => handleMenuItemClick("Verification")}>Verification</li>
          <li onClick={() => handleMenuItemClick("New Virus Report")}>New Virus Report</li>
          <li onClick={() => handleMenuItemClick("Allocate Medical Team")}>Allocate Medical Team</li>
          <li onClick={() => handleMenuItemClick("Outbreak Zones")}>Outbreak Zones</li>
          <li onClick={() => handleMenuItemClick("Manage Users")}>Manage Users</li>
        </ul>
      </div>
    </div>
  );
};

export default DeanHamburgerMenu;

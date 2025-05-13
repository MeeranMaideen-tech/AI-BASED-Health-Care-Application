import React from "react";
import "./doctorportalcss/HamburgerMenu.css";

const HamburgerMenu = ({ setContent, isOpen, toggleMenu }) => {
  const handleMenuItemClick = (item) => {
    setContent(item);  // Update content in parent component
    toggleMenu();      // Close menu
  };

  return (
    <div>
      {/* Hamburger Button */}
      <div className="hamburger-container">
        <button className="hamburger-button" onClick={toggleMenu}>
          ☰
        </button>
      </div> 

      {/* Slide-in Menu */}
      <div className={`slide-menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => handleMenuItemClick("Inpatient")}>Inpatient</li>
          <li onClick={() => handleMenuItemClick("Outpatient")}>Outpatient</li>
          <li onClick={() => handleComponentChange("HospitalInpatient")}>HospitalInpatient</li>
          <li onClick={() => handleMenuItemClick("New Function")}>New Function</li>
          <li onClick={() => handleMenuItemClick("Outbreakzones")}>Outbreakzones</li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;

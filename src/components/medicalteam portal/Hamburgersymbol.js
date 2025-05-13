import React from 'react';
// import "./medicalteamcss/Hamburgersymbol.css"; // Importing the CSS file

function Hamburgersymbol({ toggleSidebar }) {
  return (
    <button className="hamburger-btn" onClick={toggleSidebar}>
      ☰
    </button>
  );
}

export default Hamburgersymbol;

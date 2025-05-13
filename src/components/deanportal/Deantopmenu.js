import React from "react";
import "./deanportalcss/deantopmenu.css";
import Deanlogo from "./Deanlogo";
import DeansearchBar from "./Deansearchbar";
import Deannotification from "./Deannotification";
import Deandarkmode from "./Deandarkmode";

function Deantopmenu({ toggleMenu }) {
  return (
    <div className="topmenud">
      <div className="topmenu-left">
        <Deanlogo />
        {/* Hamburger button to toggle sidebar */}
        <button className="hamburger-button" onClick={toggleMenu}>☰</button>
      </div>

      <div className="topmenu-middle">
        <DeansearchBar />
      </div>

      <div className="topmenu-right">
        <Deannotification />
        <Deandarkmode />
      </div>
    </div>
  );
}

export default Deantopmenu;

import React, { useState } from "react";
import "./doctorportalcss/Topmenu.css";
import SearchBar from "./SearchBar";
import Darkmode from "./darkmode";
import Logo from "./Logo";
import Notification from "./Notification";
import ContentDisplay from "./ContentDisplay";
import SlideNavbar from "./SlideNavbar";

function Topmenu() {
  const [content, setContent] = useState("About");

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <div className="topmenu">
        <div className="topmenu-left">
          <Logo />
          <button className="hamburger-button" onClick={toggleMenu}>☰</button>
        </div>

        <div className="topmenu-middle">
          <SearchBar />
        </div>

        <div className="topmenu-right">
          <Notification />
          <Darkmode />
        </div>
      </div>

      <SlideNavbar isOpen={isOpen} toggleMenu={toggleMenu} setContent={setContent} />

      <div className="content-display-container">
        <ContentDisplay content={content} setContent={setContent} />
      </div>
    </div>
  );
}

export default Topmenu;

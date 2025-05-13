import { useState } from "react";
import Topmenu from "./Topmenu";  
import SlideNavbar from "./SlideNavbar";  
import ContentDisplay from "./ContentDisplay";  
import "./doctorportalcss/doctorportal.css";  

function DoctorPortal() {
  const [content, setContent] = useState("about");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <Topmenu toggleMenu={toggleMenu} />
      <div className="mainpage-grid">
        <SlideNavbar isOpen={isOpen} toggleMenu={toggleMenu} setContent={setContent} />
        <ContentDisplay content={content} setContent={setContent} />
      </div>
    </div>
  );
}

export default DoctorPortal;

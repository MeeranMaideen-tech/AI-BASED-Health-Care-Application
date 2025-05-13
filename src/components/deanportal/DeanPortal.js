// import { useState } from "react";
// import Deantopmenu from "./Deantopmenu";
// import Deanslidenavbar from "./Deanslidenavbar";
// import Deancontentdisplay from "./Deancontentdisplay";
// import "./deanportalcss/deanportal.css";

// function DeanPortal() {
//   const [content, setContent] = useState("AI Alerts"); 
//   const [isOpen, setIsOpen] = useState(false); 

//   const toggleMenu = () => setIsOpen((prev) => !prev);

//   return (
//     <div>
//       <Deantopmenu toggleMenu={toggleMenu} />
//       {/* ✅ Ensure class is applied dynamically */}
//       <div className={`mainpage-grid ${isOpen ? "sidebar-open" : ""}`}>
//         <Deanslidenavbar isOpen={isOpen} toggleMenu={toggleMenu} setContent={setContent} />
//         <div className="Dean-content-display-div"> {/* ✅ Wrap content properly */}
//           <Deancontentdisplay content={content} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DeanPortal;

// src/components/deanportal/DeanPortal.js
// import React, { useState, useEffect } from "react";
// import Deantopmenu      from "./Deantopmenu";
// import Deanslidenavbar  from "./Deanslidenavbar";
// import Deancontentdisplay from "./Deancontentdisplay";
// import "./deanportalcss/deanportal.css";

// export default function DeanPortal() {
//   const [content, setContent] = useState("Verification"); 
//   const [isOpen,   setIsOpen] = useState(false);

//   // ← state for the pending high-severity cases:
//   const [cases, setCases]     = useState([]);
//   // ← state for the named viruses:
//   const [viruses, setViruses] = useState([]);

//   // Fetch the high-severity cases on mount
//   useEffect(() => {
//     fetch("http://localhost:5000/api/dean/high_severity_cases")
//       .then(res => res.json())
//       .then(data => setCases(data))
//       .catch(console.error);
//   }, []);

//   // Called by Verification to add a new virus
//   const addToNewVirusReport = (virus) => {
//     setViruses(vs => [...vs, virus]);
//   };

//   const toggleMenu = () => setIsOpen(o => !o);

//   return (
//     <div>
//       <Deantopmenu toggleMenu={toggleMenu} />
//       <div className={`mainpage-grid ${isOpen ? "sidebar-open" : ""}`}>
//         <Deanslidenavbar 
//           isOpen={isOpen} 
//           toggleMenu={toggleMenu} 
//           setContent={setContent} 
//         />
//         <div className="Dean-content-display-div">
//           <Deancontentdisplay
//             content={content}
//             cases={cases}
//             viruses={viruses}
//             addToNewVirusReport={addToNewVirusReport}
//           />
//         </div>
//       </div>
//     </div>
//   );
// // }

// import React, { useState, useEffect } from "react";
// import Deantopmenu         from "./Deantopmenu";
// import Deanslidenavbar     from "./Deanslidenavbar";
// import Deancontentdisplay  from "./Deancontentdisplay";
// import "./deanportalcss/deanportal.css";

// export default function DeanPortal() {
//   // sidebar + which pane to show
//   const [isOpen, setIsOpen]   = useState(false);
//   const [content, setContent] = useState("Verification");

//   // verification workflow state
//   const [cases, setCases]     = useState([]);  // pending high-severity cases
//   const [viruses, setViruses] = useState([]);  // confirmed/forwarded viruses

//   // on‐mount, grab the high‐severity cases
//   useEffect(() => {
//     fetch("http://localhost:5000/api/dean/high_severity_cases")
//       .then(res => {
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         return res.json();
//       })
//       .then(setCases)
//       .catch(err => console.error("Failed to load verification cases:", err));
//   }, []);

//   // callback passed down to <Verification />
//   const addToNewVirusReport = (virus) => {
//     setViruses(prev => [...prev, virus]);
//   };

//   const toggleMenu = () => setIsOpen(o => !o);

//   return (
//     <div>
//       <Deantopmenu toggleMenu={toggleMenu} />
//       <div className={`mainpage-grid ${isOpen ? "sidebar-open" : ""}`}>
//         <Deanslidenavbar
//           isOpen={isOpen}
//           toggleMenu={toggleMenu}
//           setContent={setContent}
//         />

//         <div className="Dean-content-display-div">
//           <Deancontentdisplay
//             content={content}
//             cases={cases}
//             viruses={viruses}
//             addToNewVirusReport={addToNewVirusReport}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/deanportal/DeanPortal.js
// // src/components/deanportal/DeanPortal.js

import React, { useState, useEffect } from "react";
import Deantopmenu         from "./Deantopmenu";
import Deanslidenavbar     from "./Deanslidenavbar";
import Deancontentdisplay  from "./Deancontentdisplay";
import "./deanportalcss/deanportal.css";

export default function DeanPortal() {
  // ← make sure these hooks are imported!
  const [content, setContent]   = useState("Verification");
  const [isOpen,   setIsOpen]   = useState(false);
  const [cases,     setCases]   = useState([]);
  const [viruses,   setViruses] = useState([]);

  // fetch pending high-severity cases on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/dean/high_severity_cases")
      .then(res => res.json())
      .then(data => setCases(data))
      .catch(console.error);
  }, []);

  const addToNewVirusReport = (virus) => {
    setViruses(vs => [...vs, virus]);
  };

  const toggleMenu = () => setIsOpen(o => !o);

  // when showing Outbreak Zones, go full screen:
  const isFullScreen = content === "Outbreak Zones";

  return (
    <div className={`dean-portal ${isFullScreen ? "full-screen" : ""}`}>
      <Deantopmenu toggleMenu={toggleMenu} />

      <div
        className={
          `mainpage-grid
           ${!isFullScreen && isOpen ? "sidebar-open" : ""}
           ${isFullScreen ? "full-screen" : ""}`
        }
      >
        {/* hide sidebar entirely in full-screen mode */}
        {!isFullScreen && (
          <Deanslidenavbar
            isOpen={isOpen}
            toggleMenu={toggleMenu}
            setContent={setContent}
          />
        )}

        <div className="Dean-content-display-div">
          <Deancontentdisplay
            content={content}
            cases={cases}
            viruses={viruses}
            addToNewVirusReport={addToNewVirusReport}
          />
        </div>
      </div>
    </div>
  );
}

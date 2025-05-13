// // import React from "react";
// // import Aialerts from "./Aialerts";
// // import Verification from "./Verification";
// // import OutbreakZones from "../common/OutbreakZones";
// // import Newvirusreport from "./Newvirusreport";
// // import Allocatemedicalteam from "./Allocatemedicalteam";
// // import Manageusers from "./Manageusers";

// // // ▼ Reuse MedicalTeam’s components ▼
// // import ManageAtHome from "../medicalteam portal/ManageAtHome";
// // import TransferToHospital from "../medicalteam portal/TransferToHospital";

// // import "./deanportalcss/deancontentdisplay.css";

// // const DeanContentDisplay = ({ content, setContent }) => {
// //   return (
// //     <div className="Dean-content-display">
// //       {content === "AI Alerts" && <Aialerts />}
// //       {content === "Verification" && <Verification />}
// //       {content === "Outbreak Zones" && <OutbreakZones />}
// //       {content === "New Virus Report" && <Newvirusreport />}
// //       {content === "Allocate Medical Team" && <Allocatemedicalteam />}
// //       {content === "Manage Users" && <Manageusers />}

// //       {/* ▼ Dean reuses these two ▼ */}
// //       {content === "Manage at Home" && <ManageAtHome />}
// //       {content === "Transfer to Hospital" && <TransferToHospital />}
// //     </div>
// //   );
// // };

// // export default DeanContentDisplay;

// // src/components/deanportal/DeanContentDisplay.js
// import React from "react";
// import Aialerts            from "./Aialerts";
// import Verification        from "./Verification";
// import OutbreakZones       from "../common/OutbreakZones";
// import Newvirusreport      from "./Newvirusreport";
// import Allocatemedicalteam from "./Allocatemedicalteam";
// import Manageusers         from "./Manageusers";

// // ▼ Reuse MedicalTeam’s components ▼
// import ManageAtHome        from "../medicalteam portal/ManageAtHome";
// import TransferToHospital  from "../medicalteam portal/TransferToHospital";

// import "./deanportalcss/deancontentdisplay.css";

// const DeanContentDisplay = ({
//   content,
//   cases,
//   viruses,
//   addToNewVirusReport
// }) => {
//   return (
//     <div className="Dean-content-display">
//       {content === "AI Alerts" && <Aialerts />}

//       {content === "Verification" && (
//         <Verification
//           cases={cases}
//           addToNewVirusReport={addToNewVirusReport}
//         />
//       )}

//       {content === "Outbreak Zones" && <OutbreakZones />}

//       {content === "New Virus Report" && (
//         <Newvirusreport
//           viruses={viruses}
//         />
//       )}

//       {content === "Allocate Medical Team" && <Allocatemedicalteam />}

//       {content === "Manage Users" && <Manageusers />}

//       {/* ▼ Dean reuses these two ▼ */}
//       {content === "Manage at Home" && <ManageAtHome />}
//       {content === "Transfer to Hospital" && <TransferToHospital />}
//     </div>
//   );
// };

// export default DeanContentDisplay;

import React from "react";
import Aialerts            from "./Aialerts";
import Verification        from "./Verification";
import OutbreakZones       from "../common/OutbreakZones";
import Newvirusreport      from "./Newvirusreport";
import Allocatemedicalteam from "./Allocatemedicalteam";
import Manageusers         from "./Manageusers";

// ▼ Reuse MedicalTeam’s components ▼
// adjust this path if your folder is actually named differently
import ManageAtHome        from "../medicalteam portal/ManageAtHome";
import TransferToHospital  from "../medicalteam portal/TransferToHospital";

import "./deanportalcss/deancontentdisplay.css";

const DeanContentDisplay = ({
  content,
  cases,
  viruses,
  addToNewVirusReport
}) => {
  switch (content) {
    case "AI Alerts":
      return <Aialerts />;

    case "Verification":
      return (
        <Verification
          cases={cases}
          addToNewVirusReport={addToNewVirusReport}
        />
      );

    case "Outbreak Zones":
      return <OutbreakZones />;

    case "New Virus Report":
      return <Newvirusreport viruses={viruses} />;

    case "Allocate Medical Team":
      return <Allocatemedicalteam />;

    case "Manage Users":
      return <Manageusers />;

    // reuse the MedicalTeam portal views:
    case "Manage at Home":
      return <ManageAtHome />;

    case "Transfer to Hospital":
      return <TransferToHospital />;

    default:
      return (
        <div className="no-selection">
          Please select a section from the sidebar.
        </div>
      );
  }
};

export default DeanContentDisplay;



// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Sidebar({ isOpen, toggleSidebar }) {
//   const navigate = useNavigate();

//   return (
//     <div
//       className={`fixed top-[64px] left-0 w-64 bg-blue-900 text-white transition-transform duration-300 ease-in-out shadow-lg ${
//         isOpen ? "translate-x-0" : "-translate-x-64"
//       } min-h-screen flex flex-col justify-between pb-4 overflow-y-auto`}
//       style={{ zIndex: 50 }}
//     >
//       {/* Navigation Buttons */}
//       <div className="flex flex-col">
//         {/* ✅ Create a Team (Safe, dynamic) */}
//         <button
//           className="block w-full p-3 text-left hover:bg-gray-700"
//           onClick={() => {
//             const pgId = localStorage.getItem("pg_id");
//             if (pgId) {
//               navigate(`/createteam/${pgId}`);
//             } else {
//               alert("PG ID not found. Please go to your PG Leader card to create a team.");
//             }
//           }}
//         >
//           Create a Team
//         </button>

//         <button
//           className="block w-full p-3 text-left hover:bg-gray-700"
//           onClick={() => navigate("/medicalteam/students")}
//         >
//           UG Student List
//         </button>

//         <button
//           className="block w-full p-3 text-left hover:bg-gray-700"
//           onClick={() => navigate("/medicalteam/patients")}
//         >
//           Zone Patients Updates
//         </button>

//         <button
//           className="block w-full p-3 text-left hover:bg-gray-700"
//           onClick={() => navigate("/medicalteam/manage-at-home")}
//         >
//           Manage at Home
//         </button>

//         <button
//           className="block w-full p-3 text-left hover:bg-gray-700"
//           onClick={() => navigate("/medicalteam/transfer-to-hospital")}
//         >
//           Transfer to Hospital
//         </button>

//         <button
//           className="block w-full p-3 text-left hover:bg-gray-700"
//           onClick={() => navigate("/medicalteam/medicalportal/outbreakzone")}
//         >
//           Outbreak Zone
//         </button>
//       </div>

//       {/* ✅ Close Button */}
//       <div className="flex justify-center p-4">
//         <button
//           className="w-10 h-10 rounded-full text-white bg-[#07a794] hover:bg-red-600 transition duration-300"
//           onClick={toggleSidebar}
//         >
//           ✖
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-[64px] left-0 w-64 bg-blue-900 text-white transition-transform duration-300 ease-in-out shadow-lg ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } min-h-screen flex flex-col justify-between pb-4 overflow-y-auto`}
      style={{ zIndex: 50 }}
    >
      <div className="flex flex-col">
        <button
          className="block w-full p-3 text-left hover:bg-gray-700"
          onClick={() => navigate("/medicalteam/students")}
        >
          UG Student List
        </button>
        <button
          className="block w-full p-3 text-left hover:bg-gray-700"
          onClick={() => navigate("/medicalteam/patients")}
        >
          Zone Patients Updates
        </button>
        <button
          className="block w-full p-3 text-left hover:bg-gray-700"
          onClick={() => navigate("/medicalteam/manage-at-home")}
        >
          Manage at Home
        </button>
        <button
          className="block w-full p-3 text-left hover:bg-gray-700"
          onClick={() => navigate("/medicalteam/transfer-to-hospital")}
        >
          Transfer to Hospital
        </button>
        <button
          className="block w-full p-3 text-left hover:bg-gray-700"
          onClick={() => navigate("/medicalteam/medicalportal/outbreakzone")}
        >
          Outbreak Zone
        </button>
      </div>

      <div className="flex justify-center p-4">
        <button
          className="w-10 h-10 rounded-full text-white bg-[#07a794] hover:bg-red-600 transition duration-300"
          onClick={toggleSidebar}
        >
          ✖
        </button>
      </div>
    </div>
  );
}

export default Sidebar;


// // src/components/deanportal/NewVirusReport.js
// import React, { useState } from "react";
// import "./deanportalcss/Newvirusreport.css";

// const SEVERITY_OPTIONS = ["Mild","Moderate","Severe"];

// const NewVirusReport = ({ viruses }) => {
//   const [selectedVirus, setSelectedVirus] = useState(null);
//   const [symptoms, setSymptoms]           = useState("");
//   const [severity, setSeverity]           = useState("");
//   const [guidelines, setGuidelines]       = useState("");
//   const [reports, setReports]             = useState([]);

//   const openModal = virus => {
//     setSelectedVirus(virus);
//     setSymptoms("");
//     setSeverity("");
//     setGuidelines("");
//   };
//   const closeModal = () => setSelectedVirus(null);

//   const handleSubmit = () => {
//     if (!symptoms.trim() || !severity) {
//       alert("Please fill all fields before submitting.");
//       return;
//     }
//     setReports(r => [
//       ...r,
//       {
//         ...selectedVirus,
//         symptoms,
//         severity,
//         guidelines,
//         date: new Date().toLocaleDateString()
//       }
//     ]);
//     closeModal();
//   };

//   return (
//     <div className="new-virus-report-container">
//       <h2>New Virus Reports</h2>

//       <div className="virus-cards">
//         {viruses.map(v => (
//           <div
//             key={v.id}
//             className="virus-card"
//             onClick={() => openModal(v)}
//           >
//             <h3>{v.name}</h3>
//           </div>
//         ))}
//         {viruses.length === 0 && (
//           <p className="no-viruses">⚠️ No viruses named yet.</p>
//         )}
//       </div>

//       {selectedVirus && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <button className="close-btn" onClick={closeModal}>❌</button>
//             <h2>{selectedVirus.name}</h2>

//             <label>Symptoms Description:</label>
//             <textarea
//               rows="3"
//               value={symptoms}
//               onChange={e => setSymptoms(e.target.value)}
//               placeholder="Enter detailed symptoms..."
//             />

//             <label>Severity Level:</label>
//             <select
//               value={severity}
//               onChange={e => setSeverity(e.target.value)}
//             >
//               <option value="">Select Severity</option>
//               {SEVERITY_OPTIONS.map(opt => (
//                 <option key={opt} value={opt}>{opt}</option>
//               ))}
//             </select>

//             <label>Guidelines (optional):</label>
//             <input
//               type="text"
//               value={guidelines}
//               onChange={e => setGuidelines(e.target.value)}
//               placeholder="Enter preventive measures..."
//             />

//             <button className="submit-btn" onClick={handleSubmit}>
//               Save Report
//             </button>
//           </div>
//         </div>
//       )}

//       <h2>Confirmed Reports</h2>
//       <table className="virus-report-table">
//         <thead>
//           <tr>
//             <th>Virus Name</th>
//             <th>Symptoms</th>
//             <th>Severity</th>
//             <th>Guidelines</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reports.map((r, i) => (
//             <tr key={i}>
//               <td>{r.name}</td>
//               <td>{r.symptoms}</td>
//               <td>{r.severity}</td>
//               <td>{r.guidelines || "N/A"}</td>
//               <td>{r.date}</td>
//             </tr>
//           ))}
//           {reports.length === 0 && (
//             <tr>
//               <td colSpan="5" className="no-rows">
//                 No confirmed reports yet.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default NewVirusReport;

// src/components/deanportal/NewVirusReport.js
import React from "react";
import "./deanportalcss/Newvirusreport.css";

const NewVirusReport = ({ viruses }) => {
  return (
    <div className="new-virus-report-container">
      <h2>Confirmed Reports</h2>
      <table className="virus-report-table">
        <thead>
          <tr>
            <th>Virus Name</th>
            <th>Symptoms</th>
            <th>Severity</th>
            <th>Guidelines</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {viruses.length > 0 ? (
            viruses.map((v, i) => (
              <tr key={i}>
                <td>{v.name}</td>
                <td>{v.symptoms}</td>
                <td>{v.severity}</td>
                <td>{v.guidelines || "N/A"}</td>
                <td>{v.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-rows">
                No confirmed reports yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NewVirusReport;

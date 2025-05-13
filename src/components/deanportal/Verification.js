// import React, { useState } from "react";
// import axios from "axios";
// import "./deanportalcss/Verification.css";

// const Verification = ({ cases, addToNewVirusReport }) => {
//   const [selectedCase, setSelectedCase] = useState(null);
//   const [virusName, setVirusName]       = useState("");
//   const [severityLevel, setSeverity]    = useState(""); 
//   const [guidelines,    setGuidelines]  = useState("");

//   const openModal  = c => { setSelectedCase(c); setVirusName(""); setSeverity(""); 
//     setGuidelines("");};
//   const closeModal = () => setSelectedCase(null);

//   const handleApprove = async () => {
//     if (!virusName.trim()) {
//       return alert("Please enter a virus name before approving.");
//     }
//     const payload = {
//       id:        selectedCase.id,
//       name:      selectedCase.name,
//       symptoms:  selectedCase.symptoms,
//       zone:      selectedCase.zone,
//       risk:      selectedCase.risk,
//       virusName
//     };

//     try {
//       await axios.post(
//         "http://localhost:5000/api/dean/confirm_case",
//         payload
//       );
//       addToNewVirusReport(payload);
//       closeModal();
//     } catch (err) {
//       console.error("Could not confirm case:", err);
//       alert("❌ Failed to confirm case. See console for details.");
//     }
//   };

//   const handleReject = () => {
//     closeModal();
//   };

//   return (
//     <div className="verification-container">
//       <h2>Verification Cases</h2>
//       <div className="case-list">
//         {cases.length === 0 ? (
//           <p className="no-cases">✅ No pending cases!</p>
//         ) : cases.map(c => (
//           <div
//             key={c.id}
//             className="case-card"
//             onClick={() => openModal(c)}
//           >
//             <h3>{c.name}</h3>
//             <p>🩺 Symptoms: {c.symptoms}</p>
//             <p>📍 Zone: {c.zone}</p>
//             <p className={`risk-${c.risk.toLowerCase()}`}>
//               ⚠️ {c.risk} Risk
//             </p>
//           </div>
//         ))}
//       </div>

//       {selectedCase && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <button className="close-btn" onClick={closeModal}>❌</button>
//             <h2>Verify Case</h2>
//             <p><strong>Name:</strong> {selectedCase.name}</p>
//             <p><strong>Age:</strong> {selectedCase.age}</p>
//             <p><strong>Symptoms:</strong> {selectedCase.symptoms}</p>
//             <p><strong>Zone:</strong> {selectedCase.zone}</p>
//             <p className={`risk-${selectedCase.risk.toLowerCase()}`}>
//               <strong>Risk:</strong> {selectedCase.risk}
//             </p>

//             <label>Enter Virus Name (if confirmed):</label>
//             <input
//               type="text"
//               value={virusName}
//               onChange={e => setVirusName(e.target.value)}
//               placeholder="Virus or infection name"
//             />

//             <div className="modal-buttons">
//               <button
//                 className="approve-btn"
//                 onClick={handleApprove}
//                 disabled={!virusName.trim()}
//               >
//                 ✅ Approve & Forward
//               </button>
//               <button className="reject-btn" onClick={handleReject}>
//                 ❌ Reject
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Verification;

// src/components/deanportal/Verification.js
import React, { useState } from "react";
import "./deanportalcss/Verification.css";

const Verification = ({ cases, addToNewVirusReport }) => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [virusName, setVirusName]       = useState("");
  const [severity,  setSeverity]        = useState("");
  const [guidelines, setGuidelines]     = useState("");

  const openModal = (c) => {
    setSelectedCase(c);
    setVirusName("");
    setSeverity("");
    setGuidelines("");
  };
  const closeModal = () => setSelectedCase(null);

  const handleApprove = () => {
    if (!virusName.trim() || !severity) {
      alert("Please enter a virus name and select a severity level.");
      return;
    }
    addToNewVirusReport({
      id:         selectedCase.id,
      name:       virusName,
      symptoms:   selectedCase.symptoms,
      zone:       selectedCase.zone,
      risk:       selectedCase.risk,
      severity:   severity,
      guidelines: guidelines,
      date:       new Date().toLocaleDateString(),
    });
    closeModal();
  };

  return (
    <div className="verification-container">
      <h2>Verification Cases</h2>

      <div className="case-list">
        {cases.length === 0 ? (
          <p className="no-cases">✅ No pending cases!</p>
        ) : (
          cases.map((c) => (
            <div
              key={c.id}
              className="case-card"
              onClick={() => openModal(c)}
            >
              <h3>{c.name}</h3>
              <p>🩺 Symptoms: {c.symptoms}</p>
              <p>📍 Zone: {c.zone}</p>
              <p className={`risk-${c.risk.toLowerCase()}`}>
                ⚠️ {c.risk} Risk
              </p>
            </div>
          ))
        )}
      </div>

      {selectedCase && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={closeModal}>
              ❌
            </button>

            <h2>Verify Case</h2>
            <p>
              <strong>Name:</strong> {selectedCase.name}
            </p>
            <p>
              <strong>Symptoms:</strong> {selectedCase.symptoms}
            </p>
            <p>
              <strong>Zone:</strong> {selectedCase.zone}
            </p>
            <p className={`risk-${selectedCase.risk.toLowerCase()}`}>
              <strong>Risk:</strong> {selectedCase.risk}
            </p>

            <label>Enter Virus Name (if confirmed):</label>
            <input
              type="text"
              value={virusName}
              onChange={(e) => setVirusName(e.target.value)}
              placeholder="Virus or infection name"
            />

            <label>Select Severity Level:</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="">— select —</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>

            <label>Enter Guidelines / Measures:</label>
            <textarea
              rows={3}
              value={guidelines}
              onChange={(e) => setGuidelines(e.target.value)}
              placeholder="e.g. mask + distancing, quarantine…"
            />

            <div className="modal-buttons">
              <button
                className="approve-btn"
                onClick={handleApprove}
                disabled={!virusName.trim() || !severity}
              >
                ✅ Approve & Forward
              </button>
              <button className="reject-btn" onClick={closeModal}>
                ❌ Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;

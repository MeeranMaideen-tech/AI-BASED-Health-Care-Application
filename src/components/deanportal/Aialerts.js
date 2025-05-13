// // src/components/deanportal/Aialerts.js
// import React, { useState, useEffect } from "react";
// import "./deanportalcss/Aialerts.css";

// export default function Aialerts() {
//   const [cases, setCases] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/dean/high_severity_cases")
//       .then(res => {
//         if (!res.ok) throw new Error(res.statusText);
//         return res.json();
//       })
//       .then(data => setCases(data))
//       .catch(err =>
//         console.error("Failed to load high-severity cases:", err)
//       );
//   }, []);

//   return (
//     <div className="Dean-ai-alerts-container">
//       <h2>AI Detection & Alerts</h2>
//       <table className="Dean-ai-alert-table">
//         <thead>
//           <tr>
//             <th>Patient Name</th>
//             <th>Age</th>
//             <th>Zone</th>
//             <th>Symptoms</th>
//             <th>Risk Level</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cases.length > 0 ? (
//             cases.map(c => (
//               <tr key={c.id}>
//                 <td>{c.name}</td>
//                 <td>{c.age}</td>
//                 <td>{c.zone}</td>
//                 <td>{c.symptoms}</td>
//                 <td className={`risk-${c.risk.toLowerCase()}`}>{c.risk}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="no-data">
//                 No high-severity cases to display.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// src/components/deanportal/Aialerts.js
// import React, { useState, useEffect } from "react";
// import "./deanportalcss/Aialerts.css";

// export default function Aialerts() {
//   const [spikes, setSpikes] = useState([]);
//   const zone = localStorage.getItem("zone") || "";

//   useEffect(() => {
//     if (!zone) return;

//     fetch(
//       `http://localhost:5000/api/hospital/symptom_spikes?zone=${encodeURIComponent(
//         zone
//       )}`
//     )
//       .then((res) => {
//         if (!res.ok) throw new Error(res.statusText);
//         return res.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setSpikes(data);
//         } else {
//           console.error("Expected array, got:", data);
//           setSpikes([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Could not load spike alerts:", err);
//         setSpikes([]);
//       });
//   }, [zone]);

//   return (
//     <div className="Dean-ai-alerts-container">
//       <h2>AI Detection & Alerts</h2>

//       <table className="Dean-ai-alert-table">
//         <thead>
//           <tr>
//             <th>Symptom</th>
//             <th>Cases Detected</th>
//             <th>Risk Level</th>
//             <th>Detection Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {spikes.length > 0 ? (
//             spikes.map((alert) => {
//               // simple risk by count—tweak as you like
//               let risk = "Low";
//               if (alert.count >= 20) risk = "High";
//               else if (alert.count >= 10) risk = "Medium";

//               return (
//                 <tr key={alert._id}>
//                   <td>{alert.symptom}</td>
//                   <td>{alert.count}</td>
//                   <td className={`risk-${risk.toLowerCase()}`}>{risk}</td>
//                   <td>
//                     {new Date(alert.detected_at).toLocaleDateString()}
//                   </td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan="4" className="no-data">
//                 No alerts detected in {zone || "your zone yet"}.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// src/components/deanportal/Aialerts.js
import React, { useState, useEffect } from "react";
import "./deanportalcss/Aialerts.css";

export default function Aialerts() {
  const [summary, setSummary] = useState([]);
  const zone = localStorage.getItem("zone") || "";

  useEffect(() => {
    if (!zone) return;

    fetch(
      `http://localhost:5000/api/hospital/symptom_spikes?zone=${encodeURIComponent(
        zone
      )}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((alerts) => {
        // initialize buckets
        const buckets = {
          High:     { count: 0, latest: null },
          Moderate: { count: 0, latest: null },
          Low:      { count: 0, latest: null }
        };

        alerts.forEach((a) => {
          // derive risk by count thresholds
          let risk;
          if (a.count >= 20) risk = "High";
          else if (a.count >= 10) risk = "Moderate";
          else risk = "Low";

          buckets[risk].count++;

          const d = new Date(a.detected_at);
          if (
            !buckets[risk].latest ||
            d.getTime() > new Date(buckets[risk].latest).getTime()
          ) {
            buckets[risk].latest = a.detected_at;
          }
        });

        // turn into array for rendering
        setSummary(
          Object.entries(buckets).map(([risk, { count, latest }]) => ({
            risk,
            count,
            date: latest
              ? new Date(latest).toLocaleDateString()
              : "—"
          }))
        );
      })
      .catch((err) => {
        console.error("Failed to load AI alerts:", err);
        setSummary([]);
      });
  }, [zone]);

  return (
    <div className="Dean-ai-alerts-container Dean-ai-alerts-container-cus">
      <h2>AI Detection & Alerts</h2>

      <table className="Dean-ai-alert-table">
        <thead>
          <tr>
            <th>Risk Level</th>
            <th>Count</th>
            <th>Latest Detection</th>
          </tr>
        </thead>
        <tbody>
          {summary.length > 0 ? (
            summary.map((row) => (
              <tr key={row.risk}>
                <td className={`risk-${row.risk.toLowerCase()}`}>
                  {row.risk}
                </td>
                <td>{row.count}</td>
                <td>{row.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">
                No spike data for {zone || "your zone"} yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

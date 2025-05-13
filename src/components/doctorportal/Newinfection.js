// // src/components/doctorportal/Newinfection.js
// import React, { useState, useEffect } from "react";
// import "./doctorportalcss/Newinfection.css";

// export default function Newinfection() {
//   const [zone, setZone] = useState("");
//   const [aiAlerts, setAiAlerts] = useState([]);

//   // 1) On mount: load zone (from localStorage or API)
//   useEffect(() => {
//     async function fetchZone() {
//       let z = localStorage.getItem("zone") || "";

//       if (!z) {
//         try {
//           const resp = await fetch(
//             "http://localhost:5000/api/hospital/patients_basic"
//           );
//           if (!resp.ok) throw new Error(`status ${resp.status}`);
//           const patients = await resp.json();
//           const first = Array.isArray(patients) && patients.find(p => p.zone);
//           if (first && first.zone) {
//             z = first.zone;
//             localStorage.setItem("zone", z);
//           }
//         } catch (err) {
//           console.error("❌ Error fetching patients_basic for zone:", err);
//         }
//       }

//       setZone(z);
//     }

//     fetchZone();
//   }, []);

//   // 2) Whenever zone is set, fetch the spike alerts
//   useEffect(() => {
//     if (!zone) {
//       setAiAlerts([]);
//       return;
//     }

//     async function fetchSpikes() {
//       try {
//         const url =
//           `http://localhost:5000/api/hospital/symptom_spikes?` +
//           `zone=${encodeURIComponent(zone)}`;
//         const resp = await fetch(url);
//         if (!resp.ok) {
//           console.error("❌ Spike API error:", resp.status);
//           setAiAlerts([]);
//           return;
//         }

//         const data = await resp.json();
//         if (!Array.isArray(data)) {
//           console.error("❌ Spike API did not return array:", data);
//           setAiAlerts([]);
//           return;
//         }

//         setAiAlerts(
//           data.map(a => ({
//             id:       a._id,
//             symptoms: a.symptom,
//             cases:    a.count,
//             risk:     "High",
//             date:     new Date(a.detected_at).toLocaleDateString()
//           }))
//         );
//       } catch (err) {
//         console.error("❌ Failed to load AI alerts:", err);
//         setAiAlerts([]);
//       }
//     }

//     fetchSpikes();
//   }, [zone]);

//   return (
//     <div className="new-infection-container">
//       <h2>AI Detection & Alerts</h2>
//       <table className="ai-alert-table">
//         <thead>
//           <tr>
//             <th>Common Symptoms</th>
//             <th>Cases Detected</th>
//             <th>Risk Level</th>
//             <th>Detection Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {aiAlerts.length > 0 ? (
//             aiAlerts.map(alert => (
//               <tr key={alert.id}>
//                 <td>{alert.symptoms}</td>
//                 <td>{alert.cases}</td>
//                 <td className={`risk-${alert.risk.toLowerCase()}`}>
//                   {alert.risk}
//                 </td>
//                 <td>{alert.date}</td>
//               </tr>
//             ))
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

// src/components/doctorportal/Newinfection.js
import React, { useState, useEffect } from "react";
import "./doctorportalcss/Newinfection.css";

export default function Newinfection() {
  const [spikes, setSpikes] = useState([]);
  const zone = localStorage.getItem("zone") || "";

  useEffect(() => {
    // 1) bail if we don’t know the zone yet
    if (!zone) return;

    // 2) fetch spike alerts for that zone
    fetch(
      `http://localhost:5000/api/hospital/symptom_spikes?zone=${encodeURIComponent(
        zone
      )}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        // ensure it’s an array
        if (Array.isArray(data)) {
          setSpikes(data);
        } else {
          console.error("Expected array, got:", data);
          setSpikes([]);
        }
      })
      .catch((err) => {
        console.error("Could not load spike alerts:", err);
        setSpikes([]);
      });
  }, [zone]);

  return (
    <div className="new-infection-container">
      <h2>AI Detection & Alerts</h2>

      <table className="ai-alert-table">
        <thead>
          <tr>
            <th>Symptom</th>
            <th>Cases Detected</th>
            <th>Risk Level</th>
            <th>Detection Date</th>
          </tr>
        </thead>
        <tbody>
          {spikes.length > 0 ? (
            spikes.map((alert) => {
              // derive risk purely from count; feel free to tweak thresholds
              let risk = "Low";
              if (alert.count >= 20) risk = "High";
              else if (alert.count >= 10) risk = "Medium";

              return (
                <tr key={alert._id}>
                  <td>{alert.symptom}</td>
                  <td>{alert.count}</td>
                  <td className={`risk-${risk.toLowerCase()}`}>{risk}</td>
                  <td>
                    {new Date(alert.detected_at).toLocaleDateString()}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="no-data">
                No alerts detected in {zone || "your zone yet"}.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

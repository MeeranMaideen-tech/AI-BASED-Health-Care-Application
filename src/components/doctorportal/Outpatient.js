// src/components/doctorportal/Outpatient.js
import React, { useState, useEffect } from "react";
import "./doctorportalcss/Outpatient.css";

const COMMON_SYMPTOMS = [
  "Fever","Fatigue","Headache","Muscle ache",
  "Chills/shivering","Sweating","Loss of appetite",
  "Nausea","Cough","Sore throat","Runny/stuffy nose",
  "Shortness of breath","Diarrhea"
];
const SEVERITIES = ["Mild","Moderate","High"];

export default function Outpatient() {
  const [patients, setPatients]       = useState([]);
  const [selected, setSelected]       = useState(null);
  const [symptomName, setSymptomName] = useState("");
  const [customSymptom, setCustomSymptom] = useState("");
  const [severity, setSeverity]       = useState(SEVERITIES[0]);
  const [symptoms, setSymptoms]       = useState([]);
  const [treatmentPlan, setTreatment] = useState("");
  const [tablets, setTablets]         = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/hospital/patients_basic")
      .then(r => r.json())
      .then(data => {
        setPatients(data);
        console.log("patients_basic payload:", data);
        const firstWithZone = data.find(p => p.zone);
        if (firstWithZone && firstWithZone.zone.trim()) {
         console.log("🏷 storing zone:", firstWithZone.zone);
         localStorage.setItem("zone", firstWithZone.zone);       }
        
      })
      .catch(console.error);
  }, []);

  const openModal = patient => {
    setSelected(patient);
    setSymptoms([]);
    setSymptomName("");
    setCustomSymptom("");
    setSeverity(SEVERITIES[0]);
    setTreatment("");
    setTablets("");
  };
  const closeModal = () => setSelected(null);

  const addSymptom = () => {
    const name = symptomName === "Custom"
      ? customSymptom.trim()
      : symptomName;
    if (!name) return alert("Enter or select a symptom");
    setSymptoms(syms => [...syms, { name, severity }]);
    setSymptomName("");
    setCustomSymptom("");
    setSeverity(SEVERITIES[0]);
  };
  const removeSymptom = idx =>
    setSymptoms(syms => syms.filter((_,i)=>i!==idx));

  const handleSave = async () => {
    if (!symptoms.length) return alert("Add at least one symptom");
    const payload = {
      patientId:    selected.id,
      zone:         selected.zone,
      symptoms,
      treatmentPlan,
      tablets:      tablets.split(",").map(t=>t.trim()),
      timestamp:    new Date().toISOString()
    };
    const res = await fetch(
      "http://localhost:5000/api/hospital/patient_visit",
      {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(payload)
      }
    );
    if (res.ok) {
      alert("✅ Visit recorded");
      closeModal();
    } else {
      const err = await res.json();
      alert("❌ " + err.error);
    }
  };

  return (
    <div className="outpatient-container">
      <h2 className="section-title">Outpatients</h2>
      <div className="card-grid">
        {patients.map(p => (
          <div className="patient-card" key={p.id}>
            <h3>{p.name}</h3>
            <p><strong>Age:</strong> {p.age}</p>
            <p><strong>Zone:</strong> {p.zone}</p>
            <p><strong>Address:</strong> {p.address}</p>
            <p><strong>BP:</strong> {p.bp}</p>
            <p><strong>Sugar:</strong> {p.sugar}</p>
            <p><strong>Ht:</strong> {p.height}</p>
            <p><strong>Wt:</strong> {p.weight}</p>
            <button className="btn-add" onClick={()=>openModal(p)}>
              Add Visit
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e=>e.stopPropagation()}>
            <h3 className="modal-title">{selected.name}'s Visit</h3>
            <div className="symptom-list">
              {symptoms.map((s,i) => (
                <div className="symptom-chip" key={i}>
                  {s.name} <em>({s.severity})</em>
                  <button onClick={()=>removeSymptom(i)}>✕</button>
                </div>
              ))}
            </div>
            <div className="form-row">
              <select
                value={symptomName}
                onChange={e=>setSymptomName(e.target.value)}
              >
                <option value="">Select Symptom</option>
                {COMMON_SYMPTOMS.map(s=>(<option key={s} value={s}>{s}</option>))}
                <option value="Custom">-- Custom --</option>
              </select>
              {symptomName==="Custom" && (
                <input
                  type="text"
                  placeholder="Custom symptom"
                  value={customSymptom}
                  onChange={e=>setCustomSymptom(e.target.value)}
                />
              )}
              <select
                value={severity}
                onChange={e=>setSeverity(e.target.value)}
              >
                {SEVERITIES.map(l=>(<option key={l} value={l}>{l}</option>))}
              </select>
              <button className="btn-add-symptom" onClick={addSymptom}>
                Add Symptom
              </button>
            </div>
            <div className="form-group">
              <label>Treatment Plan:</label>
              <textarea
                rows={2}
                value={treatmentPlan}
                onChange={e=>setTreatment(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Tablets (comma-separated):</label>
              <input
                value={tablets}
                onChange={e=>setTablets(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button className="btn-save" onClick={handleSave}>
                Save Visit
              </button>
              <button className="btn-cancel" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

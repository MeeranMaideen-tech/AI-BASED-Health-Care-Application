import React, { useState } from "react";

export default function AddPatient() {
  const [formData, setFormData] = useState({
    name: "", age: "", gender: "", address: "",
    zone: "", bp: "", sugar: "", height: "", weight: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/hospital/add_patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Patient Registered");
        setFormData({
          name:"", age:"", gender:"", address:"",
          zone:"", bp:"", sugar:"", height:"", weight:""
        });
      } else {
        alert("❌ " + data.error);
      }
    } catch {
      alert("❌ Network error");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold">Register New Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange}
          placeholder="Name" required className="w-full p-3 border rounded" />

        <input name="age" value={formData.age} onChange={handleChange}
          type="number" placeholder="Age" required className="w-full p-3 border rounded" />

        <select name="gender" value={formData.gender} onChange={handleChange}
          required className="w-full p-3 border rounded">
          <option value="">Select Gender</option>
          <option>Male</option><option>Female</option><option>Other</option>
        </select>

        <input name="address" value={formData.address} onChange={handleChange}
          placeholder="Address" required className="w-full p-3 border rounded" />

        <input name="zone" value={formData.zone} onChange={handleChange}
          placeholder="Zone (e.g. Zone A)" required className="w-full p-3 border rounded" />

        <input name="bp" value={formData.bp} onChange={handleChange}
          placeholder="Blood Pressure" required className="w-full p-3 border rounded" />

        <input name="sugar" value={formData.sugar} onChange={handleChange}
          type="number" placeholder="Sugar Level" required className="w-full p-3 border rounded" />

        <input name="height" value={formData.height} onChange={handleChange}
          type="number" placeholder="Height (cm)" required className="w-full p-3 border rounded" />

        <input name="weight" value={formData.weight} onChange={handleChange}
          type="number" placeholder="Weight (kg)" required className="w-full p-3 border rounded" />

        <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded">
          Register Patient
        </button>
      </form>
    </div>
  );
}

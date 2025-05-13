// src/components/PGStudentRegistration.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/pg";

export default function PGStudentRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    age: "",
    gender: "",
    address: "",
    aadhaar: "",
    email: "",
    hospital: "",
    specialization: "",
    mbbs_passing_year: "",
    license_number: "",
    password: "",
    photo: null,
    internship_certificate: null,
  });
  const [pgLocation, setPgLocation] = useState({ lat: "", lng: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Grab PG leader’s current location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPgLocation({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      },
      (err) => {
        console.warn("⚠️ Could not get PG location:", err.message);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = new FormData();
      // append all text fields
      Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
      // append PG leader coords
      payload.append("pg_lat", pgLocation.lat);
      payload.append("pg_lng", pgLocation.lng);

      const res = await axios.post(
        `${API_BASE}/register-pg-student`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(`✅ Registered! Your PG ID is ${res.data.unique_id}`);
      // store for later map origin
      localStorage.setItem("pgLocation", JSON.stringify(pgLocation));
      // maybe redirect to login/dashboard...
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.error ||
          "Registration failed. Please check the console."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Register PG Student</h2>
        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}

        {/* Grid of text inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "name", label: "Full Name", type: "text" },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "dob", label: "Date of Birth", type: "date" },
            { name: "age", label: "Age", type: "number" },
            { name: "gender", label: "Gender", type: "select" },
            { name: "address", label: "Address", type: "text" },
            { name: "aadhaar", label: "Aadhaar", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "hospital", label: "Hospital Name", type: "text" },
            { name: "specialization", label: "Specialization", type: "text" },
            {
              name: "mbbs_passing_year",
              label: "MBBS Passing Year",
              type: "text",
            },
            {
              name: "license_number",
              label: "License Number",
              type: "text",
            },
            { name: "password", label: "Password", type: "password" },
          ].map(({ name, label, type }) =>
            type === "select" ? (
              <div key={name}>
                <label className="block mb-1 text-gray-700">{label}</label>
                <select
                  name={name}
                  required
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select …</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            ) : (
              <div key={name}>
                <label className="block mb-1 text-gray-700">{label}</label>
                <input
                  name={name}
                  type={type}
                  required
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )
          )}
        </div>

        {/* File uploads */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              required
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">
              Internship Certificate
            </label>
            <input
              type="file"
              name="internship_certificate"
              accept=".pdf,image/*"
              required
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        {/* Show PG location for debugging */}
        <p className="text-sm text-gray-500">
          Leader’s location:{" "}
          {pgLocation.lat
            ? `${pgLocation.lat.toFixed(5)}, ${pgLocation.lng.toFixed(5)}`
            : "detecting…"}
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          {loading ? "Registering…" : "Register"}
        </button>
      </form>
    </div>
  );
}

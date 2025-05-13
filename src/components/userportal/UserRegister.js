// src/components/UserRegister.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { zoneForLatLng } from "../common/zones";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export default function UserRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zone: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    agreedToAlert: false,
    declarationReal: false,
    declarationSymptoms: false,
    profilePic: null,
  });
  const [locationData, setLocationData] = useState({ lat: 0, lng: 0 });
  const [registerDate, setRegisterDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedId, setGeneratedId] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // on mount: grab geolocation & compute zone, set register date
  useEffect(() => {
    setRegisterDate(new Date().toLocaleString());
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        setLocationData({ lat, lng });
        const z = zoneForLatLng(lat, lng);
        setFormData((fd) => ({ ...fd, zone: z }));
      },
      () => setError("Location access denied"),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((fd) => ({
      ...fd,
      [name]:
        type === "file"
          ? files[0]
          : type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // generate a unique public‑user ID
    const genId = `public-${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedId(genId);

    // assemble form payload
    const payload = new FormData();
    Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
    payload.append("userId", genId);
    payload.append("registerDate", registerDate);
    payload.append("location", JSON.stringify(locationData));
    // include any pending symptoms
    const pending = JSON.parse(sessionStorage.getItem("pendingSymptoms") || "[]");
    payload.append("symptoms", JSON.stringify(pending));

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_BASE}/register/public`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      // on success show popup
      setShowPopup(true);
      sessionStorage.removeItem("pendingSymptoms");
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedId);
    alert("User ID copied to clipboard!");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1605902711622-cfb43c4437d2)",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      {/* Success Popup */}
      {showPopup && (
        <div className="absolute z-20 bg-white p-8 rounded-xl shadow-lg text-center max-w-sm">
          <h3 className="text-2xl font-semibold mb-2">🎉 Registered!</h3>
          <p className="mb-4">Your User ID:</p>
          <div className="font-mono bg-yellow-100 text-yellow-700 p-2 rounded mb-4">
            {generatedId}
          </div>
          <button
            onClick={copyToClipboard}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mb-4"
          >
            Copy ID
          </button>
          <br />
          <button
            onClick={() => navigate("/userportal/home")}
            className="text-blue-600 hover:underline"
          >
            Go to Dashboard →
          </button>
        </div>
      )}

      {/* Registration Form */}
      {!showPopup && (
        <form
          onSubmit={handleSubmit}
          className="relative z-10 bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-2xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Public User Registration
          </h2>
          {error && (
            <p className="text-red-600 text-center font-medium">{error}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "name", label: "Full Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "phone", label: "Phone", type: "tel" },
              { name: "address", label: "Address", type: "text" },
              { name: "age", label: "Age", type: "number" },
              { name: "password", label: "Password", type: "password" },
              {
                name: "confirmPassword",
                label: "Confirm Password",
                type: "password",
              },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-gray-700 mb-1">{f.label}</label>
                <input
                  name={f.name}
                  type={f.type}
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}

            <div>
              <label className="block text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select …</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Profile Photo</label>
              <input
                name="profilePic"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* Zone & Coordinates */}
            <div>
              <label className="block text-gray-700 mb-1">Zone</label>
              <input
                readOnly
                value={formData.zone || "Determining…"}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Location (lat, lng)
              </label>
              <input
                readOnly
                value={
                  locationData.lat
                    ? `${locationData.lat.toFixed(5)}, ${locationData.lng.toFixed(5)}`
                    : "Detecting…"
                }
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
              />
            </div>
          </div>

          {/* Declarations */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="agreedToAlert"
                checked={formData.agreedToAlert}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span>I have received a zone alert</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="declarationReal"
                checked={formData.declarationReal}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span>I confirm all details are accurate</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="declarationSymptoms"
                checked={formData.declarationSymptoms}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span>Symptoms genuinely apply to me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold py-2 rounded-lg transition"
          >
            {loading ? "Submitting…" : "Register"}
          </button>
        </form>
      )}
    </div>
  );
}

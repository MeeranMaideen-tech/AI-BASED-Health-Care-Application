import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NormalUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    password: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const age = calculateAge(formData.dob);

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        ...formData,
        age,
        role: "user",
      });

      setUniqueId(response.data.unique_id);
      setShowPopup(true);
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(uniqueId);
    alert("User ID copied to clipboard!");
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Normal User Registration</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <label className="block mb-2">Full Name:</label>
        <input type="text" name="name" onChange={handleChange} required className="w-full p-2 border rounded" />

        <label className="block mt-4 mb-2">Phone Number:</label>
        <input type="text" name="phone" onChange={handleChange} required className="w-full p-2 border rounded" />

        <label className="block mt-4 mb-2">Date of Birth:</label>
        <input type="date" name="dob" onChange={handleChange} required className="w-full p-2 border rounded" />

        <label className="block mt-4 mb-2">Password:</label>
        <input type="password" name="password" onChange={handleChange} required className="w-full p-2 border rounded" />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 w-full rounded hover:bg-blue-600">
          Register
        </button>
      </form>

      {/* ✅ Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Registered Successfully!</h2>
            <p className="mb-2">Welcome, <span className="font-semibold">{formData.name}</span></p>
            <p className="text-gray-700 mb-4">Your User ID: <span className="font-mono font-bold">{uniqueId}</span></p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleCopy}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Copy ID
              </button>
              <button
                onClick={handleGoToLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NormalUser;

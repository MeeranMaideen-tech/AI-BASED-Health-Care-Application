import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({ unique_id: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const idPrefix = credentials.unique_id.split("-")[0].toUpperCase();
      let endpoint = "http://localhost:5000/api/login";
  
      if (idPrefix === "MT") {
        endpoint = "http://localhost:5000/api/mbbs/login";
      } else if (idPrefix === "P") {  // For PG students
        endpoint = "http://localhost:5000/api/pg/login-pg-student";// PG login route
      }
  
      await axios.post(endpoint, credentials); // <- No more unused variable
      alert("Login successful!");
  
      if (idPrefix === "MT") {
        navigate("/medicalteam");  // MBBS student portal
      } else if (idPrefix === "P") {
        navigate("/medicalteam");  // PG student portal
      } else {
        navigate("/userportal");  // For other user roles
      }
  
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>

        <label className="block mb-2 font-medium">User ID:</label>
        <input
          type="text"
          name="unique_id"
          onChange={handleChange}
          value={credentials.unique_id}
          required
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-2 font-medium">Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={credentials.password}
          required
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className={`w-full text-white p-2 rounded transition-colors ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

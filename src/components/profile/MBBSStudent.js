// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const MBBSStudent = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     department: "",
//     university: "",
//     registration_number: "",
//     password: "",
//   });

//   const [showPopup, setShowPopup] = useState(false);
//   const [uniqueId, setUniqueId] = useState("");
//   const [loading, setLoading] = useState(false); // Loading state
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validatePhoneNumber = (phone) => {
//     const phoneRegex = /^[0-9]{10}$/; // Simple validation for 10-digit phone number
//     return phoneRegex.test(phone);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validatePhoneNumber(formData.phone)) {
//       alert("Please enter a valid 10-digit phone number.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post("http://localhost:5000/api/mbbs/register", formData);
//       setUniqueId(response.data.unique_id);
//       setShowPopup(true);
//     } catch (error) {
//       alert("Registration failed. Check fields or server.");
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(uniqueId);
//     alert("ID copied to clipboard!");
//   };

//   const handleGoToLogin = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
//       <h1 className="text-2xl font-bold mb-4">MBBS Student Registration</h1>

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <label className="block mb-2">Name:</label>
//         <input
//           type="text"
//           name="name"
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />

//         <label className="block mt-4 mb-2">Phone:</label>
//         <input
//           type="text"
//           name="phone"
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />

//         <label className="block mt-4 mb-2">Department:</label>
//         <input
//           type="text"
//           name="department"
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />

//         <label className="block mt-4 mb-2">University:</label>
//         <input
//           type="text"
//           name="university"
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />

//         <label className="block mt-4 mb-2">University Reg. No:</label>
//         <input
//           type="text"
//           name="registration_number"
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />

//         <label className="block mt-4 mb-2">Password:</label>
//         <input
//           type="password"
//           name="password"
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />

//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 mt-4 w-full rounded hover:bg-blue-600"
//           disabled={loading} // Disable button when loading
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>

//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
//             <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Registered Successfully!</h2>
//             <p className="mb-2">Welcome, <span className="font-semibold">{formData.name}</span></p>
//             <p className="text-gray-700 mb-4">Your ID: <span className="font-mono font-bold">{uniqueId}</span></p>

//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleCopy}
//                 className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//               >
//                 Copy ID
//               </button>
//               <button
//                 onClick={handleGoToLogin}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 Go to Login
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MBBSStudent;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MBBSStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    department: "",
    university: "",
    registration_number: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePhoneNumber = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        payload.append(key, val);
      });
      if (image) payload.append("image", image);

      const res = await axios.post("http://localhost:5000/api/mbbs/register", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUniqueId(res.data.unique_id);
      setShowPopup(true);
    } catch (err) {
      alert("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">MBBS Student Registration</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {["name", "phone", "department", "university", "registration_number", "password"].map((field, i) => (
          <div key={i} className="mb-4">
            <label className="block mb-1 capitalize">{field.replace("_", " ")}:</label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              required
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        <label className="block mt-4 mb-2">Profile Photo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 w-full rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Registered Successfully!</h2>
            <p>Welcome, <span className="font-semibold">{formData.name}</span></p>
            <p className="text-gray-700 mb-4">Your ID: <span className="font-mono font-bold">{uniqueId}</span></p>
            <div className="flex justify-center gap-4">
              <button onClick={() => navigator.clipboard.writeText(uniqueId)} className="bg-gray-300 px-4 py-2 rounded">
                Copy ID
              </button>
              <button onClick={() => navigate("/login")} className="bg-blue-500 text-white px-4 py-2 rounded">
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MBBSStudent;

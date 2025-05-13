import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaClipboardList,
  FaHospital,
  FaAmbulance,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import axios from "axios";
import "./userportalcss/userhome.css";
import ManageAtHome from "./ManageAtHome";

function UserHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageAtHomeOpen, setIsManageAtHomeOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentStepIndex = 0;

  const trackingSteps = [
    {
      icon: <FaClipboardList />,
      status: "Case Raised",
      color: "bg-green-500",
      bgImage: "https://source.unsplash.com/400x300/?covid",
    },
    {
      icon: <FaUserCircle />,
      status: "Medical Team Received",
      color: "bg-blue-500",
      bgImage: "https://source.unsplash.com/400x300/?doctor",
    },
    {
      icon: <FaAmbulance />,
      status: "Medical Team On the Way",
      color: "bg-yellow-500",
      bgImage: "https://source.unsplash.com/400x300/?ambulance",
    },
    {
      icon: <FaHospital />,
      status: "Moved to Hospital",
      color: "bg-red-500",
      bgImage: "/virus1.png",
    },
    {
      icon: <FaHome />,
      status: "Managing at Home",
      color: "bg-purple-600",
      bgImage: "/virus1.png",
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("publicUserToken");
      if (!token) return;

      const userId = token.replace("public-", "");
      try {
        const res = await axios.get(`http://localhost:5000/register/login/profile/${userId}`);
        setUserData(res.data);
      } catch (err) {
        console.error("Failed to load user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (raw) => {
    try {
      return new Date(raw).toLocaleDateString();
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="flex flex-col gap-16 p-10 min-h-screen bg-gradient-to-b from-gray-900 text-white">
      <div className="flex flex-wrap justify-center gap-16 w-full max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center text-white text-xl">Loading profile...</p>
        ) : userData ? (
          <>
            <div className="w-[500px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-10 text-center hover:scale-105 transition-transform duration-300">
              <img
                src={userData.profile_pic || "/patientm.jpg"}
                alt="User Profile"
                className="w-24 h-24 mx-auto rounded-full border-4 border-black mb-4 shadow-lg"
              />
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p>📅 Age: {userData.age}</p>
              <p>📞 {userData.phone}</p>
              <p>📍 {userData.address}</p>
            </div>

            <div
              className="w-[500px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-10 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <h3 className="text-2xl font-bold">COVID-19</h3>
              <div className="flex justify-between w-full mt-20">
                <p>📅 {formatDate(userData.registered_at)}</p>
                <p className="hover:text-blue-300">🌍 {userData.zone || "N/A"}</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-red-500 font-semibold">User profile not found.</p>
        )}
      </div>

      {/* ✅ Case Tracking Timeline */}
      <div className="relative flex flex-col items-center mt-20 min-h-[700px]">
        <div className="absolute w-2 h-full left-1/2 transform -translate-x-1/2 z-0 bg-gray-500 rounded-lg overflow-hidden">
          <div
            className="absolute w-full bg-gradient-to-b from-green-500 via-blue-500 to-yellow-500 transition-all duration-700"
            style={{
              height: `${((currentStepIndex + 1) / trackingSteps.length) * 80}%`,
              top: 0,
            }}
          />
        </div>

        {trackingSteps.map((step, index) => (
          <div
            key={index}
            className={`relative flex w-full max-w-3xl mb-12 ${index % 2 === 0 ? "justify-start pr-12" : "justify-end pl-12"}`}
          >
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 h-[6px] z-10 ${
                index % 2 === 0 ? "left-[calc(50%-85px)] w-[85px]" : "right-[calc(50%-85px)] w-[85px]"
              } ${index <= currentStepIndex ? step.color : "bg-gray-400"} rounded-full`}
            />

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xl border-4 border-white ${
                index <= currentStepIndex ? step.color : "bg-gray-400"
              }`}>
                {step.icon}
              </div>
            </div>

            <div
              className="relative flex items-center space-x-6 p-6 shadow-lg rounded-lg w-[300px] h-[120px] z-20 transition-transform duration-700"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${step.bgImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => {
                if (step.status === "Managing at Home") {
                  setIsManageAtHomeOpen(true);
                }
              }}
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-full ${
                index <= currentStepIndex ? step.color : "bg-gray-500"
              } shadow-lg text-white text-lg`}>
                {step.icon}
              </div>
              <p className="text-lg font-semibold">{step.status}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Symptom Modal */}
      {isModalOpen && userData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] max-h-[90vh] overflow-y-auto text-black relative">
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-900">🦠 COVID-19</h2>
              <FaTimes
                className="text-red-500 cursor-pointer hover:text-red-700 absolute top-4 right-4"
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            <h3 className="text-xl font-semibold mb-2 text-purple-800">Reported Symptoms:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-800 mb-4">
              {(userData.symptoms || []).map((symptom, idx) => (
                <li key={idx}>✅ {symptom}</li>
              ))}
            </ul>

            <p className="text-sm text-gray-600 text-center mt-6">
              📝 This case has been submitted to the medical team.
            </p>
          </div>
        </div>
      )}

      {/* ✅ Manage At Home Modal */}
      {isManageAtHomeOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] max-h-[90vh] overflow-y-auto text-black relative">
            <button
              className="absolute top-3 right-3 text-red-500 text-2xl hover:text-red-700"
              onClick={() => setIsManageAtHomeOpen(false)}
            >
              <FaTimes />
            </button>
            <ManageAtHome />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserHome;

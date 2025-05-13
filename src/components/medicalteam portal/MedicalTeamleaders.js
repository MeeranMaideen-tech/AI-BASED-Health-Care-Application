import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MedicalTeamLeaders = () => {
  const [leaders, setLeaders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dean/team_leaders");
        setLeaders(res.data);
      } catch (err) {
        console.error("Error fetching leaders:", err);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Medical Team Leaders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaders.map((leader, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#07a794]"
          >
            <div className="flex items-center space-x-4">
              <img
                src={`http://localhost:5000/uploads/pg_photos/${leader.pg_id}.jpg`}
                onError={(e) => (e.target.src = "/default-avatar.jpg")}
                alt={leader.pg_name}
                className="w-16 h-16 rounded-full border border-[#07a794]"
              />
              <div>
                <h2 className="text-xl font-semibold">{leader.pg_name}</h2>
                <p className="text-sm text-gray-600">Phone: {leader.phone}</p>
                <p className="text-sm font-bold text-blue-700 mt-1">
                  You are assigned as Team Leader for{" "}
                  <span className="text-[#07a794]">{leader.zone}</span>
                </p>
              </div>
            </div>

            {/* ✅ Correct Navigation with pg_id in URL */}
            <button
              onClick={() => navigate(`/createteam/${leader.pg_id}`)}
              className="mt-4 w-full bg-blue-900 hover:bg-[#07a794] text-white py-2 rounded-lg"
            >
              Create Team
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalTeamLeaders;

// // src/components/Team.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Team() {
  const { pg_id } = useParams();
  const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  const [leader, setLeader] = useState(null);
  const [zone, setZone] = useState("");
  const [teamName, setTeamName] = useState("");
  const [available, setAvailable] = useState([]);
  const [selected, setSelected] = useState([]);
  const [created, setCreated] = useState(null);

  // 1️⃣ Load PG leader info
  useEffect(() => {
    axios.get(`${API}/api/dean/assigned_zone/${pg_id}`)
      .then(r => {
        const data = r.data;
        setLeader(data);
        setZone(data.zone);
        setTeamName(`${data.pg_name}'s Team`);
      })
      .catch(e => console.error("❌ Failed to fetch PG leader:", e));
  }, [API, pg_id]);

  // 2️⃣ Load unassigned MBBS students
  useEffect(() => {
    axios.get(`${API}/api/mbbs/available`)
      .then(r => setAvailable(r.data))
      .catch(e => console.error("❌ Failed to fetch MBBS students:", e));
  }, [API]);

  const toggleStudent = (stu) => {
    const exists = selected.some(s => s.unique_id === stu.unique_id);
    if (exists) {
      // remove on single‑click if already selected
      setSelected(selected.filter(s => s.unique_id !== stu.unique_id));
    } else if (selected.length < 5) {
      setSelected([...selected, stu]);
    } else {
      alert("⚠️ You can only pick up to 5 students.");
    }
  };

  const handleUnselect = (stu) => {
    if (window.confirm(`Do you really want to unselect ${stu.name}?`)) {
      setSelected(selected.filter(s => s.unique_id !== stu.unique_id));
    }
  };

  // 3️⃣ Create team & assign students
  const createTeam = async () => {
    if (selected.length !== 5) {
      return alert("⚠️ Please select exactly 5 members.");
    }
    const teamData = {
      team_leader_id: pg_id,
      leader_name:   leader.pg_name,
      zone,
      team_name:     teamName,
      members:       selected,
    };

    // optionally save team record
    try {
      await axios.post(`${API}/api/mbbs/teams`, teamData);
    } catch {}

    // then assign students
    try {
      const student_ids = selected.map(s => s._id);
      await axios.post(`${API}/api/mbbs/assign`, { pg_id, student_ids });
      setCreated(teamData);
      alert("✅ Team created and students assigned!");
    } catch (e) {
      console.error("❌ Error assigning students:", e);
      alert("Something went wrong assigning students.");
    }
  };

  if (!leader) {
    return <p className="text-center mt-10">Loading leader info…</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Create Medical Team</h1>

      <div className="mb-6">
        <p><strong>Leader:</strong> {leader.pg_name}</p>
        <p><strong>Zone:</strong>   {zone}</p>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">Team Name</label>
        <input
          type="text"
          value={teamName}
          onChange={e => setTeamName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Select 5 Members</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {available.map(stu => {
          const isSel = selected.some(s => s.unique_id === stu.unique_id);
          return (
            <div
              key={stu.unique_id}
              onClick={() => toggleStudent(stu)}
              className={`p-4 rounded-lg cursor-pointer transition ${
                isSel ? "bg-green-200" : "bg-white hover:shadow-lg"
              }`}
            >
              <img
                src={`${API}${stu.image}`}
                alt={stu.name}
                className="w-14 h-14 rounded-full mx-auto mb-2"
              />
              <p className="text-center font-medium">{stu.name}</p>
              <p className="text-center text-sm">{stu.department}</p>
            </div>
          );
        })}
      </div>

      {/* ── Mini‑cards of selected members ── */}
      {selected.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Selected Members (double‑click to unselect)</h3>
          <div className="flex flex-wrap gap-3">
            {selected.map(stu => (
              <div
                key={stu.unique_id}
                onDoubleClick={() => handleUnselect(stu)}
                className="w-20 p-1 bg-yellow-100 rounded-lg text-center cursor-pointer hover:bg-yellow-200 transition"
                title="Double‑click to remove"
              >
                <img
                  src={`${API}${stu.image}`}
                  alt={stu.name}
                  className="w-12 h-12 rounded-full mx-auto mb-1"
                />
                <p className="text-xs truncate">{stu.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={createTeam}
        className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800"
      >
        Create Team
      </button>

      {created && (
        <div className="mt-6 p-4 border rounded bg-green-50">
          <h2 className="font-bold text-green-700">Team Created!</h2>
          <p>{created.team_name} — {created.zone}</p>
          <ul className="list-disc pl-5 mt-2">
            {created.members.map((m,i) =>
              <li key={i}>{m.name} ({m.department})</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Team;

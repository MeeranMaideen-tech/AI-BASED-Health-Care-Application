// // import React, { useState } from "react";
// // import "./deanportalcss/Allocatemedicalteam.css"; // Import separate CSS

// // // Sample PG Student Data (Replace with dynamic data in future)
// // const pgStudents = [
// //   { id: 1, name: "John Doe", department: "Cardiology",  phone: "9876543210", image: "pgstudentm.jpg" },
// //   { id: 2, name: "Alice Smith", department: "General Medicine",  phone: "9876501234", image: "pgstudentf.jpg" },
// //   { id: 3, name: "Michael Brown", department: "Neurology",  phone: "9876512345", image: "pgstudentm.jpg" },
// // ];

// // // Zones List
// // const zones = ["Zone A", "Zone B", "Zone C", "Zone D"];

// // const AllocateMedicalTeam = () => {
// //   const [search, setSearch] = useState("");
// //   const [selectedStudent, setSelectedStudent] = useState(null);
// //   const [selectedZone, setSelectedZone] = useState("");
// //   const [assignedTeams, setAssignedTeams] = useState([]);

// //   // Filter PG students based on search input
// //   const filteredStudents = pgStudents.filter((student) =>
// //     student.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   // Assign Team Function
// //   const handleAssign = () => {
// //     if (selectedStudent && selectedZone) {
// //       setAssignedTeams([...assignedTeams, { ...selectedStudent, zone: selectedZone, date: new Date().toLocaleDateString() }]);
// //       setSelectedStudent(null);
// //       setSelectedZone("");
// //       setSearch(""); // Clear search input after assignment
// //     } else {
// //       alert("Please select a PG student and a zone before assigning!");
// //     }
// //   };

// //   return (
// //     <div className="allocate-team-container">
// //       <h2>Allocate Medical Team</h2>

// //       {/* Search Bar for PG Students */}
// //       <input
// //         type="text"
// //         placeholder="Search PG Student..."
// //         value={search}
// //         onChange={(e) => setSearch(e.target.value)}
// //         className="search-bar"
// //       />

// //       {/* Display PG Students in Cards */}
// //       <div className="student-cards">
// //         {filteredStudents.map((student) => (
// //           <div
// //             key={student.id}
// //             className={`student-card ${selectedStudent?.id === student.id ? "selected" : ""}`}
// //             onClick={() => setSelectedStudent(student)}
// //           >
// //             <img src={student.image} alt={student.name} className="student-photo" />
// //             <h3>{student.name}</h3>
// //             <p><strong>Department:</strong> {student.department}</p>
// //             <p><strong>Specialization:</strong> {student.specialization}</p>
// //             <p><strong>Phone:</strong> {student.phone}</p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Zone Selection Buttons */}
// //       <h3>Select Zone:</h3>
// //       <div className="zone-buttons">
// //         {zones.map((zone) => (
// //           <button
// //             key={zone}
// //             className={`zone-btn ${selectedZone === zone ? "selected" : ""}`}
// //             onClick={() => setSelectedZone(zone)}
// //           >
// //             {zone}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Assign Button */}
// //       <button className="assign-btn" onClick={handleAssign}>Assign Medical Team</button>

// //       {/* Assigned Teams Table */}
// //       <h3>Assigned Teams</h3>
// //       <table className="assigned-teams-table">
// //         <thead>
// //           <tr>
// //             <th>Photo</th>
// //             <th>PG Student</th>
// //             <th>Department</th>
// //             <th>Specialization</th>
// //             <th>Phone</th>
// //             <th>Zone</th>
// //             <th>Date Assigned</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {assignedTeams.map((team, index) => (
// //             <tr key={index}>
// //               <td><img src={team.image} alt={team.name} className="assigned-photo" /></td>
// //               <td>{team.name}</td>
// //               <td>{team.department}</td>
// //               <td>{team.specialization}</td>
// //               <td>{team.phone}</td>
// //               <td>{team.zone}</td>
// //               <td>{team.date}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default AllocateMedicalTeam;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./deanportalcss/Allocatemedicalteam.css";

// const zones = ["Zone A", "Zone B", "Zone C", "Zone D"];

// const AllocateMedicalTeam = () => {
//   const [pgStudents, setPgStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [selectedZone, setSelectedZone] = useState("");
//   const [assignedTeams, setAssignedTeams] = useState([]);

//   // Fetch PG student data from backend
//   useEffect(() => {
//     const fetchPGStudents = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/pg/api/pgstudents");
//         setPgStudents(response.data);
//       } catch (error) {
//         console.error("Error fetching PG students:", error);
//       }
//     };
//     fetchPGStudents();
//   }, []);

//   const filteredStudents = pgStudents.filter((student) =>
//     student.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleAssign = () => {
//     if (selectedStudent && selectedZone) {
//       setAssignedTeams([
//         ...assignedTeams,
//         {
//           ...selectedStudent,
//           zone: selectedZone,
//           date: new Date().toLocaleDateString(),
//         },
//       ]);
//       setSelectedStudent(null);
//       setSelectedZone("");
//       setSearch("");
//     } else {
//       alert("Please select a PG student and a zone before assigning!");
//     }
//   };

//   return (
//     <div className="allocate-team-container">
//       <h2>Allocate Medical Team</h2>

//       <input
//         type="text"
//         placeholder="Search PG Student..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="search-bar"
//       />

//       {/* PG Student Cards */}
//       <div className="student-cards">
//         {filteredStudents.map((student) => (
//           <div
//             key={student.id}
//             className={`student-card ${selectedStudent?.id === student.id ? "selected" : ""}`}
//             onClick={() => setSelectedStudent(student)}
//           >
//             <img
//               src={`http://localhost:5000${student.image}`}
//               alt={student.name}
//               className="student-photo"
//             />
//             <h3>{student.name}</h3>
//             <p><strong>Department:</strong> {student.specialization}</p>
//             <p><strong>Phone:</strong> {student.phone || "N/A"}</p>
//           </div>
//         ))}
//       </div>

//       <h3>Select Zone:</h3>
//       <div className="zone-buttons">
//         {zones.map((zone) => (
//           <button
//             key={zone}
//             className={`zone-btn ${selectedZone === zone ? "selected" : ""}`}
//             onClick={() => setSelectedZone(zone)}
//           >
//             {zone}
//           </button>
//         ))}
//       </div>

//       <button className="assign-btn" onClick={handleAssign}>Assign Medical Team</button>

//       <h3>Assigned Teams</h3>
//       <table className="assigned-teams-table">
//         <thead>
//           <tr>
//             <th>Photo</th>
//             <th>PG Student</th>
//             <th>Specialization</th>
//             <th>Phone</th>
//             <th>Zone</th>
//             <th>Date Assigned</th>
//           </tr>
//         </thead>
//         <tbody>
//           {assignedTeams.map((team, index) => (
//             <tr key={index}>
//               <td>
//                 <img
//                   src={`http://localhost:5000${team.image}`}
//                   alt={team.name}
//                   className="assigned-photo"
//                 />
//               </td>
//               <td>{team.name}</td>
//               <td>{team.specialization}</td>
//               <td>{team.phone || "N/A"}</td>
//               <td>{team.zone}</td>
//               <td>{team.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllocateMedicalTeam;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./deanportalcss/Allocatemedicalteam.css";

const zones = ["Zone A", "Zone B", "Zone C", "Zone D"];

const AllocateMedicalTeam = () => {
  const [pgStudents, setPgStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedZone, setSelectedZone] = useState("");
  const [assignedTeams, setAssignedTeams] = useState([]);

  // 🔄 Fetch PG student data from backend
  useEffect(() => {
    const fetchPGStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pg/api/pgstudents");
        setPgStudents(response.data);
      } catch (error) {
        console.error("Error fetching PG students:", error);
      }
    };
    fetchPGStudents();
  }, []);

  const filteredStudents = pgStudents.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Assign PG student to zone AND save in backend
  const handleAssign = async () => {
    if (selectedStudent && selectedZone) {
      const payload = {
        pg_id: selectedStudent.id,
        pg_name: selectedStudent.name,
        phone: selectedStudent.phone,
        zone: selectedZone,
        assigned_on: new Date().toLocaleDateString(),
      };

      try {
        await axios.post("http://localhost:5000/api/dean/assign_pg", payload);
        alert("PG Assigned Successfully!");

        setAssignedTeams([...assignedTeams, payload]);
        setSelectedStudent(null);
        setSelectedZone("");
        setSearch("");
      } catch (error) {
        alert("Failed to assign PG. Check server.");
        console.error(error);
      }
    } else {
      alert("Please select a PG student and a zone before assigning!");
    }
  };

  return (
    <div className="allocate-team-container">
      <h2>Allocate Medical Team</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search PG Student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* 🧑‍⚕️ PG Student Cards */}
      <div className="student-cards">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className={`student-card ${selectedStudent?.id === student.id ? "selected" : ""}`}
            onClick={() => setSelectedStudent(student)}
          >
            <img
              src={`http://localhost:5000${student.image}`}
              alt={student.name}
              className="student-photo"
            />
            <h3>{student.name}</h3>
            <p><strong>Department:</strong> {student.specialization}</p>
            <p><strong>Phone:</strong> {student.phone || "N/A"}</p>
          </div>
        ))}
      </div>

      {/* 🌍 Zone Selection */}
      <h3>Select Zone:</h3>
      <div className="zone-buttons">
        {zones.map((zone) => (
          <button
            key={zone}
            className={`zone-btn ${selectedZone === zone ? "selected" : ""}`}
            onClick={() => setSelectedZone(zone)}
          >
            {zone}
          </button>
        ))}
      </div>

      {/* ✅ Assign Button */}
      <button className="assign-btn" onClick={handleAssign}>Assign Medical Team</button>

      {/* 📋 Assigned Teams Table */}
      <h3>Assigned Teams</h3>
      <table className="assigned-teams-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>PG Student</th>
            <th>Specialization</th>
            <th>Phone</th>
            <th>Zone</th>
            <th>Date Assigned</th>
          </tr>
        </thead>
        <tbody>
          {assignedTeams.map((team, index) => (
            <tr key={index}>
              <td>
                <img
                  src={`http://localhost:5000${team.image || "/default-avatar.jpg"}`}
                  alt={team.pg_name}
                  className="assigned-photo"
                />
              </td>
              <td>{team.pg_name}</td>
              <td>{team.specialization || "N/A"}</td>
              <td>{team.phone || "N/A"}</td>
              <td>{team.zone}</td>
              <td>{team.assigned_on}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllocateMedicalTeam;

// import React from "react";

// const ManageAtHome = ({ patients }) => {
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
//         Manage at Home
//       </h2>
//       {patients.length === 0 ? (
//         <p className="text-gray-600 dark:text-gray-300">No patients assigned to Home Care.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {patients.map((patient) => (
//             <div
//               key={patient.user_id}
//               className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-5 flex flex-col items-center text-center border border-green-500"
//             >
//               <img
//                 src={patient.profile_pic || "/patientm.jpg"}
//                 alt={patient.name}
//                 className="w-20 h-20 rounded-full border-4 mb-4"
//               />
//               <h4 className="text-lg font-semibold">{patient.name}</h4>
//               <p className="text-sm text-gray-600"><strong>Age:</strong> {patient.age}</p>
//               <p className="text-sm text-gray-600"><strong>Zone:</strong> {patient.zone}</p>
//               <p className="text-sm text-gray-600"><strong>Phone:</strong> {patient.phone}</p>
//               <span className="mt-3 px-3 py-1 text-sm font-semibold bg-green-100 text-green-700 rounded-full">
//                 Home Care
//               </span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageAtHome;

import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageAtHome = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/user/care/home")
      .then(res => setPatients(res.data || []))
      .catch(err => console.error("❌ Failed to fetch home-care patients:", err));
  }, []);
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage at Home</h2>

      {patients.length === 0 ? (
        <p className="text-gray-600">No patients assigned to Home Care.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {patients.map((p) => (
            <div key={p.user_id} className="bg-white rounded-lg shadow p-4 border">
              <img
                src={p.profile_pic || "/patientm.jpg"}
                alt={p.name}
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p>Age: {p.age}</p>
              <p>Phone: {p.phone}</p>
              <p>Zone: {p.zone}</p>

              <h4 className="mt-3 font-medium">Symptoms:</h4>
              <ul className="list-disc pl-5">
                {p.symptoms.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              <h4 className="mt-3 font-medium">Vitals:</h4>
              <p>BP: {p.vitals.bp}</p>
              <p>Sugar: {p.vitals.sugar}</p>
              <p>Height: {p.vitals.height}</p>
              <p>Weight: {p.vitals.weight}</p>

              <p className="mt-3"><strong>Treatment:</strong> {p.treatment}</p>
              <p><strong>Advice:</strong> {p.advice}</p>

              <p className="mt-2 text-sm text-gray-500">
                Assigned at: {new Date(p.assigned_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAtHome;

import React, { useState } from "react";

const students = [
  { id: 1, name: "John Doe", role: "UG Student", specialization: "Cardiology", experience: "Final Year" },
  { id: 2, name: "Jane Smith", role: "UG Student", specialization: "Neurology", experience: "Final Year" },
  { id: 3, name: "William Brown", role: "PG Student", specialization: "Orthopedic Surgery", experience: "3 Years" },
  { id: 4, name: "Divya Sharma", role: "UG Student", specialization: "Dermatology", experience: "Final Year" },
  { id: 5, name: "Hemesh Kumar", role: "PG Student", specialization: "Oncology", experience: "4 Years" },
];

const DoctorProfile = ({ isSidebarOpen }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleCardClick = (student) => {
    if (student.role === "UG Student") {
      setSelectedStudent(student);
    }
  };

  return (
    <div className={`p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Student Profiles</h2>

      {/* Student Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {students.map((student) => {
          const isFemale = ["Jane Smith", "Divya Sharma"].includes(student.name);
          return (
            <div
              key={student.id}
              className="p-6 bg-white border-2 border-[#07a794] rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => handleCardClick(student)}
            >
              {/* Profile Image Based on Gender */}
              <img
                src={
                  isFemale
                    ? `${process.env.PUBLIC_URL}/pgstudentf.jpg`
                    : `${process.env.PUBLIC_URL}/pgstudentm.jpg`
                }
                alt={student.name}
                className="w-24 h-24 mx-auto rounded-full border-2 border-[#07a794]"
              />
              <h3 className="text-lg font-semibold mt-3 text-center text-gray-800">
                {student.name}
              </h3>
              <p className="text-gray-600 text-center">{student.specialization}</p>
              <p className="text-gray-500 text-sm text-center">{student.experience}</p>
              <p className="text-sm text-center font-semibold text-blue-600">{student.role}</p>
            </div>
          );
        })}
      </div>

      {/* UG Student Detailed View */}
      {selectedStudent && (
        <div className="mt-6 p-6 bg-white border-2 border-[#07a794] rounded-lg shadow-lg">
          <button
            onClick={() => setSelectedStudent(null)}
            className="float-right text-red-500 text-xl font-bold cursor-pointer"
          >
            &times;
          </button>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Student Details</h3>
          <div className="flex items-center space-x-4">
            <img
              src={
                ["Jane Smith", "Divya Sharma"].includes(selectedStudent.name)
                  ? `${process.env.PUBLIC_URL}/pgstudentf.jpg`
                  : `${process.env.PUBLIC_URL}/pgstudentm.jpg`
              }
              alt={selectedStudent.name}
              className="w-20 h-20 rounded-full border-2 border-[#07a794]"
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">{selectedStudent.name}</p>
              <p className="text-gray-600">{selectedStudent.specialization}</p>
              <p className="text-gray-500 text-sm">{selectedStudent.experience}</p>
              <p className="text-sm font-semibold text-blue-600">{selectedStudent.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;

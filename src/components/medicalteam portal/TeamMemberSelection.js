import React from "react";

const TeamMemberSelection = ({ availableDoctors, selectedDoctors, setSelectedDoctors }) => {
  const handleDoctorSelection = (doctor) => {
    if (selectedDoctors.includes(doctor)) {
      setSelectedDoctors(selectedDoctors.filter((d) => d.id !== doctor.id));
    } else if (selectedDoctors.length < 5) {
      setSelectedDoctors([...selectedDoctors, doctor]);
    } else {
      alert("You can only select up to 5 doctors.");
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Select Team Members (Max: 5)
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {availableDoctors.map((doctor) => {
          const isSelected = selectedDoctors.includes(doctor);

          return (
            <div
              key={doctor.id}
              className={`p-4 rounded-lg shadow-md border cursor-pointer transition-all duration-300 
                ${
                  isSelected
                    ? "bg-blue-500 text-white border-blue-700 scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:shadow-lg hover:scale-105"
                }`}
              onClick={() => handleDoctorSelection(doctor)}
            >
              <div className="flex flex-col items-center">
                <img
                  src={`https://via.placeholder.com/50?text=${doctor.name.split(" ")[1]}`}
                  alt={doctor.name}
                  className="w-14 h-14 rounded-full mb-2 border-2"
                />
                <p className="font-semibold text-center">{doctor.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.profile}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamMemberSelection;

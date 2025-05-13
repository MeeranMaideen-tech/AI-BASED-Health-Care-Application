import React from "react";

const HospitalTopmenu = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-[#07a794]">Hospital Portal</h1>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded-lg focus:outline-none"
        />
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default HospitalTopmenu;
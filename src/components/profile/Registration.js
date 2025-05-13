import React, { useState } from "react";
import NormalUserProfile from "./NormalUserProfile";
import MBBSStudent from "./MBBSStudent";
import PGStudentRegistration from "./PGStudentRegistration";

const Registration = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const renderForm = () => {
    switch (selectedRole) {
      case "normaluser":
        return <NormalUserProfile />;
      case "mbbsstudent":
        return <MBBSStudent />;
      case "pgstudent":
        return <PGStudentRegistration />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Select Your Role</h2>
      <select
        value={selectedRole}
        onChange={handleRoleChange}
        className="mb-6 p-2 rounded border border-gray-300"
      >
        <option value="">-- Choose Role --</option>
        <option value="normaluser">Normal User</option>
        <option value="mbbsstudent">MBBS Student</option>
        <option value="pgstudent">PG Student</option>
        <option value="doctor">Doctor</option>
        <option value="dean">Dean</option>
      </select>

      {renderForm()}
    </div>
  );
};

export default Registration;

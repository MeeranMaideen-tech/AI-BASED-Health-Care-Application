import React, { useState } from "react";

function Notification() {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button 
        className="text-gray-600 text-2xl hover:text-blue-600 transition"
        onClick={toggleNotifications}
      >
        🔔
      </button>

      {/* Notification Popup */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border border-gray-200 rounded-lg p-4">
          <p className="font-semibold text-gray-700">You have 3 new notifications:</p>
          <ul className="mt-2 text-sm text-gray-600 space-y-2">
            <li className="border-b pb-1">✅ New patient added to your team</li>
            <li className="border-b pb-1">📌 Outpatient reported an update</li>
            <li>⚠️ AI detected a new infection</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Notification;

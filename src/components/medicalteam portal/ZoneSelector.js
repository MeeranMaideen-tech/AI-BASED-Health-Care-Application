import React from "react";

const ZONES = ["Zone A", "Zone B", "Zone C", "Zone D"];

function ZoneSelector({ selectedZone, onZoneChange }) {
  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      {ZONES.map((zone) => (
        <div
          key={zone}
          onClick={() => onZoneChange(zone)}
          className={`cursor-pointer rounded-lg p-8 text-center border-2 transition-all ${
            selectedZone === zone
              ? "border-blue-600 bg-blue-100"
              : "border-gray-300 hover:border-blue-400 hover:shadow-lg"
          }`}
        >
          <h3 className="text-xl font-semibold">{zone}</h3>
        </div>
      ))}
    </div>
  );
}

export default ZoneSelector;

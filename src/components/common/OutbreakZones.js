// src/components/common/OutbreakZones.js
import React, { useEffect, useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { zonePolygons, MID_LAT, MID_LNG } from "./zones";

export default function OutbreakZones() {
  const [counts, setCounts] = useState({});

  // ───── fetch aggregated counts by zone ─────
  useEffect(() => {
    fetch("http://localhost:5000/api/user/zone_counts")
      .then((r) => r.json())
      .then(setCounts)
      .catch(console.error);
  }, []);

  // ───── highest count, for normalizing our color ramp ─────
  const maxCount = useMemo(
    () => Math.max(...Object.values(counts), 0),
    [counts]
  );

  // ───── simple green→red ramp ─────
  function getColor(fraction) {
    const hue = (1 - fraction) * 120; // 120=green → 0=red
    return `hsl(${hue}, 70%, 60%)`;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <h2 className="p-4 text-2xl font-bold text-gray-800">
        Outbreak Zones Heatmap
      </h2>

      {/* Map area */}
      <div className="relative flex-1">
        <MapContainer
          center={[MID_LAT, MID_LNG]}
          zoom={12}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Draw each zone */}
          {Object.entries(zonePolygons).map(([zone, coords]) => {
            const count = counts[zone] || 0;
            const fillColor = maxCount
              ? getColor(count / maxCount)
              : "#eee";

            return (
              <Polygon
                key={zone}
                positions={coords}
                pathOptions={{
                  weight: 0,          // no border lines
                  fillColor,
                  fillOpacity: 0.5,   // semi‑transparent
                }}
              >
                <Tooltip
                  permanent
                  direction="center"
                  className="bg-white px-2 py-1 rounded shadow text-xs text-gray-800"
                >
                  <div className="text-center">
                    <div className="font-semibold">{zone}</div>
                    <div>Cases: {count}</div>
                  </div>
                </Tooltip>
              </Polygon>
            );
          })}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-3 rounded shadow-md text-sm space-y-1">
          <div className="font-semibold">Cases</div>
          <div className="flex items-center">
            <span
              className="w-4 h-4 rounded mr-2"
              style={{ background: getColor(0) }}
            />
            0
          </div>
          <div className="flex items-center">
            <span
              className="w-4 h-4 rounded mr-2"
              style={{ background: getColor(0.5) }}
            />
            50%
          </div>
          <div className="flex items-center">
            <span
              className="w-4 h-4 rounded mr-2"
              style={{ background: getColor(1) }}
            />
            100%
          </div>
        </div>
      </div>
    </div>
  );
}

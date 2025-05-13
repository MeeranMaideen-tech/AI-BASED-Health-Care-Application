// Defines city bounds, helper to compute zone from a lat/lng,
// plus the polygon outlines for each zone.

export const CITY_BOUNDS = {
  north: 13.3000,
  south: 13.0000,
  east:  80.3100,
  west:  80.1000,
};

export const MID_LAT = (CITY_BOUNDS.north + CITY_BOUNDS.south) / 2;
export const MID_LNG = (CITY_BOUNDS.east  + CITY_BOUNDS.west)  / 2;

/**
 * Given a latitude/longitude returns one of "Zone A".."Zone D"
 */
export function zoneForLatLng(lat, lng) {
  if      (lat >= MID_LAT && lng >= MID_LNG) return "Zone A";
  else if (lat >= MID_LAT && lng <  MID_LNG) return "Zone B";
  else if (lat <  MID_LAT && lng <  MID_LNG) return "Zone C";
  else if (lat <  MID_LAT && lng >= MID_LNG) return "Zone D";
  return "Outside Chennai";
}

/**
 * The polygon coordinates (arrays of [lat, lng]) for each zone quadrant.
 * Useful for drawing on a Leaflet map.
 */
export const zonePolygons = {
  "Zone A": [
    [MID_LAT,       MID_LNG],
    [MID_LAT,       CITY_BOUNDS.east],
    [CITY_BOUNDS.north, CITY_BOUNDS.east],
    [CITY_BOUNDS.north, MID_LNG],
  ],
  "Zone B": [
    [MID_LAT,       CITY_BOUNDS.west],
    [MID_LAT,       MID_LNG],
    [CITY_BOUNDS.north, MID_LNG],
    [CITY_BOUNDS.north, CITY_BOUNDS.west],
  ],
  "Zone C": [
    [CITY_BOUNDS.south, CITY_BOUNDS.west],
    [CITY_BOUNDS.south, MID_LNG],
    [MID_LAT,       MID_LNG],
    [MID_LAT,       CITY_BOUNDS.west],
  ],
  "Zone D": [
    [CITY_BOUNDS.south, MID_LNG],
    [CITY_BOUNDS.south, CITY_BOUNDS.east],
    [MID_LAT,       CITY_BOUNDS.east],
    [MID_LAT,       MID_LNG],
  ],
};

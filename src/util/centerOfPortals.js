import L from "leaflet";

const centerOfPortals = portals => {
  if (!Array.isArray(portals) || portals.length === 0) {
    throw new Error(
      "Expected portals to be an array with at least one element."
    );
  }

  const lat =
    portals.reduce((acc, portal) => acc + portal.lat, 0) / portals.length;

  const lng =
    portals.reduce((acc, portal) => acc + portal.lng, 0) / portals.length;

  return L.latLng(lat, lng);
};

export default centerOfPortals;

import { Circle } from "react-leaflet";
import L from "leaflet";
import React from "react";

const Portal = ({ portal }) => {
  return (
    <Circle
      center={L.latLng(portal.lat, portal.lng)}
      radius={5}
      color="black"
      weight={1}
      fillColor="lightgreen"
      fillOpacity={1}
    />
  );
};

export default Portal;

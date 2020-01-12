import { connect } from "react-redux";
import L from "leaflet";
import React from "react";
import { Circle, Map, TileLayer } from "react-leaflet";

import centerOfPortals from "../util/centerOfPortals";

const IngressMap = connect(state => ({
  portals: state.ingressMap.portals
}))(({ portals }) => {
  let center;
  try {
    center = centerOfPortals(portals);
  } catch {
    center = L.latLng(51.505, -0.09);
  }

  return (
    <Map center={center} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {portals.map((portal, index) => (
        <Circle
          key={index}
          center={L.latLng(portal.lat, portal.lng)}
          radius={5}
          color="black"
          weight={1}
          fillColor="lightgreen"
          fillOpacity={1}
        />
      ))}
    </Map>
  );
});

export default IngressMap;

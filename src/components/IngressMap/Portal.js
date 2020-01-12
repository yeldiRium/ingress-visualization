import { Circle } from "react-leaflet";
import L from "leaflet";
import React from "react";

import { validateReactProp as validatePortal } from "../../elements/portal";

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

Portal.propTypes = {
  portal: validatePortal
};

export default Portal;

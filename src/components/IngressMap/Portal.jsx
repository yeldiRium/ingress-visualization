import { Circle, Tooltip } from "react-leaflet";
import L from "leaflet";
import PropTypes from "prop-types";
import React from "react";

import { validateReactProp as validatePortal } from "../../elements/portal";

const Portal = ({ portal, highlighted, onClick, annotation }) => {
  const handleClick = event => {
    onClick(portal, event.originalEvent.shiftKey);
  };

  const center = L.latLng(portal.lat, portal.lng);

  return (
    <>
      <Circle
        center={L.latLng(portal.lat, portal.lng)}
        radius={9}
        color="darkgreen"
        weight={2}
        fillColor="lightgreen"
        fillOpacity={0.7}
        onClick={handleClick}
      >
        <Tooltip>{annotation}</Tooltip>
      </Circle>
      {highlighted ? (
        <Circle
          center={center}
          radius={11}
          color="black"
          weight={2}
          fill={false}
        />
      ) : null}
    </>
  );
};

Portal.propTypes = {
  portal: validatePortal,
  onClick: PropTypes.func,
  highlighted: PropTypes.bool,
  annotation: PropTypes.string
};

export default Portal;

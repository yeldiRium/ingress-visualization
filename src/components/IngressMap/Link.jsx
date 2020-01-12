import { connect } from "react-redux";
import L from "leaflet";
import { Polyline, Popup } from "react-leaflet";
import React from "react";

import { validateReactProp as validateLink } from "../../elements/link";
import { selectors as ingressMapSelectors } from "../../store/slices/ingressMap";

const Link = connect(state => ({
  state
}))(({ link, state }) => {
  const startPortal = ingressMapSelectors.findPortal(link.startPortalUid)(
    state
  );
  const targetPortal = ingressMapSelectors.findPortal(link.targetPortalUid)(
    state
  );

  return (
    <Polyline
      positions={[
        L.latLng(startPortal.lat, startPortal.lng),
        L.latLng(targetPortal.lat, targetPortal.lng)
      ]}
      weight={2}
    >
      <Popup>{link.annotation}</Popup>
    </Polyline>
  );
});

Link.propTypes = {
  link: validateLink
};

export default Link;

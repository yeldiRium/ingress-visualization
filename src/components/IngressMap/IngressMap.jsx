import { connect } from "react-redux";
import L from "leaflet";
import React from "react";
import { Map, TileLayer } from "react-leaflet";

import centerOfPortals from "../../util/centerOfPortals";
import Link from "./Link";
import Portal from "./Portal";
import { selectors } from "../../store/slices/ingressMap";

const IngressMap = connect(state => ({
  portals: selectors.selectPortals()(state),
  links: selectors.selectLinks()(state)
}))(({ portals, links }) => {
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
      {portals.map(portal => (
        <Portal key={portal.uid} portal={portal} />
      ))}
      {links.map(link => (
        <Link
          key={`${link.startPortalUid}-${link.targetPortalUid}`}
          link={link}
        />
      ))}
    </Map>
  );
});

export default IngressMap;

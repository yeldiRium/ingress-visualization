import { connect } from "react-redux";
import L from "leaflet";
import React from "react";
import { Map, TileLayer } from "react-leaflet";

import centerOfPortals from "../../util/centerOfPortals";
import { selectors as editorSelectors } from "../../store/slices/editor";
import { selectors as ingressMapSelectors } from "../../store/slices/ingressMap";
import Link from "./Link";
import Portal from "./Portal";

const IngressMap = connect(state => ({
  portals: ingressMapSelectors.selectPortals()(state),
  links: ingressMapSelectors.selectLinks()(state),
  selectedUids: editorSelectors.selectedUids()(state)
}))(({ portals, links, selectedUids, onPortalClick }) => {
  let center;
  try {
    center = centerOfPortals(portals);
  } catch {
    center = L.latLng(51.505, -0.09);
  }

  return (
    <Map
      center={center}
      zoom={16}
      boxZoom={false}
      onMouseDown={console.log}
      onMouseUp={console.log}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {portals.map(portal => {
        const highlighted = selectedUids.includes(portal.uid);
        const annotation = `${
          highlighted ? `${selectedUids.indexOf(portal.uid)} - ` : ""
        }${portal.title}`;

        return (
          <Portal
            key={portal.uid}
            portal={portal}
            onClick={onPortalClick}
            highlighted={highlighted}
            annotation={annotation}
          />
        );
      })}
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

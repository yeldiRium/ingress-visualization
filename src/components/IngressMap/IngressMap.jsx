import { connect } from "react-redux";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { Map, Rectangle, TileLayer } from "react-leaflet";

import centerOfPortals from "../../util/centerOfPortals";
import {
  actions as editorActions,
  selectors as editorSelectors
} from "../../store/slices/editor";
import { selectors as ingressMapSelectors } from "../../store/slices/ingressMap";
import Link from "./Link";
import Portal from "./Portal";

const IngressMap = connect(
  state => ({
    activeAction: editorSelectors.activeAction()(state),
    portals: ingressMapSelectors.selectPortals()(state),
    links: ingressMapSelectors.selectLinks()(state),
    selectedUids: editorSelectors.selectedUids()(state)
  }),
  {
    setSelection: editorActions.setSelection,
    clearAction: editorActions.clearAction
  }
)(
  ({
    activeAction,
    portals,
    links,
    selectedUids,
    onPortalClick,
    setSelection,
    clearAction
  }) => {
    let center;
    try {
      center = centerOfPortals(portals);
    } catch {
      center = L.latLng(51.505, -0.09);
    }
    const allowDragging = activeAction !== "select";

    const [selecting, setSelecting] = useState(false);
    const [selectionRect, setSelectionRect] = useState(null);

    useEffect(() => {
      if (activeAction !== "select") {
        setSelectionRect(null);
      }
    });

    const handleMouseDown = event => {
      if (activeAction !== "select") {
        return;
      }
      setSelecting(true);
      setSelectionRect({
        start: event.latlng,
        end: event.latlng
      });
    };

    const handleMouseMove = event => {
      if (
        activeAction !== "select" ||
        selectionRect === null ||
        selecting === false
      ) {
        return;
      }

      setSelectionRect({
        start: selectionRect.start,
        end: event.latlng
      });
    };

    const handleMouseUp = event => {
      if (
        activeAction !== "select" ||
        selectionRect === null ||
        selecting === false
      ) {
        return;
      }

      setSelectionRect({
        start: selectionRect.start,
        end: event.latlng
      });

      const minLat = Math.min(selectionRect.start.lat, selectionRect.end.lat);
      const maxLat = Math.max(selectionRect.start.lat, selectionRect.end.lat);
      const minLng = Math.min(selectionRect.start.lng, selectionRect.end.lng);
      const maxLng = Math.max(selectionRect.start.lng, selectionRect.end.lng);

      const selectedPortals = portals
        .filter(
          portal =>
            portal.lat > minLat &&
            portal.lat < maxLat &&
            portal.lng > minLng &&
            portal.lng < maxLng
        )
        .map(portal => portal.uid);

      setSelection(selectedPortals);
      clearAction();
      setSelecting(false);
      setSelectionRect(null);
    };

    return (
      <Map
        center={center}
        zoom={16}
        boxZoom={false}
        dragging={allowDragging}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
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
        {activeAction === "select" && selectionRect !== null ? (
          <Rectangle
            bounds={L.latLngBounds(selectionRect.start, selectionRect.end)}
          />
        ) : null}
      </Map>
    );
  }
);

export default IngressMap;

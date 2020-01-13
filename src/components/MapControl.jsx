import { connect } from "react-redux";
import React from "react";

import createLink from "../elements/link";
import {
  actions as editorActions,
  selectors as editorSelectors
} from "../store/slices/editor";
import { actions as ingressMapActions } from "../store/slices/ingressMap";
import IngressMap from "./IngressMap/IngressMap";
import EditorActions from "./EditorActions";

const MapControl = connect(
  state => ({
    activeAction: editorSelectors.activeAction()(state),
    selectedUids: editorSelectors.selectedUids()(state)
  }),
  {
    selectPortal: editorActions.selectPortal,
    addPortalToSelection: editorActions.addPortalToSelection,
    removePortalFromSelection: editorActions.removePortalFromSelection,
    clearSelection: editorActions.clearSelection,
    clearAction: editorActions.clearAction,
    addLinkIfPossible: ingressMapActions.addLinkIfPossible
  }
)(
  ({
    activeAction,
    selectedUids,
    selectPortal,
    addPortalToSelection,
    removePortalFromSelection,
    clearSelection,
    clearAction,
    addLinkIfPossible
  }) => {
    const onPortalClick = (portal, shiftKey) => {
      switch (activeAction) {
        case "link": {
          if (selectedUids.length === 0) {
            addPortalToSelection(portal.uid);
            return;
          }

          try {
            addLinkIfPossible(createLink(selectedUids[0], portal.uid));
            clearSelection();
            clearAction();
          } catch {
            alert("Could not link portals. Maybe something is in the way?");
          }

          return;
        }
        default: {
          if (!shiftKey) {
            selectPortal(portal.uid);
            return;
          }
          if (selectedUids.includes(portal.uid)) {
            removePortalFromSelection(portal.uid);
            return;
          }
          addPortalToSelection(portal.uid);
          return;
        }
      }
    };

    return (
      <div className="map-control">
        <EditorActions />
        <IngressMap onPortalClick={onPortalClick} />
      </div>
    );
  }
);

export default MapControl;

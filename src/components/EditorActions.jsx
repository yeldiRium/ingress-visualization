import { connect } from "react-redux";
import React from "react";

import createLink from "../elements/link";
import {
  actions as editorActions,
  selectors as editorSelectors
} from "../store/slices/editor";
import fanFieldThunk from "../algorithms/fanField";
import { actions as ingressMapActions } from "../store/slices/ingressMap";

const EditorActions = connect(
  state => ({
    activeAction: editorSelectors.activeAction()(state),
    selectedUids: editorSelectors.selectedUids()(state)
  }),
  {
    addLinkIfPossible: ingressMapActions.addLinkIfPossible,
    clearSelection: editorActions.clearSelection,
    startLinkAction: editorActions.startLinkAction,
    fanField: fanFieldThunk
  }
)(
  ({
    activeAction,
    selectedUids,
    addLinkIfPossible,
    clearSelection,
    startLinkAction,
    fanField
  }) => {
    const handleLink = () => {
      if (selectedUids.length > 2) {
        alert("Cannot link more than two portals. Please select fewer.");

        return;
      }

      if (selectedUids.length === 2) {
        try {
          addLinkIfPossible(createLink(selectedUids[0], selectedUids[1]));
          clearSelection();
        } catch {
          alert("Could not link portals. Maybe something is in the way?");
        }

        return;
      }

      startLinkAction();
    };

    const handleFanField = async () => {
      if (selectedUids.length < 3) {
        alert("Cannot fan-field fewer than three portals. Please select more.");

        return;
      }

      try {
        await fanField(selectedUids[0], selectedUids[1], selectedUids.slice(2));
      } catch {
        alert("That went wrong. Maybe there were links in the way?");
      }
    };

    return (
      <div className="editor-actions">
        <button
          className="editor-actions__link"
          onClick={handleLink}
          disabled={activeAction === "link"}
        >
          Link
        </button>
        <button className="editor-actions__fan-field" onClick={handleFanField}>
          Fan Field
        </button>
      </div>
    );
  }
);

export default EditorActions;

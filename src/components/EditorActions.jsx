import { connect } from "react-redux";
import React from "react";

import createLink from "../elements/link";
import {
  actions as editorActions,
  selectors as editorSelectors
} from "../store/slices/editor";
import { actions as ingressMapActions } from "../store/slices/ingressMap";

const EditorActions = connect(
  state => ({
    activeAction: editorSelectors.activeAction()(state),
    selectedUids: editorSelectors.selectedUids()(state)
  }),
  {
    addLinkIfPossible: ingressMapActions.addLinkIfPossible,
    clearSelection: editorActions.clearSelection,
    startLinkAction: editorActions.startLinkAction
  }
)(
  ({
    activeAction,
    selectedUids,
    addLinkIfPossible,
    clearSelection,
    startLinkAction
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

    return (
      <div className="editor-actions">
        <button
          className="editor-actions__link"
          onClick={handleLink}
          disabled={activeAction === "link"}
        >
          Link
        </button>
      </div>
    );
  }
);

export default EditorActions;

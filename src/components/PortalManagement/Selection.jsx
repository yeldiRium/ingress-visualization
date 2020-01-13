import { connect } from "react-redux";
import React from "react";

import {
  actions as editorActions,
  selectors as editorSelectors
} from "../../store/slices/editor";
import { actions as ingressMapActions } from "../../store/slices/ingressMap";
import PortalDetails from "./PortalDetails";

const Selection = connect(
  state => ({ selectedPortals: editorSelectors.selectedPortals()(state) }),
  {
    removePortals: ingressMapActions.removePortals,
    clearSelection: editorActions.clearSelection
  }
)(({ selectedPortals, removePortals, clearSelection }) => {
  if (selectedPortals.length === 0) {
    return <div className="selection">No portal selected.</div>;
  }

  const handleDeleteSelected = () => {
    const selectedUids = selectedPortals.map(portal => portal.uid);
    clearSelection();
    removePortals(selectedUids);
  };

  const handleClearSelection = () => {
    clearSelection();
  };

  const Buttons = () => (
    <div className="selection__buttons">
      <button
        className="selection__delete-selected"
        onClick={handleDeleteSelected}
      >
        Delete selected
      </button>
      <button
        className="selection__clear-selection"
        onClick={handleClearSelection}
      >
        Clear selection
      </button>
    </div>
  );

  if (selectedPortals.length === 1) {
    return (
      <div className="selection">
        <PortalDetails portal={selectedPortals[0]} />
        <Buttons />
      </div>
    );
  }

  return (
    <div className="selection">
      <table>
        <thead>
          <tr>
            <th>Uid</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {selectedPortals.map(portal => (
            <tr key={portal.uid}>
              <td>{portal.uid}</td>
              <td>{portal.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Buttons />
    </div>
  );
});

export default Selection;

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
    clearSelection: editorActions.clearSelection,
    movePortal: editorActions.movePortalInSelection
  }
)(({ selectedPortals, removePortals, clearSelection, movePortal }) => {
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

  const handleMoveToFirst = index => {
    console.log("first");
    movePortal({ from: index, to: 0 });
  };

  const handleMoveUp = index => {
    console.log("up");
    movePortal({ from: index, to: index - 1 });
  };

  const handleMoveDown = index => {
    console.log("down");
    movePortal({ from: index, to: index + 1 });
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedPortals.map((portal, index) => (
            <tr key={portal.uid}>
              <td>{portal.uid.slice(0, 5)}</td>
              <td>{portal.title}</td>
              <td className="selection__row-buttons">
                {index !== 0 ? (
                  <>
                    <button
                      className="selection__row-button selection__row-button-first"
                      onClick={() => handleMoveToFirst(index)}
                    >
                      <i className="fas fa-arrow-up"></i>
                    </button>
                    <button
                      className="selection__row-button selection__row-button-up"
                      onClick={() => handleMoveUp(index)}
                    >
                      <i className="fas fa-chevron-up"></i>
                    </button>
                  </>
                ) : null}
                {index !== selectedPortals.length - 1 ? (
                  <button
                    className="selection__row-button selection__row-button-down"
                    onClick={() => handleMoveDown(index)}
                  >
                    <i className="fas fa-chevron-down"></i>
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Buttons />
    </div>
  );
});

export default Selection;

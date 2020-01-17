import { connect } from "react-redux";
import React, { useState } from "react";

import { parse as parsePortal } from "../../elements/portal";
import { actions as editorActions } from "../../store/slices/editor";
import { actions as ingressMapActions } from "../../store/slices/ingressMap";

const AddAndClearPortals = connect(null, {
  addPortal: ingressMapActions.addPortal,
  addPortals: ingressMapActions.addPortals,
  clearPortals: ingressMapActions.clear,
  clearSelection: editorActions.clearSelection
})(({ addPortal, addPortals, clearPortals, clearSelection }) => {
  const [textareaValue, setTextareaValue] = useState("");
  const [error, setError] = useState(undefined);

  const loadPortals = () => {
    setError(undefined);

    try {
      const data = JSON.parse(textareaValue);

      if (!Array.isArray(data)) {
        const portal = parsePortal(data);

        addPortal(portal);
        setTextareaValue("");

        return;
      }

      const portals = [];
      for (const portal of data) {
        portals.push(parsePortal(portal));
      }

      addPortals(portals);
      setTextareaValue("");
    } catch (ex) {
      setError(ex.message);
    }
  };

  return (
    <div className="add-and-clear-portals">
      <textarea
        value={textareaValue}
        onChange={e => setTextareaValue(e.currentTarget.value)}
      ></textarea>
      <button
        className="add-and-clear-portals__load-button"
        onClick={loadPortals}
      >
        Load portals
      </button>
      <button
        className="add-and-clear-portals__clear-button"
        onClick={() => {
          clearPortals();
          clearSelection();
        }}
      >
        Clear portals
      </button>
      {error ? <p className="add-and-clear-links__error">{error}</p> : <></>}
    </div>
  );
});

export default AddAndClearPortals;

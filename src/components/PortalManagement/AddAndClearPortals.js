import { connect } from "react-redux";
import React, { useState } from "react";

import validatePortal from "../../validation/validatePortal";
import { actions as ingressMapActions } from "../../store/slices/ingressMap";

const AddAndClearPortals = connect(null, {
  addPortal: ingressMapActions.addPortal,
  addPortals: ingressMapActions.addPortals,
  clearPortals: ingressMapActions.clearPortals
})(({ addPortal, addPortals, clearPortals }) => {
  const [textareaValue, setTextareaValue] = useState("");
  const [loaderError, setLoaderError] = useState(undefined);

  const loadPortals = () => {
    setLoaderError(undefined);

    try {
      const data = JSON.parse(textareaValue);

      if (!Array.isArray(data)) {
        validatePortal(data);

        addPortal(data);
        setTextareaValue("");

        return;
      }

      for (const portal of data) {
        validatePortal(portal);
      }

      addPortals(data);
      setTextareaValue("");
    } catch (ex) {
      setLoaderError(ex.message);
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
        onClick={() => clearPortals()}
      >
        Clear portals
      </button>
      {loaderError ? <div>{loaderError}</div> : <></>}
    </div>
  );
});

export default AddAndClearPortals;

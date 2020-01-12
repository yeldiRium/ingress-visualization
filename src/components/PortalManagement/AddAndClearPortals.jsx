import { connect } from "react-redux";
import React, { useState } from "react";

import { parse as parsePortal } from "../../elements/portal";
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
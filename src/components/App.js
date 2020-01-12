import { connect } from "react-redux";
import React, { useState } from "react";

import IngressMap from "./IngressMap";
import validatePortal from "../validation/validatePortal";
import { actions as ingressMapActions } from "../store/slices/ingressMap";

const App = connect(null, {
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
    <div id="app">
      <div className="input-pane">
        <textarea
          value={textareaValue}
          onChange={e => setTextareaValue(e.currentTarget.value)}
        ></textarea>
        <button onClick={loadPortals}>Load portals</button>
        <button onClick={() => clearPortals()}>Clear portals</button>
        {loaderError ? <div>{loaderError}</div> : <></>}
      </div>
      <div className="map-pane">
        <IngressMap />
      </div>
    </div>
  );
});

export default App;

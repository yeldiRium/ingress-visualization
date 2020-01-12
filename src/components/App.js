import React from "react";

import AddAndClearPortals from "./PortalManagement/AddAndClearPortals";
import IngressMap from "./IngressMap";

const App = () => (
  <div id="app">
    <div className="input-pane">
      <AddAndClearPortals />
    </div>
    <div className="map-pane">
      <IngressMap />
    </div>
  </div>
);

export default App;

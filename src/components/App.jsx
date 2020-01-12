import React from "react";

import AddAndClearPortals from "./PortalManagement/AddAndClearPortals";
import AddAndClearLinks from "./PortalManagement/AddAndClearLinks";
import IngressMap from "./IngressMap/IngressMap";

const App = () => (
  <div id="app">
    <div className="input-pane">
      <AddAndClearPortals />
      <AddAndClearLinks />
    </div>
    <div className="map-pane">
      <IngressMap />
    </div>
  </div>
);

export default App;

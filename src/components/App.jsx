import React from "react";

import AddAndClearPortals from "./PortalManagement/AddAndClearPortals";
import AddAndClearLinks from "./PortalManagement/AddAndClearLinks";
import MapControl from "./MapControl";
import Selection from "./PortalManagement/Selection";

const App = () => (
  <div id="app">
    <div className="input-pane">
      <AddAndClearPortals />
      <AddAndClearLinks />
      <Selection />
    </div>
    <div className="map-pane">
      <MapControl />
    </div>
  </div>
);

export default App;

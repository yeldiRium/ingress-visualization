import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "@fortawesome/fontawesome-free/js/all";
import "leaflet/dist/leaflet.css";
import "./scss/index.scss";

import App from "./components/App";
import createStore from "./store/create";

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

import { configureStore } from "@reduxjs/toolkit";
// import persistState from "redux-localstorage";

import reducer from "./slices";

const createStore = () => {
  // const localstorageEnhancer = persistState([]);

  const store = configureStore({
    reducer,
    enhancers: [
      // localstorageEnhancer
    ]
  });

  return store;
};

export default createStore;

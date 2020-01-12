import { createSlice } from "@reduxjs/toolkit";

const ingressMap = createSlice({
  name: "ingressMap",
  initialState: {
    portals: [],
    links: [],
    fields: []
  },
  reducers: {
    addPortal: (state, action) => {
      const portal = action.payload;

      return {
        portals: [...state.portals, portal],
        links: state.links,
        fields: state.fields
      };
    },
    addPortals: (state, action) => {
      const portals = action.payload;

      return {
        portals: [...state.portals, ...portals],
        links: state.links,
        fields: state.fields
      };
    },
    clearPortals: state => {
      return {
        portals: [],
        links: state.links,
        fields: state.fields
      };
    }
  }
});

export const actions = {
  ...ingressMap.actions
};

export default ingressMap.reducer;

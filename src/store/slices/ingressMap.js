import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

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

const selectIngressMap = () => state => state.ingressMap;

const selectPortals = () =>
  createSelector([selectIngressMap()], ingressMap => ingressMap.portals);

const findPortal = uid =>
  createSelector([selectPortals()], portals =>
    portals.find(portal => portal.uid === uid)
  );

export const selectors = {
  selectIngressMap,
  selectPortals,
  findPortal
};

export const actions = {
  ...ingressMap.actions
};

export default ingressMap.reducer;

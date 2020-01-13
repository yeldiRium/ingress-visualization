import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import doLinksCross from "../../util/doLinksCross";
import { validate as validateLink } from "../../elements/link";
import { validate as validatePortal } from "../../elements/portal";

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

      validatePortal(portal);

      return {
        portals: [...state.portals, portal],
        links: state.links,
        fields: state.fields
      };
    },
    addPortals: (state, action) => {
      const portals = action.payload;

      for (const portal of portals) {
        validatePortal(portal);
      }

      return {
        portals: [...state.portals, ...portals],
        links: state.links,
        fields: state.fields
      };
    },
    removePortal: (state, action) => {
      const portalUid = action.payload;

      return {
        portals: state.portals.filter(portal => portal.uid !== portalUid),
        links: state.links.filter(
          link =>
            link.startPortalUid !== portalUid &&
            link.targetPortalUid !== portalUid
        ),
        fields: state.fields // TODO: this should affect the fields.
      };
    },
    removePortals: (state, action) => {
      const portalUids = action.payload;

      return {
        portals: state.portals.filter(
          portal => !portalUids.some(uid => portal.uid === uid)
        ),
        links: state.links.filter(
          link =>
            !portalUids.some(
              uid => link.startPortalUid === uid || link.targetPortalUid === uid
            )
        ),
        fields: state.fields // TODO: this should affect the fields.
      };
    },
    addLink: (state, action) => {
      const link = action.payload;

      validateLink(link);

      return {
        portals: state.portals,
        links: [...state.links, link]
      };
    },
    clear: () => {
      return {
        portals: [],
        links: [],
        fields: []
      };
    },
    clearLinks: state => {
      return {
        portals: state.portals,
        links: [],
        fields: state.fields // TODO: these should actually change
      };
    }
  }
});

/* SELECTORS */

const selectIngressMap = () => state => state.ingressMap;

const selectPortals = () =>
  createSelector([selectIngressMap()], ingressMap => ingressMap.portals);

const findPortal = uid =>
  createSelector([selectPortals()], portals =>
    portals.find(portal => portal.uid === uid)
  );

const selectLinks = () =>
  createSelector([selectIngressMap()], ingressMap => ingressMap.links);

const isLinkPossible = newLink =>
  createSelector([state => state, selectLinks()], (state, existingLinks) => {
    const newLinkStart = findPortal(newLink.startPortalUid)(state);
    const newLinkTarget = findPortal(newLink.targetPortalUid)(state);

    for (const existingLink of existingLinks) {
      const existingLinkStart = findPortal(existingLink.startPortalUid)(state);
      const existingLinkTarget = findPortal(existingLink.targetPortalUid)(
        state
      );
      if (
        doLinksCross(
          newLinkStart,
          newLinkTarget,
          existingLinkStart,
          existingLinkTarget
        )
      ) {
        return false;
      }
    }

    return true;
  });

export const selectors = {
  selectIngressMap,
  selectPortals,
  findPortal,
  selectLinks,
  isLinkPossible
};

/* THUNKS */

const addLinkIfPossible = link => (dispatch, getState) => {
  validateLink(link);

  const startPortal = findPortal(link.startPortalUid)(getState());
  const targetPortal = findPortal(link.targetPortalUid)(getState());

  if (startPortal === undefined) {
    throw new Error(
      "The start portal could not be found. Please double check the id."
    );
  }
  if (targetPortal === undefined) {
    throw new Error(
      "The target portal could not be found. Please double check the id."
    );
  }

  if (!isLinkPossible(link)(getState())) {
    throw new Error(
      "Cannot link these portals. There is something in the way."
    );
  }

  dispatch(ingressMap.actions.addLink(link));
};

export const actions = {
  ...ingressMap.actions,
  addLinkIfPossible
};

export default ingressMap.reducer;

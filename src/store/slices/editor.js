import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { selectors as ingressMapSelectors } from "./ingressMap";

const editor = createSlice({
  name: "editor",
  initialState: {
    activeAction: null,
    selection: []
  },
  reducers: {
    startLinkAction: state => {
      return {
        activeAction: "link",
        selection: state.selection
      };
    },
    clearAction: state => {
      return {
        activeAction: null,
        selection: state.selection
      };
    },
    selectPortal: (state, action) => {
      const portalUid = action.payload;

      return {
        activeAction: state.activeAction,
        selection: [portalUid]
      };
    },
    addPortalToSelection: (state, action) => {
      const portalUid = action.payload;

      if (state.selection.includes(portalUid)) {
        return state;
      }

      return {
        activeAction: state.activeAction,
        selection: [...state.selection, portalUid]
      };
    },
    removePortalFromSelection: (state, action) => {
      const portalUid = action.payload;

      if (!state.selection.includes(portalUid)) {
        return;
      }

      return {
        activeAction: state.activeAction,
        selection: state.selection.filter(uid => uid !== portalUid)
      };
    },
    movePortalInSelection: (state, action) => {
      const { from, to } = action.payload;

      const portal = state.selection[from];

      state.selection.splice(from, 1);
      state.selection.splice(to, 0, portal);
    },
    clearSelection: state => {
      return {
        activeAction: state.activeAction,
        selection: []
      };
    }
  }
});

/* SELECTORS */

const selectEditor = () => state => state.editor;

const activeAction = () =>
  createSelector([selectEditor()], editor => editor.activeAction);

const selectedUids = () =>
  createSelector([selectEditor()], editor => editor.selection);

const selectedPortals = () =>
  createSelector([state => state, selectedUids()], (state, selectedUids) =>
    selectedUids.map(portalUid =>
      ingressMapSelectors.findPortal(portalUid)(state)
    )
  );

export const selectors = {
  selectEditor,
  activeAction,
  selectedUids,
  selectedPortals
};

export const actions = {
  ...editor.actions
};

export default editor.reducer;

import { configureStore } from "@reduxjs/toolkit";
import uuid from "uuid/v4";

import { actions, selectors } from "./editor";
import reducer from "./index";

describe("editor slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer
    });
  });

  describe("editor", () => {
    describe("selection", () => {
      it("can select a portal", () => {
        const portalUid = uuid();

        store.dispatch(actions.selectPortal(portalUid));

        const selection = selectors.selectedUids()(store.getState());

        expect(selection).toEqual([portalUid]);
      });

      it("replaces the selection with a new portal", () => {
        const portal0Uid = uuid();
        const portal1Uid = uuid();

        store.dispatch(actions.selectPortal(portal0Uid));
        store.dispatch(actions.selectPortal(portal1Uid));

        const selection = selectors.selectedUids()(store.getState());

        expect(selection).toEqual([portal1Uid]);
      });

      it("can add portals to the selection", () => {
        const portal0Uid = uuid();
        const portal1Uid = uuid();

        store.dispatch(actions.selectPortal(portal0Uid));
        store.dispatch(actions.addPortalToSelection(portal1Uid));

        const selection = selectors.selectedUids()(store.getState());

        expect(selection).toEqual([portal0Uid, portal1Uid]);
      });

      it("can clear the selection", () => {
        const portal0Uid = uuid();
        const portal1Uid = uuid();

        store.dispatch(actions.selectPortal(portal0Uid));
        store.dispatch(actions.addPortalToSelection(portal1Uid));
        store.dispatch(actions.clearSelection());

        const selection = selectors.selectedUids()(store.getState());

        expect(selection).toEqual([]);
      });

      it("can move portals in the selection", () => {
        const portal0Uid = uuid();
        const portal1Uid = uuid();
        const portal2Uid = uuid();
        const portal3Uid = uuid();

        store.dispatch(actions.addPortalToSelection(portal0Uid));
        store.dispatch(actions.addPortalToSelection(portal1Uid));
        store.dispatch(actions.addPortalToSelection(portal2Uid));
        store.dispatch(actions.addPortalToSelection(portal3Uid));

        store.dispatch(actions.movePortalInSelection({ from: 3, to: 0 }));

        const selection = selectors.selectedUids()(store.getState());

        expect(selection).toEqual([
          portal3Uid,
          portal0Uid,
          portal1Uid,
          portal2Uid
        ]);
      });

      it("can move portals in the selection 2", () => {
        const portal0Uid = uuid();
        const portal1Uid = uuid();
        const portal2Uid = uuid();
        const portal3Uid = uuid();

        store.dispatch(actions.addPortalToSelection(portal0Uid));
        store.dispatch(actions.addPortalToSelection(portal1Uid));
        store.dispatch(actions.addPortalToSelection(portal2Uid));
        store.dispatch(actions.addPortalToSelection(portal3Uid));

        store.dispatch(actions.movePortalInSelection({ from: 0, to: 2 }));

        const selection = selectors.selectedUids()(store.getState());

        expect(selection).toEqual([
          portal1Uid,
          portal2Uid,
          portal0Uid,
          portal3Uid
        ]);
      });
    });
  });
});

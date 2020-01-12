import { configureStore } from "@reduxjs/toolkit";
import uuid from "uuid/v4";

import createPortal from "../../elements/portal";
import { actions, selectors } from "./ingressMap";
import reducer from "./index";

describe("ingressMap slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer
    });
  });

  it("stores portal given", () => {
    const portal = createPortal(uuid(), "some name", 50, 8);

    store.dispatch(actions.addPortal(portal));

    const portals = selectors.selectPortals()(store.getState());

    expect(portals).toEqual([portal]);
  });

  it("stores multiple portals given", () => {
    const portalOne = createPortal(uuid(), "some name", 50, 8);
    const portalTwo = createPortal(uuid(), "some name", 50, 8);
    const portalThree = createPortal(uuid(), "some name", 50, 8);

    store.dispatch(actions.addPortal(portalOne));
    store.dispatch(actions.addPortal(portalTwo));
    store.dispatch(actions.addPortal(portalThree));

    const portals = selectors.selectPortals()(store.getState());

    expect(portals).toEqual([portalOne, portalTwo, portalThree]);
  });

  it("can find a portal by uid", () => {
    const portalOne = createPortal(uuid(), "some name", 50, 8);
    const portalTwo = createPortal(uuid(), "some name", 50, 8);
    const portalThree = createPortal(uuid(), "some name", 50, 8);

    store.dispatch(actions.addPortal(portalOne));
    store.dispatch(actions.addPortal(portalTwo));
    store.dispatch(actions.addPortal(portalThree));

    const foundPortal = selectors.findPortal(portalTwo.uid)(store.getState());

    expect(foundPortal).toBe(portalTwo);
  });
});

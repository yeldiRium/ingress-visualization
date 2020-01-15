import L from "leaflet";

import createLink from "../elements/link";
import orderPortalsCircular from "../util/orderPortalsCircular";
import Segment from "../math/Segment";
import Vector from "../math/Vector";
import {
  actions as ingressMapActions,
  selectors as ingressMapSelectors
} from "../store/slices/ingressMap";

const sleep = milliseconds =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

/**
 * This is a thunk. Dispatch it to the redux store.
 *
 * This algo builds a fanField over all given portals around the given anchor.
 */
const fanField = (
  anchorPortalUid,
  startPortalUid,
  restPortalUids,
  clockwise = true
) => async (dispatch, getState) => {
  const portals = [startPortalUid, ...restPortalUids].map(portalUid =>
    ingressMapSelectors.findPortal(portalUid)(getState())
  );
  const anchorPortal = ingressMapSelectors.findPortal(anchorPortalUid)(
    getState()
  );
  const anchorVector = new Vector(anchorPortal.lng, anchorPortal.lat);

  const circularOrderedIndexes = orderPortalsCircular(
    portals.map(portal => L.latLng(portal.lat, portal.lng)),
    L.latLng(anchorPortal.lat, anchorPortal.lng),
    clockwise
  );

  const orderedPortals = circularOrderedIndexes.map(index => portals[index]);

  console.log({ orderedPortals });

  let visitIndex = 0;
  for (const portal of orderedPortals) {
    dispatch(
      ingressMapActions.addLinkIfPossible(
        createLink(portal.uid, anchorPortalUid)
      )
    );
    console.log("link to anchor", { portal });
    await sleep(500);

    const portalVector = new Vector(portal.lng, portal.lat);
    for (const previousPortal of orderedPortals.slice(0, visitIndex)) {
      const link = createLink(portal.uid, previousPortal.uid);

      const previousPortalVector = new Vector(
        previousPortal.lng,
        previousPortal.lat
      );
      const newLinkSegment = new Segment(portalVector, previousPortalVector);

      const inRightDirection = clockwise
        ? anchorVector.leftFromSegment(newLinkSegment)
        : anchorVector.rightFromSegment(newLinkSegment);

      if (
        inRightDirection &&
        ingressMapSelectors.isLinkPossible(link)(getState())
      ) {
        dispatch(ingressMapActions.addLinkIfPossible(link));
        console.log("link to previous", { previousPortal });
        await sleep(500);
      } else {
        console.log("skip link to previous", {
          previousPortal,
          inRightDirection
        });
      }
    }

    visitIndex++;
  }
};

export default fanField;

import { cross } from "geometric/src/utils/crossProduct";
import L from "leaflet";

import createLink from "../elements/link";
import orderCircular from "../util/orderCircular";
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

  const circularOrderedIndexes = orderCircular(
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

    for (const previousPortal of orderedPortals.slice(0, visitIndex)) {
      const link = createLink(portal.uid, previousPortal.uid);

      const directionComparisonFunction = clockwise
        ? (point, line) => cross(point, line[0], line[1]) > 0
        : (point, line) => cross(point, line[0], line[1]) < 0;

      const inRightDirection = directionComparisonFunction(
        [anchorPortal.lng, anchorPortal.lat],
        [
          [portal.lng, portal.lat],
          [previousPortal.lng, previousPortal.lat]
        ]
      );

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

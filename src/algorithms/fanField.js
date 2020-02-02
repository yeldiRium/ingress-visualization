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

  let orders = {};
  let fieldCount = 0;

  orders[anchorPortal.uid] = {
    index: -1,
    title: anchorPortal.title,
    links: [],
    keys: 0
  };

  let visitIndex = 0;
  for (const portal of orderedPortals) {
    orders[portal.uid] = {
      index: visitIndex,
      title: portal.title,
      links: [anchorPortal.title],
      keys: 0
    };
    orders[anchorPortal.uid].keys++;

    dispatch(
      ingressMapActions.addLinkIfPossible(
        createLink(portal.uid, anchorPortalUid)
      )
    );
    await sleep(10);

    const portalVector = new Vector(portal.lng, portal.lat);
    let firstLink = true;
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
        orders[portal.uid].links.push(previousPortal.title);
        orders[previousPortal.uid].keys++;

        dispatch(ingressMapActions.addLinkIfPossible(link));
        if (firstLink) {
          firstLink = false;
          fieldCount += 1;
        } else {
          fieldCount += 2;
        }
        await sleep(10);
      }
    }

    visitIndex++;
  }
  console.log(
    Object.values(orders)
      .sort((left, right) => left.index - right.index)
      .map(
        portal =>
          `[${String(portal.index).padStart(2, "0")}] Go to '${
            portal.title
          }'.\n     Collect ${portal.keys} key${portal.keys === 1 ? "" : "s"}.${
            portal.links.length > 0
              ? `\n     Link to ${portal.links
                  .map(portalTitle => `'${portalTitle}'`)
                  .join(", ")}.`
              : ""
          }`
      )
      .join("\n\n")
  );
  console.log(`Created ${fieldCount} fields.`);
};

export default fanField;

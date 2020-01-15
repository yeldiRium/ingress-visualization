import rotateArray from "./rotateArray";
import Segment from "../math/Segment";
import Vector from "../math/Vector";

// Orders points in a circle. Assumes the points are on a 2d plane.
// DO NOT use this for large areas with geo coordinates, since it
// will break due to the earth NOT being flat.
const orderPortalsCircular = (portals, centerPortal, clockwise = true) => {
  if (!Array.isArray(portals) || portals.length === 0) {
    throw new Error(
      "Expected latLngs to be an array with at least one element."
    );
  }

  const withIndex = portals.map((portal, index) => ({
    index,
    portal
  }));

  const withDegrees = withIndex.map(({ index, portal }) => {
    const segment = new Segment(
      new Vector(centerPortal.lng, centerPortal.lat),
      new Vector(portal.lng, portal.lat)
    );

    const degrees = segment.angleToHorizontalDeg();

    return {
      index,
      portal,
      degrees
    };
  });

  const sorted = withDegrees.sort((left, right) =>
    clockwise ? left.degrees - right.degrees : right.degrees - left.degrees
  );

  while (sorted[0].index !== 0) {
    rotateArray(sorted);
  }

  return sorted.map(element => element.index);
};

export default orderPortalsCircular;

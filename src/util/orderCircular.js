import { lineAngle } from "geometric";

import rotateArray from "../util/rotateArray";

// Orders points in a circle. Assumes the points are on a 2d plane.
// DO NOT use this for large areas with geo coordinates, since it
// will break due to the earth NOT being flat.
const orderCircular = (latLngs, centerLatLng, clockwise = true) => {
  if (!Array.isArray(latLngs) || latLngs.length === 0) {
    throw new Error(
      "Expected latLngs to be an array with at least one element."
    );
  }

  const withIndex = latLngs.map((latLng, index) => ({
    index,
    latLng
  }));

  const withDegrees = withIndex.map(({ index, latLng }) => {
    const degrees = lineAngle([
      [centerLatLng.lng, centerLatLng.lat],
      [latLng.lng, latLng.lat]
    ]);

    return {
      index,
      latLng,
      degrees
    };
  });

  const sorted = withDegrees.sort((left, right) =>
    clockwise ? right.degrees - left.degrees : left.degrees - right.degrees
  );

  while (sorted[0].index !== 0) {
    rotateArray(sorted);
  }

  return sorted.map(element => element.index);
};

export default orderCircular;

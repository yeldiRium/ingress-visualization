import { lineIntersectsLine } from "geometric";

const doLinksCross = (from1, to1, from2, to2) => {
  const leftLine = [
    [from1.lng, from1.lat],
    [to1.lng, to1.lat]
  ];
  const rightLine = [
    [from2.lng, from2.lat],
    [to2.lng, to2.lat]
  ];

  return lineIntersectsLine(leftLine, rightLine);
};

export default doLinksCross;

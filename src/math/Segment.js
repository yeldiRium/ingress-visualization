import Vector from "./Vector";

class Segment {
  constructor(startVector, endVector) {
    this.startVector = startVector;
    this.endVector = endVector;
  }

  intersects(segment, excludeEndpoints = false, precisionDigits = 14) {
    const precisionDifference = Math.pow(10, -precisionDigits);

    const p = this.startVector;
    const r = this.endVector.subtract(this.startVector);

    const q = segment.startVector;
    const s = segment.endVector.subtract(segment.startVector);

    const t = q.subtract(p).cross(s) / r.cross(s);
    const u = q.subtract(p).cross(r) / r.cross(s);

    if (excludeEndpoints) {
      return (
        t > precisionDifference &&
        t < 1 - precisionDifference &&
        u > precisionDifference &&
        u < 1 - precisionDifference
      );
    }

    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
  }

  angleTo(segment) {
    return this.endVector
      .subtract(this.startVector)
      .angleTo(segment.endVector.subtract(segment.startVector));
  }

  angleToDeg(segment) {
    return this.endVector
      .subtract(this.startVector)
      .angleToDeg(segment.endVector.subtract(segment.startVector));
  }

  angleToHorizontal() {
    const horizontalSegment = new Segment(new Vector(0, 0), new Vector(1, 0));

    return this.angleTo(horizontalSegment);
  }

  angleToHorizontalDeg() {
    const horizontalSegment = new Segment(new Vector(0, 0), new Vector(1, 0));

    return this.angleToDeg(horizontalSegment);
  }
}

export default Segment;

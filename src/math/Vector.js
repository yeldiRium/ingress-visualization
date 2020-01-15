import rad2deg from "./rad2deg";
import Segment from "./Segment";

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  multiply(number) {
    return new Vector(this.x * number, this.y * number);
  }

  divide(number) {
    return new Vector(this.x / number, this.y / number);
  }

  cross(vector) {
    return this.x * vector.y - this.y * vector.x;
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  angleTo(vector) {
    const dot = this.dot(vector);
    const determinant = this.cross(vector);
    return Math.atan2(determinant, dot);
  }

  angleToDeg(vector) {
    return rad2deg(this.angleTo(vector));
  }

  angleToHorizontal() {
    const horizontalVector = new Vector(1, 0);

    return this.angleTo(horizontalVector);
  }

  angleToHorizontalDeg() {
    const horizontalVector = new Vector(1, 0);

    return this.angleToDeg(horizontalVector);
  }

  leftFromSegment(segment) {
    const segmentFromStart = new Segment(segment.startVector, this);

    const angle = segmentFromStart.angleToDeg(segment);

    return !(angle >= 0 && angle < 180);
  }

  rightFromSegment(segment) {
    return !this.leftFromSegment(segment);
  }
}

export default Vector;

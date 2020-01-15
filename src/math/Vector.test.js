import Vector from "./Vector";
import Segment from "./Segment";

describe("Vector", () => {
  it("constructs correctly", () => {
    const v = new Vector(5, 8);

    expect(v.x).toBe(5);
    expect(v.y).toBe(8);
  });

  describe("add", () => {
    it("adds two vectors", () => {
      const v1 = new Vector(5, 8);
      const v2 = new Vector(13, 83);

      const sum = v1.add(v2);

      expect(sum.x).toBe(18);
      expect(sum.y).toBe(91);
    });
  });

  describe("subtract", () => {
    it("subtracts two vectors", () => {
      const v1 = new Vector(189, 985);
      const v2 = new Vector(893, 18598);

      const difference = v1.subtract(v2);

      expect(difference.x).toBe(-704);
      expect(difference.y).toBe(-17613);
    });
  });

  describe("multiply", () => {
    it("multiplies a vector with a number", () => {
      const v1 = new Vector(5, 8);
      const n = 7;

      const result = v1.multiply(n);

      expect(result.x).toBe(35);
      expect(result.y).toBe(56);
    });
  });

  describe("divide", () => {
    it("divides a vector by a number", () => {
      const v1 = new Vector(18, 36);
      const n = 6;

      const result = v1.divide(n);

      expect(result.x).toBe(3);
      expect(result.y).toBe(6);
    });
  });

  describe("cross", () => {
    it("calculates a cross-product of two vectors via v1.x * v2.y - v1.y * v2.x", () => {
      const v1 = new Vector(8, 3);
      const v2 = new Vector(12, 43);

      const crossProduct = v1.cross(v2);

      expect(crossProduct).toBe(308);
    });
  });

  describe("dot", () => {
    it("calculates the dot-product of two vectors", () => {
      const v1 = new Vector(45, 3);
      const v2 = new Vector(12, 863);

      const dotProduct = v1.dot(v2);

      expect(dotProduct).toBe(3129);
    });
  });

  describe("length", () => {
    it("calculates the vector's length", () => {
      const v = new Vector(3, 4);

      const length = v.length();

      expect(length).toBeCloseTo(5);
    });
  });

  describe("angleTo", () => {
    it("calculates the angle between two vectors", () => {
      const v1 = new Vector(1, 1);
      const v2 = new Vector(0, -1);

      const angle = v1.angleTo(v2);

      expect(angle).toBeCloseTo(-2.356194490192345);
    });
  });

  describe("angleToDeg", () => {
    it("calculates the angle between two vectors in degrees", () => {
      const v1 = new Vector(1, 1);
      const v2 = new Vector(0, -1);

      const angle = v1.angleToDeg(v2);

      expect(angle).toBeCloseTo(-135);
    });
  });

  describe("angleToHorizontal", () => {
    it("calculates the angle between the vector and the horizontal", () => {
      const v = new Vector(1, 1);

      const angle = v.angleToHorizontal();

      expect(angle).toBeCloseTo(-0.7853981633974484);
    });
  });

  describe("angleToHorizontalDeg", () => {
    it("calculates the angle between the vector and the horizontal in degrees", () => {
      const v = new Vector(1, 1);

      const angle = v.angleToHorizontalDeg();

      expect(angle).toBeCloseTo(-45);
    });
  });

  describe("leftFromSegment", () => {
    it("returns true if the vector is to the left in segment direction", () => {
      const v = new Vector(-1, 0);
      const s = new Segment(new Vector(0, -1), new Vector(0, 1));

      const isLeft = v.leftFromSegment(s);

      expect(isLeft).toBe(true);
    });

    it("returns false if the vector is to the right in segment direction", () => {
      const v = new Vector(1, 0);
      const s = new Segment(new Vector(0, -1), new Vector(0, 1));

      const isLeft = v.leftFromSegment(s);

      expect(isLeft).toBe(false);
    });
  });

  describe("rightFromSegment", () => {
    it("returns true if the vector is to the right in segment direction", () => {
      const v = new Vector(1, 0);
      const s = new Segment(new Vector(0, -1), new Vector(0, 1));

      const isLeft = v.rightFromSegment(s);

      expect(isLeft).toBe(true);
    });

    it("returns false if the vector is to the left in segment direction", () => {
      const v = new Vector(-1, 0);
      const s = new Segment(new Vector(0, -1), new Vector(0, 1));

      const isLeft = v.rightFromSegment(s);

      expect(isLeft).toBe(false);
    });
  });
});

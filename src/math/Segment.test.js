import Segment from "./Segment";
import Vector from "./Vector";

describe("Segment", () => {
  it("constructs a segment correctly", () => {
    const v1 = new Vector(0, 0);
    const v2 = new Vector(5, 5);

    const s = new Segment(v1, v2);

    expect(s.startVector).toBe(v1);
    expect(s.endVector).toBe(v2);
  });

  describe("intersects", () => {
    it.each([
      [
        new Segment(new Vector(1, -1), new Vector(1, 1)),
        new Segment(new Vector(-1, -1), new Vector(-1, 1)),
        false
      ],
      [
        new Segment(new Vector(1, -1), new Vector(-1, 1)),
        new Segment(new Vector(-1, -1), new Vector(1, 1)),
        true
      ],
      [
        new Segment(
          new Vector(50.054358, 8.693184),
          new Vector(50.055604, 8.685873)
        ),
        new Segment(
          new Vector(50.054228, 8.69338),
          new Vector(50.054358, 8.693184)
        ),
        false
      ],
      [
        new Segment(
          new Vector(50.058744, 8.679713),
          new Vector(50.052939, 8.68719)
        ),
        new Segment(
          new Vector(50.058268, 8.680028),
          new Vector(50.05808, 8.679623)
        ),
        false
      ]
    ])(
      "calculates whether two segments intersect (excluding endpoints)",
      (s1, s2, shouldIntersect) => {
        expect(s1.intersects(s2, true)).toBe(shouldIntersect);
      }
    );

    it.each([
      [
        new Segment(
          new Vector(50.054358, 8.693184),
          new Vector(50.055604, 8.685873)
        ),
        new Segment(
          new Vector(50.054228, 8.69338),
          new Vector(50.054358, 8.693184)
        ),
        true
      ]
    ])(
      "calculates whether two segments intersect (including endpoints)",
      (s1, s2, shouldIntersect) => {
        expect(s1.intersects(s2)).toBe(shouldIntersect);
      }
    );
  });

  describe("angleTo", () => {
    it("calculates the angle between two segments", () => {
      const s1 = new Segment(new Vector(5, 5), new Vector(6, 6));
      const s2 = new Segment(new Vector(4, 4), new Vector(5, 4));

      const angle = s1.angleTo(s2);

      expect(angle).toBeCloseTo(-0.7853981633974484);
    });
  });

  describe("angleToDog", () => {
    it("calculates the angle between two segments", () => {
      const s1 = new Segment(new Vector(5, 5), new Vector(6, 6));
      const s2 = new Segment(new Vector(4, 4), new Vector(5, 4));

      const angle = s1.angleToDeg(s2);

      expect(angle).toBeCloseTo(-45);
    });
  });

  describe("angleToHorizontal", () => {
    it("calculates the angle between the vector and the horizontal", () => {
      const s = new Segment(new Vector(5, 5), new Vector(6, 6));

      const angle = s.angleToHorizontal();

      expect(angle).toBeCloseTo(-0.7853981633974484);
    });
  });

  describe("angleToHorizontalDeg", () => {
    it("calculates the angle between the vector and the horizontal in degrees", () => {
      const s = new Segment(new Vector(5, 5), new Vector(6, 6));

      const angle = s.angleToHorizontalDeg();

      expect(angle).toBeCloseTo(-45);
    });
  });
});

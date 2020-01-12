import doLinksCross from "./doLinksCross";

describe("doLinksCross", () => {
  it("returns false for non-crossing links", () => {
    const from1 = { lng: 1, lat: -1 };
    const to1 = { lng: 1, lat: 1 };

    const from2 = { lng: -1, lat: -1 };
    const to2 = { lng: -1, lat: 1 };

    const linksCross = doLinksCross(from1, to1, from2, to2);

    expect(linksCross).toBe(false);
  });

  it("returns true for crossing links", () => {
    const from1 = { lng: 1, lat: -1 };
    const to1 = { lng: -1, lat: 1 };
    const from2 = { lng: -1, lat: -1 };
    const to2 = { lng: 1, lat: 1 };

    const linksCross = doLinksCross(from1, to1, from2, to2);

    expect(linksCross).toBe(true);
  });
});

import L from "leaflet";

import orderCircular from "./orderCircular";

describe("orderCircular", () => {
  it("does nothing to an array with one element", () => {
    const center = L.latLng(0, 0);
    const latLngsToOrder = [L.latLng(1, 1)];

    const sortedLatLngs = orderCircular(latLngsToOrder, center);

    expect(sortedLatLngs).toEqual([0]);
  });

  it("orders points in a circle while the first element in the array stays the first", () => {
    const center = L.latLng(0, 0);
    const latLngsToOrder = [L.latLng(1, -1), L.latLng(1, 1), L.latLng(1, 0)];

    const sortedLatLngs = orderCircular(latLngsToOrder, center);

    expect(sortedLatLngs).toEqual([0, 2, 1]);
  });

  it("can sort counter-clockwise", () => {
    const center = L.latLng(0, 0);
    const latLngsToOrder = [
      L.latLng(1, -1),
      L.latLng(1, 1),
      L.latLng(1, -1),
      L.latLng(-1, -1)
    ];

    const sortedLatLngs = orderCircular(latLngsToOrder, center, false);

    expect(sortedLatLngs).toEqual([0, 2, 3, 1]);
  });
});

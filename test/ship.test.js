import { shipFactory } from "../ship";

describe("ship suite", () => {
  test("returns object", () => {
    expect(shipFactory(3, 0, false)).toMatchObject({
      length: 3,
      hits: 0,
      sunk: false,
    });
  });
});

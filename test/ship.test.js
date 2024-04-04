import { shipFactory } from "../scripts/ship";

const mockShipBuilder = jest.fn(shipFactory);

describe("ship suite", () => {
  test("returns object", () => {
    expect(mockShipBuilder(3, 0, false)).toMatchObject({
      length: 3,
      hits: 0,
      sunk: false,
    });
  });
});

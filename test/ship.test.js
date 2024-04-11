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
  test("sinks ship at maximum hits", () => {
    const mockShip = mockShipBuilder(3, 0, false);
    mockShip.hit(mockShip);
    mockShip.hit(mockShip);
    mockShip.hit(mockShip);
    mockShip.isSunk(mockShip);
    expect(mockShip).toMatchObject({
      length: 3,
      hits: 3,
      sunk: true,
    });
    expect(mockShip.sunk).toBe(true);
    expect(mockShipBuilder.mock.calls).toHaveLength(2);
  });
});

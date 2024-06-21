import { gameboardFactory } from "../scripts/gameboard";

const mockGameboardFactory = jest.fn(gameboardFactory);
let mockBoard = mockGameboardFactory();

describe("Gameboard suite", () => {
  test.skip("returns object", () => {
    expect(mockGameboardFactory()).toMatchObject({
      board: [],
    });
  });
  test("ship placement works", () => {
    expect(
      mockBoard.placeShip(mockBoard, ["A", 5], "north", "mockShip", 5)
    ).toMatchObject({
      length: 5,
      hits: 0,
      sunk: false,
      shipDirection: "north",
      name: "mockShip",
    });
  });
});

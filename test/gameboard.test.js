import { gameboardFactory } from "../scripts/gameboard";

const mockGameboardFactory = jest.fn(gameboardFactory);

describe("Gameboard suite", () => {
  test("returns object", () => {
    expect(mockGameboardFactory()).toMatchObject({
      board: [],
    });
  });
});

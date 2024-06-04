import { gameboardFactory } from "./gameboard.js";

let boardOne = gameboardFactory();

let shipOne = boardOne.placeShip(boardOne, ["A", 3], "west", "first");
let offBoardShip = boardOne.placeShip(boardOne, ["b", 2], "east", "offBoard");
let shipAlreadyPresentShip = boardOne.placeShip(
  boardOne,
  ["e", 3],
  "east",
  "shipIsPresent"
);
boardOne.receiveAttack(["A", 3]);
boardOne.receiveAttack(["A", 2]);
boardOne.receiveAttack(["A", 1]);
boardOne.receiveAttack(["E", 3]);
boardOne.receiveAttack(["E", 2]);
boardOne.receiveAttack(["E", 1]);
boardOne.receiveAttack(["E", 2]);
boardOne.receiveAttack(["E", 2]);
boardOne.receiveAttack(["b", 3]);
boardOne.receiveAttack(["c", 3]);
boardOne.receiveAttack(["c", 3]);
boardOne.receiveAttack(["c", 3]);
console.log(boardOne);

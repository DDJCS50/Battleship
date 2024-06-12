import { gameboardFactory } from "./gameboard.js";
import { generateShipLocation } from "./location-randomizer.js";

export let boardOne = gameboardFactory();

let shipOne = boardOne.placeShip(boardOne, ["A", 5], "north", "captain", 5);
let invalidShip = boardOne.placeShip(
  boardOne,
  ["C", 7],
  "north",
  "invalidCaptain",
  5
);
let smallBattleship = boardOne.placeShip(
  boardOne,
  ["D", 7],
  "north",
  "small",
  2
);
let smallBattleshipInvalid = boardOne.placeShip(
  boardOne,
  ["E", 7],
  "north",
  "smallInvalid",
  2
);
// generateShipLocation();
// generateShipLocation();
// generateShipLocation();
boardOne.receiveAttack(["A", 3]);
boardOne.receiveAttack(["A", 2]);
boardOne.receiveAttack(["A", 1]);
boardOne.receiveAttack(["E", 3]);
boardOne.receiveAttack(["E", 2]);
boardOne.receiveAttack(["E", 1]);
boardOne.receiveAttack(["b", 3]);
boardOne.receiveAttack(["c", 3]);

console.log(boardOne.shipsOnBoard);

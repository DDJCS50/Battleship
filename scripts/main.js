import { gameboardFactory } from "./gameboard.js";
import { generateShipLocation } from "./location-randomizer.js";
import { playerFactory } from "./player.js";
import { render } from "./render.js";

export let boardOne = gameboardFactory();
let humanBoard = gameboardFactory();
let ComputerBoard = gameboardFactory();
let human = playerFactory("human", humanBoard, true, "humanBoard");

// let shipOne = boardOne.placeShip(boardOne, ["A", 5], "north", "captain", 4);
// // let invalidShip = boardOne.placeShip(
// //   boardOne,
// //   ["C", 7],
// //   "north",
// //   "invalidCaptain",
// //   5
// // );
// let smallBattleship = boardOne.placeShip(
//   boardOne,
//   ["D", 7],
//   "north",
//   "small",
//   2
// );
// let smallBattleshipInvalid = boardOne.placeShip(
//   boardOne,
//   ["E", 7],
//   "north",
//   "smallInvalid",
//   2
// );
let renderingBoards = render();
renderingBoards.renderCells(human);
generateShipLocation(humanBoard);
generateShipLocation(humanBoard);
generateShipLocation(humanBoard);
generateShipLocation(humanBoard);
generateShipLocation(humanBoard);
generateShipLocation(humanBoard);
boardOne.receiveAttack(["A", 3]);
boardOne.receiveAttack(["A", 2]);
boardOne.receiveAttack(["A", 1]);
boardOne.receiveAttack(["E", 3]);
boardOne.receiveAttack(["E", 2]);
boardOne.receiveAttack(["E", 1]);
boardOne.receiveAttack(["b", 3]);
boardOne.receiveAttack(["c", 3]);

console.log(boardOne.shipsOnBoard);
console.log(human);

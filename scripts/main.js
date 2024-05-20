import { gameboardFactory } from "./gameboard.js";

let boardOne = gameboardFactory();

let shipTwo = boardOne.placeShip(boardOne, [10, 10]);
let shipThree = boardOne.placeShip(boardOne, ["D", 3]);
let shipFour = boardOne.placeShip(boardOne, [6, 3]);
boardOne.receiveAttack(["D", 3]);
boardOne.receiveAttack(["D", 2]);
boardOne.receiveAttack(["D", 1]);
boardOne.receiveAttack(["E", 3]);
boardOne.receiveAttack(["E", 2]);
boardOne.receiveAttack(["E", 1]);
boardOne.receiveAttack(["E", 2]);
boardOne.receiveAttack(["E", 2]);
boardOne.receiveAttack(["E", 2]);
boardOne.receiveAttack(["E", 2]);
console.log(boardOne.shipsOnBoard);
console.log(boardOne.board);
console.log(boardOne);

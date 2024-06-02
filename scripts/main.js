import { gameboardFactory } from "./gameboard.js";

let boardOne = gameboardFactory();

let shipTwo = boardOne.placeShip(boardOne, [10, 10]);
let shipThree = boardOne.placeShip(boardOne, ["A", 3]);
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

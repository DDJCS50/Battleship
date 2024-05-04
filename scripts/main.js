import { shipFactory } from "./ship.js";
import { gameboardFactory } from "./gameboard.js";

let shipOne = shipFactory(3, 0, false);
shipOne.hit(shipOne);
shipOne.hit(shipOne);
shipOne.hit(shipOne);
let boardOne = gameboardFactory();
console.log(boardOne.board);
// boardOne.board.map((locationObject) => {
//   console.log(locationObject.hit);
// });
// shipOne.generateShipLocation(shipOne);
// let shipTwo = boardOne.placeShip(boardOne, [10, 10]);
// boardOne.board[33].shipPresent = true;
let shipThree = boardOne.placeShip(boardOne, [3, 3]);
// console.log(shipTwo);
console.log(shipThree);
// console.log(boardOne.board[0].location);

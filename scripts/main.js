import { shipFactory } from "./ship.js";
import { gameboardFactory } from "./gameboard.js";

let shipOne = shipFactory(3, 0, false);
shipOne.hit(shipOne);
shipOne.hit(shipOne);
shipOne.hit(shipOne);
let boardOne = gameboardFactory();
console.log(boardOne.board);
boardOne.board.map((locationObject) => {
  console.log(locationObject.hit);
});
shipOne.generateShipLocation(shipOne);
let shipTwo = boardOne.placeShip(boardOne, [5, 5]);
console.log(shipTwo);
console.log(boardOne.board[0].location);

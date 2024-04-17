import { shipFactory } from "./ship.js";
import { gameboardFactory } from "./gameboard.js";

let shipOne = shipFactory(3, 0, false);
shipOne.hit(shipOne);
shipOne.hit(shipOne);
shipOne.hit(shipOne);
let boardOne = gameboardFactory();
console.log(boardOne);

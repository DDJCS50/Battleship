import { shipFactory } from "./ship.js";

let shipOne = shipFactory(3, 0, false);
console.log(shipOne);
shipOne.hit(shipOne);
console.log(shipOne);
shipOne.hit(shipOne);
console.log(shipOne);
shipOne.hit(shipOne);
shipOne.isSunk(shipOne);
console.log(shipOne);

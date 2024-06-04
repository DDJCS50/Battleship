import { gameboardFactory } from "./gameboard.js";
import { generateShipLocation } from "./location-randomizer.js";

export let boardOne = gameboardFactory();

let shipOne = boardOne.placeShip(boardOne, ["A", 3], "west", "first");
generateShipLocation();
generateShipLocation();
generateShipLocation();
boardOne.receiveAttack(["A", 3]);
boardOne.receiveAttack(["A", 2]);
boardOne.receiveAttack(["A", 1]);
boardOne.receiveAttack(["E", 3]);
boardOne.receiveAttack(["E", 2]);
boardOne.receiveAttack(["E", 1]);
boardOne.receiveAttack(["b", 3]);
boardOne.receiveAttack(["c", 3]);

console.log(boardOne.shipsOnBoard);

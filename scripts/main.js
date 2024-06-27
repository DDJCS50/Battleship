import { gameboardFactory } from "./gameboard.js";
import { generateShipLocation } from "./location-randomizer.js";
import { playerFactory } from "./player.js";
import { render, renderObject } from "./render.js";

export let boardOne = gameboardFactory();
let humanBoard = gameboardFactory();
let cpuBoard = gameboardFactory();
let human = playerFactory("human", humanBoard, true, "humanBoard");
let cpu = playerFactory("cpu", cpuBoard, true, "cpuBoard");

renderObject.renderCells(human);
renderObject.renderCells(cpu);
let humanShipOne = humanBoard.placeShip(
  humanBoard,
  ["A", 5],
  "north",
  "humanShip",
  3,
  human
);
let cpuShipOne = cpuBoard.placeShip(
  cpuBoard,
  ["A", 5],
  "north",
  "cpuShip",
  3,
  cpu
);
// generateShipLocation(humanBoard);
// generateShipLocation(humanBoard);
// generateShipLocation(humanBoard);
// generateShipLocation(humanBoard);
// generateShipLocation(humanBoard);
// generateShipLocation(humanBoard);
humanBoard.receiveAttack(["A", 3], human);
humanBoard.receiveAttack(["A", 2], human);
cpuBoard.receiveAttack(["A", 3], cpu);
cpuBoard.receiveAttack(["A", 2], cpu);

console.log(boardOne.shipsOnBoard);
console.log(human);

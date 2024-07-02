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
renderObject.renderClickEvents(cpu, human);
renderObject.renderCreateShipBtnEvent(human);
renderObject.renderResetGameButton();
renderObject.renderResetEvent(human, cpu);
generateShipLocation(cpuBoard, cpu);
generateShipLocation(cpuBoard, cpu);
generateShipLocation(cpuBoard, cpu);
generateShipLocation(cpuBoard, cpu);
generateShipLocation(cpuBoard, cpu);

console.log(human);
console.log(cpu);

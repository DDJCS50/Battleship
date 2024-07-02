import { renderObject } from "./render.js";

export function shipFactory(length, hits, sunk, shipDirection, name) {
  if (length === undefined) length = 0;
  if (hits === undefined) hits = 0;
  if (sunk === undefined) sunk = false;

  let locationArray = [];
  let shipHitLocations = [];
  if (shipDirection == undefined) shipDirection = "east";
  if (name == undefined) name = "defaultShip";

  function hit(ship) {
    ship.hits++;
  }

  function isSunk(ship) {
    if (ship.hits === ship.length) {
      ship.sunk = true;
      renderObject.renderAlert(`Battleship ${name} Sunk!`);
      setTimeout(renderObject.removeAlert, 3000);
    } else ship.sunk = false;
  }

  function shipOrientation(ship, direction) {
    if (direction == "north") {
      ship.shipDirection = "north";
    } else if (direction == "south") {
      ship.shipDirection = "south";
    } else if (direction == "east") {
      ship.shipDirection = "east";
    } else if (direction == "west") {
      ship.shipDirection = "west";
    }
  }

  return {
    length,
    hits,
    sunk,
    locationArray,
    shipDirection,
    name,
    shipHitLocations,
    hit,
    isSunk,
    shipOrientation,
  };
}

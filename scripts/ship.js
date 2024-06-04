export function shipFactory(length, hits, sunk, shipDirection, name) {
  if (length === undefined) length = 0;
  if (hits === undefined) hits = 0;
  if (sunk === undefined) sunk = false;

  let locationArray = [];
  if (shipDirection == undefined) shipDirection = "east";
  if (name == undefined) name = "defaultShip";

  function hit(ship) {
    ship.hits++;
  }

  function isSunk(ship) {
    if (ship.hits === ship.length) {
      ship.sunk = true;
      console.log("Battleship Sunk!");
      // alert("Battleship Sunk!");
    } else ship.sunk = false;
  }

  function generateShipLocation(ship) {
    ship.locationArray.push([
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ]);
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
    hit,
    isSunk,
    generateShipLocation,
    shipOrientation,
  };
}

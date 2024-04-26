export function shipFactory(length, hits, sunk) {
  if (length === undefined) length = 0;
  if (hits === undefined) hits = 0;
  if (sunk === undefined) sunk = false;

  let locationArray = [];
  let hitLocationArray = [];

  function hit(ship) {
    ship.hits++;
  }

  function isSunk(ship) {
    if (ship.hits === ship.length) {
      ship.sunk = true;
      console.log("Battleship Sunk!");
    } else ship.sunk = false;
  }

  function generateShipLocation(ship) {
    ship.locationArray.push([
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ]);
    console.log(ship.locationArray);
  }

  return {
    length,
    hits,
    sunk,
    locationArray,
    hitLocationArray,
    hit,
    isSunk,
    generateShipLocation,
  };
}

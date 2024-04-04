export function shipFactory(length, hits, sunk) {
  if (length === undefined) length = 0;
  if (hits === undefined) hits = 0;
  if (sunk === undefined) sunk = false;

  function hit(ship) {
    ship.hits++;
  }

  function isSunk(ship) {
    if (ship.hits === ship.length) {
      ship.sunk = true;
      console.log("Battleship Sunk!");
    } else ship.sunk = false;
  }

  return {
    length,
    hits,
    sunk,
    hit,
    isSunk,
  };
}

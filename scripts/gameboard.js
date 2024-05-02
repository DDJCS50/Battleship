import { shipFactory } from "./ship.js";

export function gameboardFactory(board) {
  board = [];
  let tempArr = [];
  let hitLocations = [];
  let allLocations = [];
  let shipsOnBoard = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      tempArr.push({
        hit: false,
        location: [i, j],
        shipPresent: false,
      });
    }
  }
  board = tempArr;
  function placeShip(board, location) {
    let nose = location;
    let tempShip = shipFactory(5, 0, false);
    tempShip.shipOrientation(tempShip, "north");
    let direction = tempShip.shipDirection;
    for (let i = 0; i < tempShip.length; i++) {
      if (direction == "north") {
        tempShip.locationArray.push([nose[0], nose[1] - i]);
      } else if (direction == "south") {
        tempShip.locationArray.push([nose[0], nose[1] + i]);
      } else if (direction == "east") {
        tempShip.locationArray.push([nose[0] - i, nose[1]]);
      } else if (direction == "west") {
        tempShip.locationArray.push([nose[0] + i, nose[1]]);
      }
    }
    return tempShip;
  }

  function validLocation(board) {}

  function receiveAttack() {}
  return {
    board,
    hitLocations,
    shipsOnBoard,
    placeShip,
    receiveAttack,
    validLocation,
  };
}

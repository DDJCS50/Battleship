import { generateShipLocation } from "./location-randomizer.js";
import { shipFactory } from "./ship.js";

export function gameboardFactory(board) {
  board = [];
  let tempArr = [];
  let hitLocations = [];
  let shipsOnBoard = [];
  let alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  function _createInitialBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        tempArr.push({
          hit: false,
          location: [alpha[i], j],
          shipPresent: false,
        });
      }
    }
    board = tempArr;
  }
  _createInitialBoard();

  function placeShip(board, location, inputDirection, name) {
    if (_invalidLocation(location)) {
      console.log("invalid location input, generating new ship");
      generateShipLocation();
      return;
    }
    let nose = location;
    let tempShip = shipFactory(3, 0, false, inputDirection, name);

    let direction = tempShip.shipDirection;
    let validity = true;
    validity = _validLocation(board.board, tempShip, nose);
    if (validity == true) {
      for (let i = 0; i < tempShip.length; i++) {
        if (direction == "north") {
          tempShip.locationArray.push([nose[0], nose[1] - i]);
        } else if (direction == "south") {
          tempShip.locationArray.push([nose[0], nose[1] + i]);
        } else if (direction == "east") {
          tempShip.locationArray.push([
            alpha[alpha.indexOf(nose[0]) - i],
            nose[1],
          ]);
        } else if (direction == "west") {
          tempShip.locationArray.push([
            alpha[alpha.indexOf(nose[0]) + i],
            nose[1],
          ]);
        }
      }
    } else {
      console.log("ship present/ ship goes off board, generating new ship");
      generateShipLocation();
      return;
    }

    if (validity == true) {
      shipsOnBoard.push(tempShip);
      _updateBoardLocations(tempShip);
    }
    return tempShip;
  }

  function _validLocation(board, ship, location) {
    let nose = location;
    let validTallies = 0;
    let tempLocation;

    for (let i = 0; i < ship.length; i++) {
      board.forEach((square) => {
        tempLocation = _validLocationHelperIterate(nose, i, ship.shipDirection);
        if (square.location.toString() == tempLocation.toString()) {
          if (square.hit == true || square.shipPresent == true) {
            console.log("invalid");
          } else {
            validTallies++;
          }
        }
      });
    }
    if (validTallies == ship.length) {
      return true;
    } else {
      return false;
    }
  }

  function receiveAttack(coordinates) {
    if (_validAttack(coordinates) != true) {
      console.log("Invalid attack");
      return;
    }
    for (let i = 0; i < shipsOnBoard.length; i++) {
      for (let j = 0; j < shipsOnBoard[i].length; j++) {
        if (
          coordinates.toString() == shipsOnBoard[i].locationArray[j].toString()
        ) {
          shipsOnBoard[i].hit(shipsOnBoard[i]);
          shipsOnBoard[i].shipHitLocations.push(coordinates);
          shipsOnBoard[i].isSunk(shipsOnBoard[i]);
        }
      }
    }
    hitLocations.push(coordinates);
    _updateBoardHits(coordinates);
  }

  function _validAttack(locationInput) {
    if (typeof locationInput[0] != "string") {
      return false;
    } else if (!alpha.includes(locationInput[0].toUpperCase())) {
      return false;
    }
    locationInput[0] = locationInput[0].toUpperCase();
    let attackExists = false;
    if (hitLocations.length == 0) {
      return true;
    }

    attackExists = hitLocations.some(
      (location) => location.toString() == locationInput.toString()
    );

    if (attackExists) {
      return false;
    } else {
      return true;
    }
  }

  function _updateBoardLocations(ship) {
    ship.locationArray.forEach((location) => {
      board.forEach((square) => {
        if (square.location.toString() == location.toString()) {
          square.shipPresent = true;
        }
      });
    });
  }

  function _updateBoardHits(hitInput) {
    board.forEach((square) => {
      if (square.location.toString() == hitInput.toString()) {
        square.hit = true;
      }
    });
  }

  function _invalidLocation(input) {
    if (input[1] > 9 || input[1] < 0) {
      return true;
    }

    if (typeof input[0] != "string") {
      return true;
    }

    if (!alpha.includes(input[0].toUpperCase())) {
      return true;
    }

    return false;
  }

  function _validLocationHelperIterate(
    currentShipPart,
    iteration,
    shipBowDirection
  ) {
    currentShipPart[0] = currentShipPart[0].toUpperCase();
    if (shipBowDirection == "north") {
      return [currentShipPart[0], currentShipPart[1] - iteration];
    } else if (shipBowDirection == "south") {
      return [currentShipPart[0], currentShipPart[1] + iteration];
    } else if (shipBowDirection == "east") {
      return [
        alpha[alpha.indexOf(currentShipPart[0]) - iteration],
        currentShipPart[1],
      ];
    } else if (shipBowDirection == "west") {
      return [
        alpha[alpha.indexOf(currentShipPart[0]) + iteration],
        currentShipPart[1],
      ];
    }
  }
  return {
    board,
    hitLocations,
    shipsOnBoard,
    alpha,
    placeShip,
    receiveAttack,
  };
}

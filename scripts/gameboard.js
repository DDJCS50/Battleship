import { generateShipLocation } from "./location-randomizer.js";
import { render, renderObject } from "./render.js";
import { shipFactory } from "./ship.js";

export function gameboardFactory(board) {
  board = [];
  let tempArr = [];
  let hitLocations = [];
  let shipsOnBoard = [];
  let alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  let captainShips = [];
  let largeShips = [];
  let mediumShips = [];
  let smallShips = [];

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

  function placeShip(board, location, inputDirection, name, shipLength, currentPlayerObject) {
    if (_invalidLocation(location)) {
      console.log("invalid location input, generating new ship");
      generateShipLocation(board, currentPlayerObject);
      return;
    } else if (_shipLengthValid(shipLength) == false) {
      generateShipLocation(board, currentPlayerObject);
      console.log(`${name} has an invalid ship length`);
      return;
    }
    let nose = location;
    let tempShip = shipFactory(shipLength, 0, false, inputDirection, name);

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
          tempShip.locationArray.push([alpha[alpha.indexOf(nose[0]) - i], nose[1]]);
        } else if (direction == "west") {
          tempShip.locationArray.push([alpha[alpha.indexOf(nose[0]) + i], nose[1]]);
        }
      }
    } else {
      console.log("ship present/ ship goes off board, generating new ship");
      generateShipLocation(board, currentPlayerObject);
      return;
    }

    if (validity == true) {
      shipsOnBoard.push(tempShip);
      if (tempShip.length == 5) {
        captainShips.push(tempShip);
      } else if (tempShip.length == 4) {
        largeShips.push(tempShip);
      } else if (tempShip.length == 3) {
        mediumShips.push(tempShip);
      } else if (tempShip.length == 2) {
        smallShips.push(tempShip);
      }
      _updateBoardLocations(tempShip);
    }
    renderObject.renderShips(currentPlayerObject);
    if (currentPlayerObject.playerName == "human") {
      renderObject.renderMulliganInput();
      renderObject.renderMulliganEvent(currentPlayerObject);
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

  function receiveAttack(coordinates, playerSelected, playerAttacking) {
    if (_validAttack(coordinates) != true) {
      console.log("Invalid attack");
      if (playerAttacking.playerName == "human") {
        alert("Choose a valid location to attack");
        return;
      }
      playerAttacking.playerAttack(playerAttacking, playerSelected);
      return;
    }
    let shipWasHit = false;
    for (let i = 0; i < shipsOnBoard.length; i++) {
      for (let j = 0; j < shipsOnBoard[i].length; j++) {
        if (coordinates.toString() == shipsOnBoard[i].locationArray[j].toString()) {
          shipsOnBoard[i].hit(shipsOnBoard[i]);
          shipsOnBoard[i].shipHitLocations.push(coordinates);
          shipsOnBoard[i].isSunk(shipsOnBoard[i]);
          shipWasHit = true;
        }
      }
    }

    if (shipWasHit == false) {
      console.log(`Attack at [${coordinates}] missed!`);
    }

    hitLocations.push(coordinates);
    _updateBoardHits(coordinates);
    renderObject.renderHits(playerSelected);
    renderObject.renderMissedAttack(playerSelected);
    _allShipsSunk(playerSelected, playerAttacking);

    if (playerAttacking.playerName == "human" && playerAttacking.playerHasWon == false) {
      playerSelected.playerAttack(playerSelected, playerAttacking);
    }
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

    attackExists = hitLocations.some((location) => location.toString() == locationInput.toString());

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

  function _validLocationHelperIterate(currentShipPart, iteration, shipBowDirection) {
    currentShipPart[0] = currentShipPart[0].toUpperCase();
    if (shipBowDirection == "north") {
      return [currentShipPart[0], currentShipPart[1] - iteration];
    } else if (shipBowDirection == "south") {
      return [currentShipPart[0], currentShipPart[1] + iteration];
    } else if (shipBowDirection == "east") {
      return [alpha[alpha.indexOf(currentShipPart[0]) - iteration], currentShipPart[1]];
    } else if (shipBowDirection == "west") {
      return [alpha[alpha.indexOf(currentShipPart[0]) + iteration], currentShipPart[1]];
    }
  }

  function _shipLengthValid(lengthInput) {
    if (lengthInput == 5 && captainShips.length < 1) {
      return true;
    } else if (lengthInput == 4 && largeShips.length < 1) {
      return true;
    } else if (lengthInput == 3 && mediumShips.length < 2) {
      return true;
    } else if (lengthInput == 2 && smallShips.length < 1) {
      return true;
    }

    return false;
  }

  function _allShipsSunk(playerBeingAttacked, playerDoingTheAttack) {
    let shipsStillAlive = shipsOnBoard.length;
    for (let i = 0; i < shipsOnBoard.length; i++) {
      if (shipsOnBoard[i].sunk == true) {
        shipsStillAlive--;
      }
    }
    if (shipsStillAlive == 0) {
      alert(`${playerBeingAttacked.playerName} player's ships have all been sunk, ${playerDoingTheAttack.playerName} player Wins!`);
      playerDoingTheAttack.playerHasWon = true;
    }
  }

  function mulliganShip(currentPlayerObject) {
    console.log(`${currentPlayerObject.playerName} requests a ship mulligan`);
    let shipArraySelector = currentPlayerObject.playerBoard.shipsOnBoard;
    let shipToBeRerolled = shipArraySelector[shipArraySelector.length - 1];
    let boardSelector = currentPlayerObject.playerBoard.board;
    for (let i = 0; i < shipToBeRerolled.length; i++) {
      for (let j = 0; j < boardSelector.length; j++) {
        if (boardSelector[j].location.toString() == shipToBeRerolled.locationArray[i].toString()) {
          boardSelector[j].shipPresent = false;
          let cellElement = document.getElementById(`${boardSelector[j].location}-human`);
          cellElement.classList = "cell";
        }
      }
    }
    shipArraySelector.splice(shipArraySelector.length - 1, 1);
    if (shipToBeRerolled.length == 5) {
      currentPlayerObject.playerBoard.captainShips.splice(currentPlayerObject.playerBoard.captainShips.length - 1, 1);
    } else if (shipToBeRerolled.length == 4) {
      currentPlayerObject.playerBoard.largeShips.splice(currentPlayerObject.playerBoard.largeShips.length - 1, 1);
    } else if (shipToBeRerolled.length == 3) {
      currentPlayerObject.playerBoard.mediumShips.splice(currentPlayerObject.playerBoard.mediumShips.length - 1, 1);
    } else if (shipToBeRerolled.length == 2) {
      currentPlayerObject.playerBoard.smallShips.splice(currentPlayerObject.playerBoard.smallShips.length - 1, 1);
    }
    console.log(currentPlayerObject);
    document.getElementById("mulliganInput").remove();
  }

  return {
    board,
    hitLocations,
    shipsOnBoard,
    alpha,
    captainShips,
    largeShips,
    mediumShips,
    smallShips,
    placeShip,
    receiveAttack,
    mulliganShip,
  };
}

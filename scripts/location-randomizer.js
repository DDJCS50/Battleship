import { boardOne } from "./main.js";

export function generateShipLocation() {
  let directions = ["north", "south", "east", "west"];
  let randomNumber = 100;
  let defaultLength = 5;
  while (randomNumber < 0 || randomNumber > 3) {
    randomNumber = Math.floor(Math.random() * 10);
  }
  let randomDirection = directions[randomNumber];

  let letters = boardOne.alpha;
  let randomLetter = "z";
  while (!boardOne.alpha.includes(randomLetter.toUpperCase())) {
    randomLetter = boardOne.alpha[Math.floor(Math.random() * 10)];
  }

  let randomCoordinate = 101;
  while (randomCoordinate > 10 || randomCoordinate < 0) {
    randomCoordinate = Math.floor(Math.random() * 10);
  }

  if (boardOne.captainShips.length < 1) {
    defaultLength = 5;
  } else if (boardOne.largeShips.length < 1) {
    defaultLength = 4;
  } else if (boardOne.mediumShips.length < 2) {
    defaultLength = 3;
  } else if (boardOne.smallShips.length < 1) {
    defaultLength = 2;
  } else {
    console.log("Board Full");
    return;
  }

  let name = `randomShip${boardOne.shipsOnBoard.length}`;
  boardOne.placeShip(
    boardOne,
    [randomLetter, randomCoordinate],
    randomDirection,
    name,
    defaultLength
  );
}

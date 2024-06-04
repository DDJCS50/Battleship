import { boardOne } from "./main.js";

export function generateShipLocation() {
  let directions = ["north", "south", "east", "west"];
  let randomNumber = 100;
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

  let name = `randomShip${boardOne.shipsOnBoard.length}`;
  boardOne.placeShip(
    boardOne,
    [randomLetter, randomCoordinate],
    randomDirection,
    name
  );
}

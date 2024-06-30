export function playerFactory(playerName, playerBoard, playerTurn, playerBoardName) {
  if (playerName == undefined) playerName = "default";
  if (playerBoard == undefined) playerBoard = "defaultBoard";
  if (playerTurn == undefined) playerTurn = "human";
  if (playerBoardName == undefined) playerBoardName = "defaultBoard";

  function playerAttack(player, playerTargeted, coordinatesClicked) {
    if (player.playerName == "human") {
      _cpuBoardAttack(playerTargeted, player, coordinatesClicked);
    } else if (player.playerName == "cpu") {
      _humanBoardAttack(playerTargeted, player);
    }
  }

  function _humanBoardAttack(playerSelect, currentPlayer) {
    let letters = playerSelect.playerBoard.alpha;
    let randomLetter = "z";
    while (!playerSelect.playerBoard.alpha.includes(randomLetter.toUpperCase())) {
      randomLetter = playerSelect.playerBoard.alpha[Math.floor(Math.random() * 10)];
    }

    let randomCoordinate = 101;
    while (randomCoordinate > 10 || randomCoordinate < 0) {
      randomCoordinate = Math.floor(Math.random() * 10);
    }
    playerSelect.playerBoard.receiveAttack([randomLetter, randomCoordinate], playerSelect, currentPlayer);
  }

  function _cpuBoardAttack(playerSelect, currentPlayer, locationClicked) {
    playerSelect.playerBoard.receiveAttack(locationClicked, playerSelect, currentPlayer);
  }

  return {
    playerName,
    playerBoard,
    playerTurn,
    playerBoardName,
    playerAttack,
  };
}

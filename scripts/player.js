export function playerFactory(playerName, playerBoard, playerTurn) {
  if (playerName == undefined) playerName = "default";
  if (playerBoard == undefined) playerBoard = "defaultBoard";
  if (playerTurn == undefined) playerTurn = "human";

  return {
    playerName,
    playerBoard,
    playerTurn,
  };
}

export function playerFactory(
  playerName,
  playerBoard,
  playerTurn,
  playerBoardName
) {
  if (playerName == undefined) playerName = "default";
  if (playerBoard == undefined) playerBoard = "defaultBoard";
  if (playerTurn == undefined) playerTurn = "human";
  if (playerBoardName == undefined) playerBoardName = "defaultBoard";

  return {
    playerName,
    playerBoard,
    playerTurn,
    playerBoardName,
  };
}

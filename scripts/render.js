export function render() {
  function renderCells(player) {
    let cellBoxSelector = document.getElementById(player.playerBoardName);
    let boardSelected = player.playerBoard.board;
    for (let i = 0; i < boardSelected.length; i++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `${boardSelected[i].location}-${player.playerName}`;
      cellBoxSelector.appendChild(cell);
    }
  }

  function renderShips(player) {
    let selectedBoard = player.playerBoard.board;
    for (let i = 0; i < selectedBoard.length; i++) {
      if (selectedBoard[i].shipPresent == true) {
        let renderedCell = document.getElementById(
          selectedBoard[i].location.toString().concat("-", player.playerName)
        );
        renderedCell.classList = "shipPresent cell";
      }
    }
  }

  function renderHits(player) {
    let selectedBoard = player.playerBoard.board;
    for (let i = 0; i < selectedBoard.length; i++) {
      if (
        selectedBoard[i].shipPresent == true &&
        selectedBoard[i].hit == true
      ) {
        let renderedCell = document.getElementById(
          selectedBoard[i].location.toString().concat("-", player.playerName)
        );
        renderedCell.classList = "shipHit cell";
      }
    }
  }

  function renderMissedAttack(player) {
    let selectedBoard = player.playerBoard.board;
    for (let i = 0; i < selectedBoard.length; i++) {
      if (
        selectedBoard[i].shipPresent == false &&
        selectedBoard[i].hit == true
      ) {
        let renderedCell = document.getElementById(
          selectedBoard[i].location.toString().concat("-", player.playerName)
        );
        renderedCell.classList = "missedAttack cell";
      }
    }
  }

  return {
    renderCells,
    renderShips,
    renderHits,
    renderMissedAttack,
  };
}
export let renderObject = render();

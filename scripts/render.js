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
    if (player.playerName == "cpu") {
      return;
    }
    let selectedBoard = player.playerBoard.board;
    for (let i = 0; i < selectedBoard.length; i++) {
      if (selectedBoard[i].shipPresent == true) {
        let renderedCell = document.getElementById(selectedBoard[i].location.toString().concat("-", player.playerName));
        renderedCell.classList = "shipPresent cell";
      }
    }
  }

  function renderHits(player) {
    let selectedBoard = player.playerBoard.board;
    for (let i = 0; i < selectedBoard.length; i++) {
      if (selectedBoard[i].shipPresent == true && selectedBoard[i].hit == true) {
        let renderedCell = document.getElementById(selectedBoard[i].location.toString().concat("-", player.playerName));
        renderedCell.classList = "shipHit cell";
      }
    }
  }

  function renderMissedAttack(player) {
    let selectedBoard = player.playerBoard.board;
    for (let i = 0; i < selectedBoard.length; i++) {
      if (selectedBoard[i].shipPresent == false && selectedBoard[i].hit == true) {
        let renderedCell = document.getElementById(selectedBoard[i].location.toString().concat("-", player.playerName));
        renderedCell.classList = "missedAttack cell";
      }
    }
  }

  function renderClickEvents(player, enemyPlayer) {
    let boardSelect = player.playerBoard.board;
    for (let i = 0; i < boardSelect.length; i++) {
      let currentCell = document.getElementById(`${boardSelect[i].location}-${player.playerName}`);

      currentCell.addEventListener("click", (event) => {
        event.stopPropagation();
        enemyPlayer.playerAttack(enemyPlayer, player, boardSelect[i].location);
      });
    }
  }

  return {
    renderCells,
    renderShips,
    renderHits,
    renderMissedAttack,
    renderClickEvents,
  };
}
export let renderObject = render();

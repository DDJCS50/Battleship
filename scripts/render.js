export function render() {
  function renderCells(player) {
    let cellBoxSelector = document.getElementById(player.playerBoardName);
    let boardSelected = player.playerBoard.board;
    for (let i = 0; i < boardSelected.length; i++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `${boardSelected[i].location}`;
      cellBoxSelector.appendChild(cell);
    }
  }

  return {
    renderCells,
  };
}

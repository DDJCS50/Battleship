import { generateShipLocation } from "./location-randomizer.js";

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
        if (player.playerHasWon == true || enemyPlayer.playerHasWon == true) {
          return;
        }
        enemyPlayer.playerAttack(enemyPlayer, player, boardSelect[i].location);
      });
    }
  }

  function renderCreateShipBtnEvent(playerObject) {
    let createShipBtn = document.getElementById("shipBuilderBtn");
    createShipBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      let mulliganInputElement = document.getElementById("mulliganInput");
      if (mulliganInputElement != undefined && mulliganInputElement != null) {
        mulliganInputElement.remove();
      }
      generateShipLocation(playerObject.playerBoard, playerObject);
    });
  }

  function renderMulliganInput() {
    let sidebar = document.getElementById("sidebar");
    let input = document.createElement("input");
    input.type = "text";
    input.id = "mulliganInput";
    input.placeholder = "Mulligan ship? (y/n)";
    sidebar.appendChild(input);
  }

  let mulliganCount = 0;
  function renderMulliganEvent(player) {
    let mulliganInput = document.getElementById("mulliganInput");
    mulliganInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        let answer = document.getElementById("mulliganInput").value;
        answer = answer.toString().toLowerCase();
        if (answer == "y") {
          if (mulliganCount >= 3) {
            console.log("max mulligans reached");
            return;
          }
          player.playerBoard.mulliganShip(player);
          mulliganCount++;
        } else if (answer == "n") {
          mulliganInput.remove();
        }
      }
    });
  }

  return {
    renderCells,
    renderShips,
    renderHits,
    renderMissedAttack,
    renderClickEvents,
    renderCreateShipBtnEvent,
    renderMulliganInput,
    renderMulliganEvent,
  };
}
export let renderObject = render();

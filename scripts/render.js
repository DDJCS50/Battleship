import { gameboardFactory } from "./gameboard.js";
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
        for (let j = 0; j < player.playerBoard.shipsOnBoard.length; j++) {
          for (let k = 0; k < player.playerBoard.shipsOnBoard[j].locationArray.length; k++) {
            if (selectedBoard[i].location.toString() == player.playerBoard.shipsOnBoard[j].locationArray[k].toString()) {
              if (player.playerBoard.shipsOnBoard[j].shipDirection == "north") {
                renderedCell.innerText = "^";
              } else if (player.playerBoard.shipsOnBoard[j].shipDirection == "south") {
                renderedCell.innerText = "v";
              } else if (player.playerBoard.shipsOnBoard[j].shipDirection == "east") {
                renderedCell.innerText = ">";
              } else if (player.playerBoard.shipsOnBoard[j].shipDirection == "west") {
                renderedCell.innerText = "<";
              }
            }
          }
        }
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
        if (player.playerBoard.shipsOnBoard.length < 5 || enemyPlayer.playerBoard.shipsOnBoard.length < 5) {
          return;
        }
        if (player.playerHasWon == true || enemyPlayer.playerHasWon == true) {
          return;
        }
        mulliganCount = 3;
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
    input.placeholder = `Mulligan ship? (y/n) ${mulliganCount}/3 mulligans`;
    if (mulliganCount >= 3) {
      input.placeholder = `${mulliganCount}/3 mulligans reached`;
    }

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

  function renderResetGameButton() {
    let sidebar = document.getElementById("sidebar");
    let resetGameBtn = document.createElement("button");
    resetGameBtn.id = "resetGameBtn";
    resetGameBtn.textContent = "Reset Game";
    sidebar.appendChild(resetGameBtn);
  }

  function renderResetEvent(player, enemyPlayer) {
    let resetGameBtn = document.getElementById("resetGameBtn");
    let playerBoardSelector = document.getElementById(player.playerBoardName);
    let enemyPlayerBoardSelector = document.getElementById(enemyPlayer.playerBoardName);
    resetGameBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      player.playerBoard = gameboardFactory();
      enemyPlayer.playerBoard = gameboardFactory();
      playerBoardSelector.innerHTML = "";
      enemyPlayerBoardSelector.innerHTML = "";
      renderCells(player);
      renderCells(enemyPlayer);
      renderClickEvents(enemyPlayer, player);
      for (let i = 0; i < 5; i++) {
        generateShipLocation(enemyPlayer.playerBoard, enemyPlayer);
      }
      mulliganCount = 0;
      let mulliganInput = document.getElementById("mulliganInput");
      if (mulliganInput != undefined && mulliganInput != null) {
        mulliganInput.remove();
      }
      player.playerHasWon = false;
      enemyPlayer.playerHasWon = false;
    });
  }

  function renderAlert(message) {
    let alertBox = document.getElementById("alert");
    alertBox.innerText = message.toString();
  }

  function removeAlert() {
    let alertBox = document.getElementById("alert");
    alertBox.innerText = "";
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
    renderResetGameButton,
    renderResetEvent,
    renderAlert,
    removeAlert,
  };
}
export let renderObject = render();

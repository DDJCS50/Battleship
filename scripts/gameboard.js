export function gameboardFactory(board) {
  board = [];
  let tempArr = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      tempArr.push([i, j]);
    }
  }
  board = tempArr;
  function placeShip() {}
  function receiveAttack() {}
  return {
    board,
    placeShip,
    receiveAttack,
  };
}

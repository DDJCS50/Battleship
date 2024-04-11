export function gameboardFactory(board) {
  function placeShip() {}
  function receiveAttack() {}
  return {
    board,
    placeShip,
    receiveAttack,
  };
}

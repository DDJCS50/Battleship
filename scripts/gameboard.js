export function gameboardFactory(board) {
  board = [];
  let tempArr = [];
  let hitLocations = [];
  let allLocations = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      tempArr.push({
        hit: false,
        location: [i, j],
        shipPresent: false,
      });
    }
  }
  board = tempArr;
  function placeShip(board) {}
  function receiveAttack() {}
  return {
    board,
    hitLocations,
    placeShip,
    receiveAttack,
  };
}

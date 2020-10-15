export default function checkWinner(board) {
  let openSpots = 0;
  let winner = null;

  for(let i = 0; i<3; i++) {
    for(let j = 0; j<3; j++) {

      //check horizontal
      if(equal3(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      }

      //check vertical
      if(equal3(board[0][j], board[1][j], board[2][j])) {
        winner = board[0][j];
      }

      //check diagonally LR
      if(equal3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
      }

      //check diagonally RL
      if(equal3(board[0][2], board[1][1], board[2][0])) {
        winner = board[0][2];
      }

      if(board[i][j] == '') {
        openSpots ++
      }
    }
  }
  if(openSpots == 0 && winner == null) {
    return 'draw'
  } else if (winner == null) {
    return null;
  } else {
    return winner;
  }
}


//check if three nodeElents are equal
function equal3(a,b,c) {
  return a != '' && a == b && b == c; 
}
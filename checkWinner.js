//check if game is draw or won, return 'X', 'O', 'draw' or null
export function checkWinner() {
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
  
        if(isEmpty()) {
          openSpots ++
        }
      }
    }
    if(openSpots == 0 && winner == null) {
      return 'draw'
    } else {
      return winner
    }
  }
  
  function equal3(a,b,c) {
    return !isEmpty(a) && a.classList.item(1) == b.classList.item(1) && b.classList.item(1) == c.classList.item(1) 
  }
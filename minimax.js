let scores = {  
    'O': 10,
    'X': -10,
    'draw': 0
};

function equalsThree(a, b, c) {
  return a != '' && a == b && b == c ;
}

export function checkWinner(boardState) {
  //should always return either none, draw, O or X
  let winner = 'none';
  let emptySquares = 0;

  //diagonally RL
  if (equalsThree(boardState[0][0], boardState[1][1], boardState[2][2])) {
    winner = boardState[0][0];
  }

  //diagonally LR
  if (equalsThree(boardState[0][2], boardState[1][1], boardState[2][0])) {
    winner = boardState[0][2];
  }

  for (let i = 0; i<3; i++) {
    //horizontally
    if (equalsThree(boardState[i][0], boardState[i][1], boardState[i][2])) {
      winner = boardState[i][0];
    }

    //vertically
    if (equalsThree(boardState[0][i], boardState[1][i], boardState[2][i])) {
      winner = boardState[0][i];
    }

    //check for empty squares
    for (let j = 0; j<3; j++) {
      if (boardState[i][j] == '') {
        emptySquares++
      }
    }
  }
  
  if (emptySquares == 0 && winner == 'none') {
    winner = 'draw'
  }
  
  console.log(`winner is ${winner}`)
  return winner;
}

export function bestMove(board) {
  console.log("calculating best move..")
  console.log(board)
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {

      if (board[i][j] == '') {
        board[i][j] = 'O';
        let score = minimax(board, false, 0);
        board[i][j] = '';

        if (score > bestScore) {
          bestScore = score;
          move = {i, j};
        }
      }
    }
  }
  return move;
}

// function minimax(board, isMaximizing, depth) {
//   return 10
// }

function minimax(board, isMaximizing, depth) {
  console.log(`running minimax at depth ${depth}`)

  let result = checkWinner(board);

  if (result != 'none') {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // If spot is available, try spot
        if (board[i][j] == '') {
            board[i][j] = 'O';
          let score = minimax(board, false, depth + 1);
          board[i][j] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // If spot is available, try spot
        if (board[i][j] == '') {
            board[i][j] = 'X';
          let score = minimax(board, true, depth + 1);
          board[i][j] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

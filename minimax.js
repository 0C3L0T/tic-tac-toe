let scores = {  
    'O': 10,
    'X': -10,
    'draw': 0
};

function equalsThree(a, b, c) {
  return a != '' && a == b && b == c ;
}

export function checkWinner(board) {
  //should always return either none, draw, O or X
  let winner = 'none';
  let emptySquares = 0;

  //diagonally RL
  if (equalsThree(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }

  //diagonally LR
  if (equalsThree(board[0][2], board[1][1], board[2][0])) {
    winner = board[0][2];
  }

  for (let i = 0; i<3; i++) {
    //horizontally
    if (equalsThree(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }

    //vertically
    if (equalsThree(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }

    //check for empty squares
    for (let j = 0; j<3; j++) {
      if (board[i][j] == '') {
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

  let bestScore = -Infinity;
  let output = {
    'row' : null,
    'col' : null
  };

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {

      if (board[i][j] == '') {
        board[i][j] = 'O';
        let score = minimax(board, false, 0);
        board[i][j] = '';

        if (score > bestScore) {
          bestScore = score;
          output.row = i;
          output.col = j;
        }
      }
    }
  }
  return output;
  
}

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

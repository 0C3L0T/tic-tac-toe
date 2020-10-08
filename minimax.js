import { isEmpty, checkWinner, X_CLASS, O_CLASS, placeMark, removeMark } from "./interface2.js";

let scores = {
  'X': 10,
  'O': -10,
  'draw': 0
};

export default function bestMove(board) {
  let bestScore = -Infinity;
  let move = {};

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {

      if (isEmpty(board[i][j])) {
        placeMark(O_CLASS, i, j)
        let score = minimax(board, false, 0);
        removeMark()

        if (score > bestScore) {
          move.i = i;
          move.j = j
        }

      }
    }
  }
  return move;
}

function minimax(board, isMaximizing, depth) {
  console.log(`started minimax at depth ${depth}`)

  //if a result is found, return corresponding score
  let result = checkWinner();
  console.log(`result is ${result}`)



  if (result != null) {
    //scores doesn't have an index of cell
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // If spot is available, try spot
        if (isEmpty()) {
          placeMark()
          let score = minimax(board, false, depth + 1);
          removeMark()
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
        if (isEmpty()) {
          placeMark()
          let score = minimax(board, true, depth + 1);
          removeMark()
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
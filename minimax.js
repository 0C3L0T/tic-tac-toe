import {checkWinner, X_CLASS, O_CLASS, placeMark, removeMark} from "./interface2.js";

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

export default function minimax(board, isMaximizing, depth) {
  console.log(`started minimax at depth ${depth}`)
  
  //if a result is found, return corresponding score
  let result = checkWinner();
  if (result !== null || depth > 4) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // If spot is available, try spot
        if (board[i][j].classList.item(1) == undefined) {
          placeMark(O_CLASS, board[i][j])
          let score = minimax(board, false, depth + 1);
          removeMark(O_CLASS, board[i][j])
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
        if (board[i][j].classList.item(1) == undefined) {
          placeMark(X_CLASS, board[i][j])
          let score = minimax(board, true, depth + 1);
          removeMark(X_CLASS, board[i][j])
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
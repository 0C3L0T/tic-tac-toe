import {checkWinner, X_CLASS, O_CLASS, updateBoard} from "./interface2.js";



let scores = {
  X: 10,
  O: -10,
  draw: 0
}


//how do TS arrays work again?
export default function minimax(board, isMaximizing, depth) {

    let testBoard = board;

  //check if game has ended and return score
  let result = checkWinner();

  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i=0; i<3; i++) {
      for (let j=0; i<3; j++) {
        //if cell is empty, try spot
        if (board[i][j].classList.length === 1) {
          board[i][j].classList.add(O_CLASS);
          updateBoard()
          let score = minimax(board, false, depth + 1)
          board[i][j].classList.remove(O_CLASS);
          bestScore = Math.max(score, bestScore)
        }
      }
    }
    return bestScore;

 }
  // else {
  //   let bestScore = Infinity;
  //   for (let i=0; i<3; i++) {
  //     for (let j=0; i<3; j++) {
  //       //if cell is empty, try spot
  //       if (board[i][j].classList.length == 1) {
  //         board[i][j].classList.add(X_CLASS);
  //         updateBoard()
  //         let score = minimax(board, true, depth + 1)
  //         board[i][j].classList.remove(X_CLASS);
  //         bestScore = Math.min(score, bestScore)
  //       }
  //     }
  //   }
  //   return bestScore;
  // }     



}
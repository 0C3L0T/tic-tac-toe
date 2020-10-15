export let minimaxBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]
console.log(minimaxBoard)

let scores = {
  'O': 10,
  'X': -10,
  'draw': 0
};


function convertBoard(board) {
  // for i, j in board,run checkCell
  //write to minimaxBoard

  console.log("calling convertBoard..")
  console.log(minimaxBoard)
  for (let i; i<3; i++) {
    for (let j; j<3; i++) {
      console.log(checkCell(board[i][j]))
      //minimaxBoard[i][j] = checkCell(board[i][j]);

    }
  }
  console.log("board converted")
  console.log(minimaxBoard)

}

function checkCell(cell) {
  return ''
}

// function checkCell(cell) {
//   console.log(cell)
//   if (cell.classList.item(1) == 'X') {
//     return 'X';
//   } else if (cell.classList.item(1) == 'O') {
//     return 'O';
//   } else {
//     return '';
//   }

// }


//takes in board as array of arrays containing nodeElements, returns nodeElement
export function bestMove(board) {

  console.log("calling bestMove with ")
  console.log(board)
  convertBoard(board)

  let bestScore = -Infinity;
  let output = {};

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {

      if (minimaxBoard[i][j] == '') {
        minimaxBoard[i][j] = 'O';
        let score = minimax(minimaxBoard, false, 0);
        minimaxBoard[i][j] = '';

        if (score > bestScore) {
          bestScore = score;
          output = {i, j};
        }

      }
    }
  }
  console.log(`best move is ${output.i}, ${output.j}`)
  return output;
}

function minimax(minimaxBoard, isMaximizing, depth) {
  console.log(`started minimax at depth ${depth}`)


  let result = checkWinner();
  console.log(`result is ${checkWinner(minimaxBoard)}`)

  if (result !== null) {
    //scores doesn't have an index of cell
    console.log(`returning score ${scores[result]}`)
    return scores[result];

  }


  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // If spot is available, try spot
        if (minimaxBoard[i][j] == '') {
          minimaxBoard[i][j] = 'O';
          let score = minimax(minimaxBoard, false, depth + 1);
          minimaxBoard[i][j] = '';
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
        if (minimaxBoard[i][j] == '') {
          minimaxBoard[i][j] = 'X';
          let score = minimax(minimaxBoard, true, depth + 1);
          minimaxBoard[i][j] = 'X';
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

export function checkWinner() {
  let openSpots = 0;
  let winner = null;

  for(let i = 0; i<3; i++) {
    for(let j = 0; j<3; j++) {

      //check horizontal
      if(equal3(minimaxBoard[i][0], minimaxBoard[i][1], minimaxBoard[i][2])) {
        winner = minimaxBoard[i][0];
      }

      //check vertical
      if(equal3(minimaxBoard[0][j], minimaxBoard[1][j], minimaxBoard[2][j])) {
        winner = minimaxBoard[0][j];
      }

      //check diagonally LR
      if(equal3(minimaxBoard[0][0], minimaxBoard[1][1], minimaxBoard[2][2])) {
        winner = minimaxBoard[0][0];
      }

      //check diagonally RL
      if(equal3(minimaxBoard[0][2], minimaxBoard[1][1], minimaxBoard[2][0])) {
        winner = minimaxBoard[0][2];
      }

      if(minimaxBoard[i][j] == '') {
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

//check if are equal
function equal3(a,b,c) {
  return a != '' && a == b && b == c; 
}

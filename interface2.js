import minimax from "./minimax.js";

export const X_CLASS = "x";
export const O_CLASS = "O";

const cellElements = document.querySelectorAll("[data-cell]");
const resultMessageElement = document.getElementById('resultMessage');
const resultMessageTextElement = document.querySelector('[data-result-message-text]');
const restartButton = document.getElementById('restartButton');


//if restartbutton is pressed, execute initialize function
restartButton.addEventListener('click', initialize);

export let board = [];

initialize()

//clean board and add eventlisteners
function initialize() {
    
    resultMessageElement.classList.remove('show');
    console.log(`removing result message`);

    cellElements.forEach( cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', humanTurn)
        cell.addEventListener('click', humanTurn, {once: true})
    })
    console.log(`initialized`)

    computerTurn()
}






export function updateBoard() {
    //fill board array with 3 arrays, containing the corresponding three elements in the row
    board = []
    board = [
        [...cellElements].slice(0,3),
        [...cellElements].slice(3,6),
        [...cellElements].slice(6,9)
    ];
    console.log(`board array updated`)
    console.log(board)
    
}



function computerTurn() {
    console.log(`computer turn`)
    updateBoard()

    let move;

    //do the minimax, get as output a board index and place there the mark
    let bestScore = -Infinity;
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j].classList.item(1) == undefined) {
          placeMark(O_CLASS, board[i][j])
          let score = minimax(board, 0, false);
          removeMark(O_CLASS, board[i][j])
          if (score > bestScore) {
            move = {i:i, j:j}
          }

        }
      }
    }
    placeMark(O_CLASS, board[move.i][move.j])

    checkEnd()
}

//use input from eventlistener
function humanTurn(e) {
    console.log(`human turn`)

    let cell = e.target;

    placeMark(X_CLASS, cell)

    checkEnd()

    computerTurn()
}



//alow for both indexes as cell to be inputs
export function placeMark(currentClass, cell) {
    cell.classList.add(currentClass)
    cell.removeEventListener('click', humanTurn )
}

export function removeMark(currentClass, cell) {
  cell.classList.remove(currentClass)
  cell.addEventListener('click', humanTurn)
}

function checkEnd() {
    let result = checkWinner();
    if (result != null) {
        showWin(result);
    }
}

//check if game is draw or won, return draw or winning player and call showWin() with result
export function checkWinner() {
    let winner = null;
  
    // horizontal
    for (let i = 0; i < 3; i++) {
      if (equals3(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      }
    }
  
    // Vertical
    for (let i = 0; i < 3; i++) {
      if (equals3(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
    }
  
    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
    }
  
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j].classList.item(1) == undefined) {
          openSpots++;
        }
      }
    }
  
    if (winner == null && openSpots == 0) {
      return 'draw';
    } else {
      return winner;
    }
  }


function equals3(a, b, c) {
    return a == b && b == c && a != '';
}
  


//interface the result to the html
function showWin(result) {
    if (result == 'draw') {
        resultMessageTextElement.innerHTML = 'gelijkspel!';
    } else {
        resultMessageTextElement.innerHTML = `${result ? O_CLASS : X_CLASS} WINT`;
    }
    resultMessageElement.classList.add('show');
}
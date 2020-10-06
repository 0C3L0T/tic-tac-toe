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

  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', humanTurn)
    cell.addEventListener('click', humanTurn, { once: true })
  })
  console.log(`initialized`)

  computerTurn()
}



export function updateBoard() {
  //fill board array with 3 arrays, containing the corresponding three elements in the row
  //should consists of X, O or ''
  board = []
  
  console.log(`board array updated`)
  console.log(board)

}

function computerTurn() {
  console.log(`computer turn`)
  updateBoard()


  //do the minimax, get as output a board index and place there the mark
  let move = bestMove()

  placeMark()

  checkEnd()
}



//use input from eventlistener
function humanTurn(e) {
  console.log(`human turn`)

  let cell = e.target;

  placeMark()

  checkEnd()

  computerTurn()
}



//alow for both indexes as cell to be inputs
export function placeMark() {

  cellBoard[i][j].removeEventListener('click', humanTurn)
}

export function removeMark() {
  
  cellBoard[i][j].addEventListener('click', humanTurn)
}


export function isEmpty(cell) {

} 

function checkEnd() {
  let result = checkWinner();
  if (result != null) {
    showWin(result);
  }
}

//interface the result to the html
function showWin(result) {
  if (result == 'draw') {
    resultMessageTextElement.innerHTML = 'gelijkspel!';
  } else {
    resultMessageTextElement.innerHTML = `${result ? 'O' : 'X'} WINT`;
  }
  resultMessageElement.classList.add('show');
}


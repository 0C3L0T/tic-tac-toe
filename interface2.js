import minimax from "./minimax.js";
import checkWinner from "./checkWinner";

export const X_CLASS = "x";
export const O_CLASS = "O";

const cellElements = document.querySelectorAll("[data-cell]");
const resultMessageElement = document.getElementById('resultMessage');
const resultMessageTextElement = document.querySelector('[data-result-message-text]');
const restartButton = document.getElementById('restartButton');


//if restartbutton is pressed, execute initialize function
restartButton.addEventListener('click', initialize);

export let board = [];
let cells = [];

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
  cells = []

  cells = [
    [...cellElements].slice(0, 3),
    [...cellElements].slice(3, 6),
    [...cellElements].slice(6, 9)

  ]


  board = [];

  board = cells.forEach(array => {
    array.map(checkCell(cell))
  });


  console.log(`board array updated`)
  console.log(board)
}


function checkCell(cell) {
  if (cell.classList.contains('X')) {
    return 'X';
  } else if (cell.classList.contains('O')) {
    return 'O';
  } else {
    return '';
  }
}


function computerTurn() {
  console.log(`computer turn`)

  updateBoard()

  let move = bestMove(board);

  placeMark(O_CLASS, move.i, move.j)

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
export function placeMark(currentClass, i, j) {
  cell.classList.add(currentClass)
  cell.removeEventListener('click', humanTurn)
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

//interface the result to the html
function showWin(result) {
  if (result == 'draw') {
    resultMessageTextElement.innerHTML = 'gelijkspel!';
  } else {
    resultMessageTextElement.innerHTML = `${result ? 'O' : 'X'} WINT`;
  }
  resultMessageElement.classList.add('show');
}
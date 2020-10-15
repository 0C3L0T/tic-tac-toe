import  { bestMove, checkWinner} from "./src/minimax.js";
//import checkWinner from "./checkWinner.js";

export const X_CLASS = "X";
export const O_CLASS = "O";

const cellElements = document.querySelectorAll("[data-cell]");
const resultMessageElement = document.getElementById('resultMessage');
const resultMessageTextElement = document.querySelector('[data-result-message-text]');
const restartButton = document.getElementById('restartButton');


//if restartbutton is pressed, execute initialize function
restartButton.addEventListener('click', initialize);

let board = [
  [...cellElements].slice(0, 3),
  [...cellElements].slice(3, 6),
  [...cellElements].slice(6, 9)
]
export default board;


initialize()

//clean board and add eventlisteners
function initialize() {

  resultMessageElement.classList.remove('show');
  console.log(`removing result message`);

  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', humanTurn)
    cell.addEventListener('click', humanTurn)
  })
  console.log(`initialized`)

  //begin with computer turn
  computerTurn()
}

function computerTurn() {
  console.log(`computer turn`)


  let move = bestMove(board);
  board[move.i][move.j].removeEventListener('click', humanTurn)

  checkEnd()
}

//use input from eventlistener
function humanTurn(e) {
  console.log(`human turn`)

  let cell = e.target;
  console.log(cell)

  cell.classList.add(X_CLASS)
  cell.removeEventListener('click', humanTurn)

  checkEnd()

  computerTurn()
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
  } else  {
    resultMessageTextElement.innerHTML = `${result} WINT!`;
  }
  resultMessageElement.classList.add('show');
}


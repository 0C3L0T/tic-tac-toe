import {bestMove, checkWinner} from "./minimax.js"

const restartButton = document.getElementById('restartButton');
const cells = [
    [...document.querySelectorAll("[data-cell]")].slice(0,3),
    [...document.querySelectorAll("[data-cell]")].slice(3,6),
    [...document.querySelectorAll("[data-cell]")].slice(6,9)
];
const resultMessageElement = document.getElementById('resultMessage');
const resultMessageTextElement = document.querySelector('[data-result-message-text]');

restartButton.addEventListener('click', init);

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function drawBoard() {
    console.log('drawing board')
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] == 'X') {
                cells[row][col].className = 'cell ' + 'X';
                cells[row][col].removeEventListener('click', onCellClick);
            }
            else if (board[row][col] == 'O') {
                cells[row][col].className = 'cell ' + 'O';
                cells[row][col].removeEventListener('click', onCellClick);
            }
        }
    }
}

function init(){
    
    resultMessageElement.classList.remove('show');
    
    clearBoard()
    console.log(board)
    drawBoard()
    computerTurn()

}

function clearBoard(){
    //clear all onclickevents from cells
    //clear board array
    //add onclickevents to cells
    console.log('clearing board..')
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            board[row][col] = '';
            cells[row][col].className = 'cell';

            cells[row][col].setAttribute("data-row", row)
            cells[row][col].setAttribute("data-col", col)

            cells[row][col].removeEventListener('click', onCellClick);
            cells[row][col].addEventListener('click', onCellClick);
        }
    }
}

//minimax inmplementation, takes board and outputs best move
function computerTurn() {
    console.log('computer turn')
    let move = bestMove(board)
    //board[move.row][move.col] = 'O';

    //board[0][0] = 'O';
    // board[0][1] = 'O';
    // board[0][2] = 'X';
    // board[1][0] = 'X';
    // board[1][1] = 'X';
    // board[1][2] = 'O';
    // board[2][0] = 'O';
    // board[2][1] = 'O';
    // board[2][2] = 'X';
    //console.log(board)
    drawBoard()
    checkEnd()
}

//event handler
function onCellClick() {
    console.log('cell clicked')
    let  cellNode = this;

    //get row and col from cellNode
    var row = cellNode.dataset.row;
    var col = cellNode.dataset.col;

    board[row][col] = 'X';

    drawBoard()
    checkEnd()
    computerTurn()
}

function checkEnd() {
    let result = checkWinner(board);

    if (result != 'none') {
        if (result == 'draw') {
          resultMessageTextElement.innerHTML = 'gelijkspel!';
        } else  {
          resultMessageTextElement.innerHTML = `${result} WINT!`;
        }
        resultMessageElement.classList.add('show');
      }

}

init()
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var X_CLASS = 'x';
var CIRCLE_CLASS = 'circle';
var WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//very important
var board = document.getElementById('board');
var cellElements = document.querySelectorAll("[data-cell]");
var resultMessageElement = document.getElementById('resultMessage');
var resultMessageTextElement = document.querySelector('[data-result-message-text]');
var restartButton = document.getElementById('restartButton');
var computerTurn;
//start the game
startGame();
restartButton.addEventListener('click', startGame);
function startGame() {
    computerTurn = false;
    cellElements.forEach(function (cell) {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClassToX();
    resultMessageElement.classList.remove('show');
}
function handleClick(e) {
    //only for human player    
    var cell = e.target;
    //allow for non-computer play
    var currentClass = X_CLASS;
    placeMark(cell, currentClass);
    //check if game ends
    if (checkWin(X_CLASS)) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
    else {
        computerChoice(board);
    }
}
function computerChoice(board) {
    var bestMove = minimax(board);
    var currentClass = CIRCLE_CLASS;
    placeMark(bestMove, currentClass);
    //check if game ends
    if (checkWin(CIRCLE_CLASS)) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
    else {
        switchTurns();
    }
}
function endGame(draw) {
    if (draw) {
        resultMessageTextElement.innerHTML = 'gelijkspel!';
    }
    else {
        resultMessageTextElement.innerHTML = (computerTurn ? "O" : "X") + " WINT";
    }
    resultMessageElement.classList.add('show');
}
function isDraw() {
    return __spreadArrays(cellElements).every(function (cell) {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}
//this function can also be called in the engine to place computerChoice
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}
function switchTurns() {
    computerTurn = !computerTurn;
}
function setBoardHoverClassToX() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    board.classList.add(X_CLASS);
}
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(function (combination) {
        return combination.every(function (index) {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

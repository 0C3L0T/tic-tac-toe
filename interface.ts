const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//very important
const board = document.getElementById('board');
const cellElements = document.querySelectorAll("[data-cell]");
const resultMessageElement = document.getElementById('resultMessage');
const resultMessageTextElement = document.querySelector('[data-result-message-text]');
const restartButton = document.getElementById('restartButton');
let circleTurn: boolean;


//start the game
startGame()
restartButton.addEventListener('click', startGame)


function startGame() {
    circleTurn = false;

    cellElements.forEach( cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })

    setBoardHoverClass()
    resultMessageElement.classList.remove('show')
}




function handleClick(e) {
    //only for human player    
    const cell = e.target;

    //allow for non-computer play
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    placeMark(cell, currentClass)

    if(checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        switchTurns()
        setBoardHoverClass()
    }

}




function endGame(draw) {
    if (draw) {
        resultMessageTextElement.innerHTML = 'gelijkspel!'
    } else {
        resultMessageTextElement.innerHTML = `${circleTurn ? "O" : "X"} WINT`
    }
    resultMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    }) 
}

function isEmpty(cell) {

    return !cellElements[cell].classList.contains(CIRCLE_CLASS || X_CLASS)
}

//this function can also be called in the engine to place computerChoice
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}


function switchTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);

    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }
    else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
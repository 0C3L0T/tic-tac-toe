import { minimax } from "./minimax";

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
let computerTurn: boolean;



//start the game
startGame()
restartButton.addEventListener('click', startGame);


function startGame() {
    computerTurn = true;


    cellElements.forEach( cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })

    resultMessageElement.classList.remove('show');
}


function handleClick(e) {
    computerTurn = false;

    //only for human player, how to enable for computer play?    
    const cell = e.target;

    placeMark(cell, X_CLASS);


    //check for endgame
}

function computerChoice() {
    computerTurn = true;
    let bestScore = -Infinity;
    let bestMove;

    cellElements.forEach(cell => {
        if (cell.classList.length == 1) {
            let score = minimax(cellElements, true, 3)
            if (score > bestScore) {
                bestScore = score;
                bestMove = cell;
            }
        }
    })


    placeMark(bestMove, CIRCLE_CLASS);

    //check if game ends

}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    }) 
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


//check if the game is won or tied, return winning class or null
function checkWinner(currentClass): string {
    //return winner or draw as result

    if ([...cellElements].every(cell => {
        cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)})) {
        return 'draw';
    } 
    
    else if(WINNING_COMBINATIONS.some(combination => {
        combination.every(index => {
            cellElements[index].classList.contains(currentClass)
            })
        })) {
            return currentClass;
        }
    }
    

    //call endgame
}




//this function can also be called to place computerChoice
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}


function endGame(result) {
    if (result == 'draw') {
        resultMessageTextElement.innerHTML = 'gelijkspel!';
    } else {
        resultMessageTextElement.innerHTML = `${computerTurn ? "O" : "X"} WINT`;
    }
    resultMessageElement.classList.add('show');
}
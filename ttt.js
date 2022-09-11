const gameMove = (event) => {
    if (!event.target.innerText) {

        // fill clicked square with X or O
        if (turnCounter % 2 !== 0) {
            event.target.innerText = 'X'
            turnState.innerText = 'O To Move'
            checkVictory('X')
        }
         else {
            event.target.innerText = 'O'
            turnState.innerText = 'X To Move'
            checkVictory('O')
        }

        // update turn counter and check draws
        turnCounter += 1
        if (turnCounter >= 10 && victory === false) {
            turnState.innerText = "Draw! Time to RESTART."
        }
        else if (computerPlayer) {
            computerMove()
        }
    }
}

async function computerMove() {
    // illusion of calculation
    for (i = 0; i < allSquares.length; i++) {
        if (!allSquares[i].innerText) {
            allSquares[i].innerText = '...'
        }
    }
    await sleep(500)
    for (i = 0; i < allSquares.length; i++) {
        if (allSquares[i].innerText === '...') {
            allSquares[i].innerText = '..'
        }
    }
    await sleep(500)
    for (i = 0; i < allSquares.length; i++) {
        if (allSquares[i].innerText === '..') {
            allSquares[i].innerText = '.'
        }
    }
    await sleep(500)
    for (i = 0; i < allSquares.length; i++) {
        if (allSquares[i].innerText === '.') {
            allSquares[i].innerText = ''
        }
    }

    // generate possible moves
    let moves = []
    for (i = 0; i < allSquares.length; i++) {
        if (!allSquares[i].innerText) {
            moves.push(i)
        }
    }

    // fill computer square with X or O
    if (turnCounter % 2 !== 0) {
        allSquares[moves[Math.floor(Math.random()*moves.length)]].innerText = 'X'
        turnState.innerText = 'O To Move'
        checkVictory('X')
    }
     else {
        allSquares[moves[Math.floor(Math.random()*moves.length)]].innerText = 'O'
        turnState.innerText = 'X To Move'
        checkVictory('O')
    }

    // update turn counter and check draws
    turnCounter += 1
    if (turnCounter >= 10 && victory === false) {
        turnState.innerText = "Draw! Time to RESTART."
    }
}

// JS sleep function I found on the internet
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const checkVictory = (player) => {
    if (
    (allSquares[0].innerText && allSquares[0].innerText === allSquares[1].innerText && allSquares[0].innerText === allSquares[2].innerText) ||
    (allSquares[3].innerText && allSquares[3].innerText === allSquares[4].innerText && allSquares[3].innerText === allSquares[5].innerText) ||
    (allSquares[6].innerText && allSquares[6].innerText === allSquares[7].innerText && allSquares[6].innerText === allSquares[8].innerText) ||
    (allSquares[0].innerText && allSquares[0].innerText === allSquares[3].innerText && allSquares[0].innerText === allSquares[6].innerText) ||
    (allSquares[1].innerText && allSquares[1].innerText === allSquares[4].innerText && allSquares[1].innerText === allSquares[7].innerText) ||
    (allSquares[2].innerText && allSquares[2].innerText === allSquares[5].innerText && allSquares[2].innerText === allSquares[8].innerText) ||
    (allSquares[0].innerText && allSquares[0].innerText === allSquares[4].innerText && allSquares[0].innerText === allSquares[8].innerText) ||
    (allSquares[2].innerText && allSquares[2].innerText === allSquares[4].innerText && allSquares[2].innerText === allSquares[6].innerText))
    {
        // disable empty squares
        for (i = 0; i < allSquares.length; i++) {
            if (!allSquares[i].innerText) {
                allSquares[i].innerText = '-'
            }
        }

        // display winner
        turnState.innerText = `${player}'s Win!`

        // update score
        if (turnCounter % 2 !== 0) {
            xWins += 1
            scoreBoard[0].innerText = xWins
        }
        else {
            oWins += 1
            scoreBoard[1].innerText = oWins
        }

        victory = true
    }
}

// RESTART button function, empty squares and reset turn counter
const reset = () => {
    for (i = 0; i < allSquares.length; i++) {
        allSquares[i].innerText = ""
    }
    turnState.innerText = 'X To Move'
    turnCounter = 1
    victory = false
    computerPlayer = ''
    computerIsX.disabled = false
    computerIsO.disabled = false
}

// NECESSARY DECLARATIONS
let turnCounter = 1

let allSquares = document.getElementsByClassName('square')

let restart = document.getElementById('restart')

let computerIsX = document.getElementById('compIsX')
let computerIsO = document.getElementById('compIsO')

let turnState = document.getElementById('turnState')

let xWins = 0
let oWins = 0

let scoreBoard = [document.getElementById('xWins'), document.getElementById('oWins')]

let victory = false

let computerPlayer = ''

restart.addEventListener('click', reset)
turnState.innerText = 'X To Move'

// EVENT LISTENERS
computerIsX.addEventListener('click', () => {
    if (!computerPlayer && turnCounter === 1) {
        computerPlayer = 'X'
        computerIsX.disabled = true
        computerIsO.disabled = true
        computerMove()
    }
})

computerIsO.addEventListener('click', () => {
    if (!computerPlayer && turnCounter === 1) {
        computerPlayer = 'O'
        computerIsX.disabled = true
        computerIsO.disabled = true
    }
})

for (i = 0; i < allSquares.length; i++) {
    allSquares[i].addEventListener('click', gameMove)
}
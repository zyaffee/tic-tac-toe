const gameMove = (event) => {
    // disable computer toggle buttons just in case
    if (turnCounter === 1) {
        computerIsX.disabled = true
        computerIsO.disabled = true
    }

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

        // update turn counter and check draws, then play computer move if applicable
        turnCounter += 1
        if (turnCounter >= 10 && victory === false) {
            turnState.innerText = "Draw! Time to RESTART."
        } else
        if (computerPlayer && victory === false) {
            computerMove()
            console.log("Major Weirdness")
        }
    }
}

async function computerMove() {
    // illusion of calculation, major error source due to async
    for (i = 0; i < allSquares.length; i++) {
        if (!allSquares[i].innerText) {
            allSquares[i].innerText = '...'
        }
    }
    await sleep(1000 - turnCounter*90)
    for (i = 0; i < allSquares.length; i++) {
        if (allSquares[i].innerText === '...') {
            allSquares[i].innerText = '..'
        }
    }
    await sleep(1000 - turnCounter*90)
    for (i = 0; i < allSquares.length; i++) {
        if (allSquares[i].innerText === '..') {
            allSquares[i].innerText = '.'
        }
    }
    await sleep(1100 - turnCounter*90)
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
    // big dumb check if the game's been won operation
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
        // disable empty squares if gameover
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

// RESTART button
const reset = () => {
    turnState.innerText = 'X To Move'
    turnCounter = 1
    victory = false
    computerPlayer = ''
    computerIsX.disabled = false
    computerIsO.disabled = false
    for (i = 0; i < allSquares.length; i++) {
        allSquares[i].innerText = ""
    }
}

// turn counter
let turnCounter = 1

// create document objects
let allSquares = document.getElementsByClassName('square')
let restart = document.getElementById('restart')
let computerIsX = document.getElementById('compIsX')
let computerIsO = document.getElementById('compIsO')
let turnState = document.getElementById('turnState')

// scoring stuff
let xWins = 0
let oWins = 0
let scoreBoard = [document.getElementById('xWins'), document.getElementById('oWins')]

// victory flag used to turn off computerMove and check draws
let victory = false

// tracks if the computer is playing, if X or O
let computerPlayer = ''

// a helpful hint
turnState.innerText = 'X To Move'

// EVENT LISTENERS
// play against computer X's button
computerIsX.addEventListener('click', () => {
    if (!computerPlayer && turnCounter === 1) {
        computerPlayer = 'X'
        computerIsX.disabled = true
        computerIsO.disabled = true
        computerMove()
    }
})

// play against computer O's button
computerIsO.addEventListener('click', () => {
    if (!computerPlayer && turnCounter === 1) {
        computerPlayer = 'O'
        computerIsX.disabled = true
        computerIsO.disabled = true
    }
})

// adds listeners to all squares
for (i = 0; i < allSquares.length; i++) {
    allSquares[i].addEventListener('click', gameMove)
}

// the restart button
restart.addEventListener('click', reset)
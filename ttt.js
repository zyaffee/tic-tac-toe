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
        if (turnCounter >= 10) {
            turnState.innerText = "Draw! Time to RESTART."
        }
    }
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
        turnState.innerText = `${player}'s Win!`
    }
}

// RESTART button function, empty squares and reset turn counter
const reset = () => {
    for (i = 0; i < allSquares.length; i++) {
        allSquares[i].innerText = ""
    }
    turnState.innerText = 'X To Move'
    turnCounter = 1
}

let turnCounter = 1

let allSquares = document.getElementsByClassName('square')

let restart = document.getElementById('restart')

let turnState = document.getElementById('turnState')

restart.addEventListener('click', reset)

turnState.innerText = 'X To Move'

for (i = 0; i < allSquares.length; i++) {
    allSquares[i].addEventListener('click', gameMove)
}
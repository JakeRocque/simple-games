const squares = Array.from(document.getElementsByClassName('square'));
const messageText = document.getElementById('turn-text');
const resetButton = document.getElementById('resetButton')

let board = ['', '', '', '', '', '', '', '', ''];
let turnX = true;
let isWin = false;
let isTie = false;

let colorAnimationOn = false;
let textColorAnimator;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

squares.forEach(square => {
    square.addEventListener('click', handleClick);
})
resetButton.addEventListener('click', resetBoard);


function handleClick(event) {
    if (!isWin && !isTie) {
        const cell = event.target;
        const index = squares.indexOf(cell);
        
        if (board[index] == '') {
            currentPlayer = turnX ? 'X' : 'O';

            board[index] = currentPlayer;
            cell.innerHTML = currentPlayer;

            checkWin(winConditions, currentPlayer);
            if (isWin) {
                return
            }

            checkTie()
            if (isTie) {
                return
            }

            changeTurn(turnX);
            turnX = !turnX;
        }
    }
}

function changeTurn(playerTurn) {
    nextPlayer = playerTurn ? 'O' : 'X';
    messageText.innerHTML = `${nextPlayer}\'s turn`;
}

function checkWin(winConditions, currentPlayer) {
    let currentBoard = [];
    for (let i=0; i < board.length; i++) {
        if (board[i] == currentPlayer) {
            currentBoard.push(i);
        }    
    }
    for (let i=0; i < winConditions.length; i++) {
        isWin = true;
        const winCondition = winConditions[i];
        for (let j=0; j < winCondition.length; j++) {
            if (!currentBoard.includes(winCondition[j])) {
                isWin = false;
                break;
            }
        }
        if (isWin) {
        messageText.innerHTML = `${currentPlayer} wins!`;
        startColorAnimation(messageText, 6)
        break;
        }
    }
}

function checkTie() {
    isTie = true;
    for (cell of board) {
        if (cell == '') {
            isTie = false;
            break;
        }
    }
    if (isTie) {
        messageText.innerHTML = 'Tie';
    }
}

function resetBoard() {
    turnX = true;
    board = ['', '', '', '', '', '', '', '', ''];

    for (square of squares) {
        square.innerHTML = '';
    }
    changeTurn(!turnX);
    messageText.style.color = 'white';

    isWin = false;
    isTie = false;

    stopColorAnimation()
}

function animateTextColor(text, interval) {
    let red = 255
    let green = 255
    let blue = 255
    let increasing = false

    const textColorAnimator = setInterval(() => {
        if (red >= 255) {
            increasing = false;
        } else if (red <= 0) {
            increasing = true;
        }

        red += increasing ? 1 : -1;
        green += increasing ? 1 : -1;
        blue += increasing ? 1 : -1;

        text.style.color = `rgb(${red}, ${green}, ${blue})`;

    
    }, interval);

    return textColorAnimator;
}

function startColorAnimation(text, interval) {
    textColorAnimator = animateTextColor(text, interval);
}

function stopColorAnimation() {
    clearInterval(textColorAnimator);
}
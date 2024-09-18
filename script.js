const board = document.getElementById('board');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart-button');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
const handleCellClick = (e) => {
    const cellIndex = e.target.getAttribute('data-index');

    if (boardState[cellIndex] !== '' || !isGameActive) return;

    updateCell(e.target, cellIndex);
    checkForWinnerOrDraw();
};

// Update cell
const updateCell = (cell, index) => {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);  // Add color based on current player
    cell.style.pointerEvents = 'none';
};

// Check for winner or draw
const checkForWinnerOrDraw = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            highlightWinningCells([a, b, c]);
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = `Player ${currentPlayer} has won!`;
        isGameActive = false;
        gameStatus.style.color='red'
        return;
    }

    if (!boardState.includes('')) {
        gameStatus.textContent = `It's a draw!`;
        gameStatus.style.color='red'

        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
};

// Highlight winning cells
const highlightWinningCells = (winningCells) => {
    winningCells.forEach(index => {
        cells[index].style.backgroundColor = '#90ee90';  // Light green for the winning cells
    });
};

// Restart game
const restartGame = () => {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    gameStatus.textContent = "Player X's turn";
    gameStatus.style.color='black'

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
        cell.style.backgroundColor = '';  // Reset background color
        cell.style.pointerEvents = 'auto';
    });
};

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

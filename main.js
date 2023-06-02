// Create the game board HTML
function createBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';

  for (let row = 0; row < Minesweeper.size; row++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < Minesweeper.size; col++) {
      const td = document.createElement('td');
      td.addEventListener('click', () => {
        Minesweeper.revealCell(row, col);
        updateBoard();
        checkGameOver();
      });
      tr.appendChild(td);
    }
    boardElement.appendChild(tr);
  }
}

// Handle restart button click
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
  Minesweeper.start();
  updateBoard();
  hideMessage();
});

// Update the board on the HTML
function updateBoard() {
  const cells = document.getElementsByTagName('td');
  for (let row = 0; row < Minesweeper.size; row++) {
    for (let col = 0; col < Minesweeper.size; col++) {
      const cellIndex = row * Minesweeper.size + col;
      const cell = cells[cellIndex];
      const boardCell = Minesweeper.board[row][col];
      if (boardCell.isRevealed) {
        if (boardCell.isMine) {
          cell.textContent = 'X';
          cell.style.backgroundColor = 'red';
        } else {
          cell.textContent = boardCell.neighborMines;
          cell.style.backgroundColor = 'lightgray';
        }
      } else {
        cell.textContent = '';
        cell.style.backgroundColor = 'white';
      }
    }
  }
}

// Show a message on the page
function showMessage(message) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
  messageElement.style.display = 'block';
}

// Hide the message on the page
function hideMessage() {
  const messageElement = document.getElementById('message');
  messageElement.style.display = 'none';
}

// Check if the game is over
function checkGameOver() {
  if (Minesweeper.gameOver) {
    showMessage('Game over! You hit a mine.');
  }
}

// Start the game and create the initial board
Minesweeper.start();
createBoard();


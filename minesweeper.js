// Define the Minesweeper game object
const Minesweeper = {
  board: [],
  size: 10,
  mines: 10,
  gameOver: false,

  // Initialize the game board
  initializeBoard() {
    this.board = [];
    for (let row = 0; row < this.size; row++) {
      this.board[row] = [];
      for (let col = 0; col < this.size; col++) {
        this.board[row][col] = {
          isMine: false,
          isRevealed: false,
          neighborMines: 0
        };
      }
    }
  },

  // Place mines randomly on the board
  placeMines() {
    let minesToPlace = this.mines;
    while (minesToPlace > 0) {
      const row = Math.floor(Math.random() * this.size);
      const col = Math.floor(Math.random() * this.size);

      if (!this.board[row][col].isMine) {
        this.board[row][col].isMine = true;
        minesToPlace--;
      }
    }
  },

  // Count the number of neighboring mines for each cell
  countNeighborMines() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (!this.board[row][col].isMine) {
          let count = 0;

          // Check the 8 neighboring cells
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = row + i;
              const newCol = col + j;

              if (
                newRow >= 0 &&
                newRow < this.size &&
                newCol >= 0 &&
                newCol < this.size &&
                this.board[newRow][newCol].isMine
              ) {
                count++;
              }
            }
          }

          this.board[row][col].neighborMines = count;
        }
      }
    }
  },

  // Reveal a cell on the board
  revealCell(row, col) {
    if (
      row >= 0 &&
      row < this.size &&
      col >= 0 &&
      col < this.size &&
      !this.board[row][col].isRevealed &&
      !this.gameOver
    ) {
      this.board[row][col].isRevealed = true;

      if (this.board[row][col].isMine) {
        this.gameOver = true;
        console.log('Game over! You hit a mine.');
      } else if (this.board[row][col].neighborMines === 0) {
        this.revealNeighborCells(row, col);
      }
    }
  },

  // Reveal neighboring cells recursively
  revealNeighborCells(row, col) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;

        if (
          newRow >= 0 &&
          newRow < this.size &&
          newCol >= 0 &&
          newCol < this.size &&
          !this.board[newRow][newCol].isRevealed
        ) {
          this.revealCell(newRow, newCol);
        }
      }
    }
  },

  // Print the game board to the console
  printBoard() {
    for (let row = 0; row < this.size; row++) {
      let rowStr = '';
      for (let col = 0; col < this.size; col++) {
        if (this.board[row][col].isRevealed) {
          if (this.board[row][col].isMine) {
            rowStr += 'X ';
          } else {
            rowStr += this.board[row][col].neighborMines + ' ';
          }
        } else {
          rowStr += '_ ';
        }
      }
      console.log(rowStr);
    }
  },

  // Start the game
  start() {
    this.initializeBoard();
    this.placeMines();
    this.countNeighborMines();
    this.gameOver = false;
    console.log('Welcome to Minesweeper!');
    this.printBoard();
  }
};

// Start the game
Minesweeper.start();


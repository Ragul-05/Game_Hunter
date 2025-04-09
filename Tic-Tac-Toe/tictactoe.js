var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;
var xWins = 0;
var oWins = 0;
const gameName = "tic-tac-toe"; // Matches data-game in index.html

window.onload = function() {
    setGame();
    loadHighScore(); // Load high score on start
    document.getElementById("reset-btn").addEventListener("click", resetGame);
}

function setGame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    document.getElementById("board").innerHTML = ""; // Clear previous board
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.innerText = "";
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') {
        return;
    }

    board[r][c] = currPlayer;
    this.innerText = currPlayer;

    // Change players
    if (currPlayer == playerO) {
        currPlayer = playerX;
    } else {
        currPlayer = playerO;
    }

    checkWinner();
}

function checkWinner() {
    let winner = null;

    // Horizontally
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            winner = board[r][0];
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            break;
        }
    }

    // Vertically
    if (!winner) {
        for (let c = 0; c < 3; c++) {
            if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' ') {
                winner = board[0][c];
                for (let i = 0; i < 3; i++) {
                    let tile = document.getElementById(i.toString() + "-" + c.toString());
                    tile.classList.add("winner");
                }
                gameOver = true;
                break;
            }
        }
    }

    // Diagonally
    if (!winner) {
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
            winner = board[0][0];
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
        }
    }

    // Anti-diagonally
    if (!winner) {
        if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
            winner = board[0][2];
            document.getElementById("0-2").classList.add("winner");
            document.getElementById("1-1").classList.add("winner");
            document.getElementById("2-0").classList.add("winner");
            gameOver = true;
        }
    }

    // Check for draw
    if (!winner && !board.flat().includes(' ')) {
        gameOver = true;
    }

    if (gameOver) {
        if (winner == playerX) {
            xWins++;
            document.getElementById("x-wins").innerText = `X Wins: ${xWins}`;
        } else if (winner == playerO) {
            oWins++;
            document.getElementById("o-wins").innerText = `O Wins: ${oWins}`;
        }
        updateHighScore(); // Update high score after game ends
        document.getElementById("reset-btn").style.display = "block"; // Show reset button
    }
}

function resetGame() {
    gameOver = false;
    currPlayer = playerO;
    setGame();
    document.getElementById("reset-btn").style.display = "none"; // Hide reset button
}

// Load high score from localStorage
function loadHighScore() {
    const highScore = localStorage.getItem(`highScore_${gameName}`) || 0;
    document.getElementById("high-score").innerText = `High Score: ${highScore}`;
    console.log(`Loaded high score for ${gameName}: ${highScore}`); // Debug
}

// Update high score in localStorage
function updateHighScore() {
    const highScore = localStorage.getItem(`highScore_${gameName}`) || 0;
    const maxWins = Math.max(xWins, oWins); // Use the higher win count
    if (maxWins > highScore) {
        localStorage.setItem(`highScore_${gameName}`, maxWins);
        document.getElementById("high-score").innerText = `High Score: ${maxWins}`;
        console.log(`Updated high score for ${gameName}: ${maxWins}`); // Debug
    }
}
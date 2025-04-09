//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 

//players
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
    x: 10,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: 0
};

let player2 = {
    x: boardWidth - playerWidth - 10,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: 0
};

//ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: 1,
    velocityY: 2
};

let player1Score = 0;
let player2Score = 0;
const gameName = "pong"; // Matches data-game in index.html

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // Draw initial player1
    context.fillStyle = "skyblue";
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);

    // Load high score
    loadHighScore();

    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer);
    document.addEventListener("keydown", startMovePlayer); // Added for continuous movement
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // Player1
    context.fillStyle = "skyblue";
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);

    // Player2
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, playerWidth, playerHeight);

    // Ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ballWidth, ballHeight);

    if (ball.y <= 0 || (ball.y + ballHeight >= boardHeight)) {
        ball.velocityY *= -1;
    }

    // Bounce the ball back
    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) {
            ball.velocityX *= -1;
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) {
            ball.velocityX *= -1;
        }
    }

    // Game over / Score
    if (ball.x < 0) {
        player2Score++;
        updateHighScore(); // Update high score when player2 scores
        resetGame(1);
    }
    else if (ball.x + ballWidth > boardWidth) {
        player1Score++;
        updateHighScore(); // Update high score when player1 scores
        resetGame(-1);
    }

    // Score and High Score display
    context.font = "45px sans-serif";
    context.fillStyle = "white";
    context.fillText(player1Score, boardWidth / 5, 45);
    context.fillText(player2Score, boardWidth * 4 / 5 - 45, 45);
    context.font = "20px sans-serif";
    context.fillText(`High Score: ${localStorage.getItem(`highScore_${gameName}`) || 0}`, boardWidth / 2 - 60, 80);

    // Draw dotted line down the middle
    for (let i = 10; i < board.height; i += 25) {
        context.fillRect(board.width / 2 - 10, i, 5, 5);
    }
}

function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

function startMovePlayer(e) {
    // Player1
    if (e.code == "KeyW") {
        player1.velocityY = -3;
    }
    else if (e.code == "KeyS") {
        player1.velocityY = 3;
    }

    // Player2
    if (e.code == "ArrowUp") {
        player2.velocityY = -3;
    }
    else if (e.code == "ArrowDown") {
        player2.velocityY = 3;
    }
}

function movePlayer(e) {
    // Stop movement when key is released
    if (e.code == "KeyW" || e.code == "KeyS") {
        player1.velocityY = 0;
    }
    if (e.code == "ArrowUp" || e.code == "ArrowDown") {
        player2.velocityY = 0;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function resetGame(direction) {
    ball = {
        x: boardWidth / 2,
        y: boardHeight / 2,
        width: ballWidth,
        height: ballHeight,
        velocityX: direction,
        velocityY: 2
    };
}

// Load high score from localStorage
function loadHighScore() {
    const highScore = localStorage.getItem(`highScore_${gameName}`) || 0;
    console.log(`Loaded high score for ${gameName}: ${highScore}`);
}

// Update high score in localStorage
function updateHighScore() {
    const highScore = localStorage.getItem(`highScore_${gameName}`) || 0;
    const maxPlayerScore = Math.max(player1Score, player2Score); // Use the higher score
    if (maxPlayerScore > highScore) {
        localStorage.setItem(`highScore_${gameName}`, maxPlayerScore);
        console.log(`Updated high score for ${gameName}: ${maxPlayerScore}`);
    }
}
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];
var score = 0; // Track score based on snake length

//food
var foodX;
var foodY;

var gameOver = false;
const gameName = "snake"; // Matches data-game in index.html

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    loadHighScore(); // Load high score on start
    setInterval(update, 1000 / 10); // 100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score = snakeBody.length; // Update score based on snake length
        document.getElementById("score").innerText = `Score: ${score}`;
        updateHighScore(); // Update high score when food is eaten
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Game over conditions
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
        updateHighScore(); // Update high score on game over
        alert("Game Over - Press OK to Restart");
        resetGame();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            updateHighScore(); // Update high score on game over
            alert("Game Over - Press OK to Restart");
            resetGame();
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function resetGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    score = 0;
    gameOver = false;
    document.getElementById("score").innerText = `Score: ${score}`;
    loadHighScore(); // Reload high score on reset
    placeFood();
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
    if (score > highScore) {
        localStorage.setItem(`highScore_${gameName}`, score);
        document.getElementById("high-score").innerText = `High Score: ${score}`;
        console.log(`Updated high score for ${gameName}: ${score}`); // Debug
    }
}
let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
const gameName = "whac-a-mole"; // Matches data-game in index.html

window.onload = function() {
    setGame();
    loadHighScore(); // Load high score on start
    document.getElementById("reset-btn").addEventListener("click", resetGame);
}

function setGame() {
    document.getElementById("board").innerHTML = ""; // Clear previous board
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000); // Every 1 second
    setInterval(setPlant, 2000); // Every 2 seconds
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = `Score: ${score}`;
        updateHighScore(); // Update high score when mole is hit
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = `GAME OVER: ${score}`;
        gameOver = true;
        updateHighScore(); // Update high score on game over
        document.getElementById("reset-btn").style.display = "block"; // Show reset button
    }
}

function resetGame() {
    score = 0;
    gameOver = false;
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("reset-btn").style.display = "none"; // Hide reset button
    setGame(); // Restart the game
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
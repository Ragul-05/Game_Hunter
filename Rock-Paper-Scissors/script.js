var you;
var yourScore = 0;
var opponent;
var opponentScore = 0;

var choices = ["rock", "paper", "scissors"];
const gameName = "rock-paper-scissors"; // Matches data-game in homepage index.html

window.onload = function() {
    for (let i = 0; i < 3; i++) {
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = choices[i] + ".png";
        choice.addEventListener("click", selectChoice);
        document.getElementById("choices").append(choice);
    }
    // Load high score on start
    loadHighScore();
}

function selectChoice() {
    you = this.id;
    document.getElementById("your-choice").src = you + ".png";

    // Random for opponent
    opponent = choices[Math.floor(Math.random() * 3)];
    document.getElementById("opponent-choice").src = opponent + ".png";

    // Check for winner
    if (you == opponent) {
        yourScore += 1;
        opponentScore += 1;
    }
    else {
        if (you == "rock") {
            if (opponent == "scissors") {
                yourScore += 1;
            }
            else if (opponent == "paper") {
                opponentScore += 1;
            }
        }
        else if (you == "scissors") {
            if (opponent == "paper") {
                yourScore += 1;
            }
            else if (opponent == "rock") {
                opponentScore += 1;
            }
        }
        else if (you == "paper") {
            if (opponent == "rock") {
                yourScore += 1;
            }
            else if (opponent == "scissors") {
                opponentScore += 1;
            }
        }
    }

    document.getElementById("your-score").innerText = yourScore;
    document.getElementById("opponent-score").innerText = opponentScore;
    updateHighScore(); // Update high score after each round
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
    if (yourScore > highScore) {
        localStorage.setItem(`highScore_${gameName}`, yourScore);
        document.getElementById("high-score").innerText = `High Score: ${yourScore}`;
        console.log(`Updated high score for ${gameName}: ${yourScore}`); // Debug
    }
}
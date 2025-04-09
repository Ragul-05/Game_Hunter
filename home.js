document.addEventListener("DOMContentLoaded", () => {
    // Function to update high scores on the homepage
    function updateHighScores() {
        console.log("Running updateHighScores..."); // Debug: Confirm function runs
        const gameCards = document.querySelectorAll(".game-card");
        console.log(`Found ${gameCards.length} game cards`); // Debug: Verify cards are found
        gameCards.forEach(card => {
            const gameName = card.getAttribute("data-game");
            const scoreElement = card.querySelector(".score");
            const highScore = localStorage.getItem(`highScore_${gameName}`) || 0;
            console.log(`Game: ${gameName}, High Score: ${highScore}`); // Debug: Check each score
            if (scoreElement) {
                scoreElement.textContent = highScore;
            } else {
                console.error(`Score element not found for ${gameName}`); // Debug: Catch missing elements
            }
        });
    }

    // Initial load of high scores
    updateHighScores();

    // Listen for page refresh or revisit (optional, for debugging)
    window.addEventListener("focus", () => {
        console.log("Page focused, refreshing high scores..."); // Debug
        updateHighScores();
    });

    // Optional: Log navigation (for debugging)
    const playLinks = document.querySelectorAll(".play-link");
    playLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            console.log(`Navigating to ${link.getAttribute("href")}`);
        });
    });
});
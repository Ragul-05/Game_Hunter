// Optional: Add any additional interactivity here if needed
document.addEventListener("DOMContentLoaded", () => {
    const playLinks = document.querySelectorAll(".play-link");

    playLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            console.log(`Navigating to ${link.getAttribute("href")}`);
        });
    });
});
// Function to fetch sentiment and countdown from the server
async function getSentiment() {
    const response = await fetch('http://localhost:3000/api/sentiment'); // Update with live API URL
    const data = await response.json();

    const sentiment = data.sentiment;
    const timeLeft = data.timeLeft;

    // Display sentiment on the webpage
    document.getElementById("sentiment").textContent = sentiment;
    document.body.style.backgroundColor = sentiment === "Bullish" ? "green" : "red";

    // Display countdown
    const countdownDisplay = document.getElementById("countdown-display");
    countdownDisplay.textContent = `Time remaining: ${timeLeft} seconds`;

    // Trigger confetti for Bullish sentiment
    if (sentiment === "Bullish") {
        startConfetti();
}

// Call the API to get sentiment when the page loads
getSentiment();

// Confetti function (assuming it's already set up with a library like confetti.js)
function startConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}

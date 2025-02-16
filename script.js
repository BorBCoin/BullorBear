// Array of sentiments
const sentiments = ["Bullish", "Bearish"];

// Function to randomly choose a sentiment using Crypto API
function getSentiment() {
    const randomIndex = new Uint32Array(1);
    window.crypto.getRandomValues(randomIndex);
    const index = randomIndex[0] % sentiments.length;
    return sentiments[index];
}

// Function to check if 60 seconds have passed since last sentiment change
function hasOneMinutePassed(lastUpdatedTime) {
    const currentTime = Date.now();
    return currentTime - lastUpdatedTime >= 60000;
}

// Function to update sentiment and store the timestamp
function updateSentiment() {
    const sentimentElement = document.getElementById("sentiment");
    const sentiment = getSentiment();

    sentimentElement.textContent = sentiment;
    sentimentElement.style.color = "#FFD700";

    // Store sentiment and timestamp
    localStorage.setItem("sentiment", sentiment);
    localStorage.setItem("lastUpdatedTime", Date.now());

    console.log(`Sentiment: ${sentiment} | Updated at: ${new Date().toLocaleTimeString()}`);

    document.body.style.backgroundColor = sentiment === "Bullish" ? "green" : "red";

    if (sentiment === "Bullish") {
        startConfetti();
    }
}

// Function to update the countdown timer
let countdownInterval;
function updateCountdown() {
    const lastUpdatedTime = parseInt(localStorage.getItem("lastUpdatedTime"), 10);
    if (isNaN(lastUpdatedTime)) return;

    function calculateRemainingTime() {
        const elapsedTime = Math.floor((Date.now() - lastUpdatedTime) / 1000);
        return Math.max(60 - elapsedTime, 0);
    }

    const countdownDisplay = document.getElementById("countdown-display");

    function updateDisplay() {
        let countdown = calculateRemainingTime();
        countdownDisplay.textContent = `Time remaining: ${countdown} seconds`;

        if (countdown === 0) {
            updateSentiment(); 
            updateCountdown(); 
        }
    }

    updateDisplay();

    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(updateDisplay, 1000);
}

// Confetti function (assuming it's already set up with a library like confetti.js)
function startConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}

// Sync sentiment and timer across all pages
window.addEventListener("storage", function(event) {
    if (event.key === "sentiment" || event.key === "lastUpdatedTime") {
        const sentiment = localStorage.getItem("sentiment");
        document.getElementById("sentiment").textContent = sentiment;
        document.body.style.backgroundColor = sentiment === "Bullish" ? "green" : "red";
        updateCountdown();
    }
});

// Initialize on page load
window.onload = function () {
    const sentiment = localStorage.getItem("sentiment");
    const lastUpdatedTime = parseInt(localStorage.getItem("lastUpdatedTime"), 10);

    if (!sentiment || isNaN(lastUpdatedTime) || hasOneMinutePassed(lastUpdatedTime)) {
        updateSentiment();
    } else {
        document.getElementById("sentiment").textContent = sentiment;
        document.body.style.backgroundColor = sentiment === "Bullish" ? "green" : "red";
    }

    updateCountdown();
};

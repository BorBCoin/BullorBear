// Array of sentiments
const sentiments = ["Bullish", "Bearish"];

// Function to randomly choose a sentiment using Crypto API
function getSentiment() {
    const randomIndex = new Uint32Array(1);
    window.crypto.getRandomValues(randomIndex);
    const index = randomIndex[0] % sentiments.length;
    return { sentiment: sentiments[index], randomValue: randomIndex[0] }; // Return both sentiment and random value
}

// Function to check if 60 seconds have passed
function checkTime() {
    const lastUpdatedTime = localStorage.getItem("lastUpdatedTime");
    if (lastUpdatedTime) {
        const timeElapsed = (Date.now() - lastUpdatedTime) / 1000;
        return timeElapsed > 60;
    }
    return true; // If no lastUpdatedTime exists, consider it time to update
}

// Function to update the sentiment and countdown
function updateSentiment() {
    const { sentiment, randomValue } = getSentiment();

    // Update localStorage with the new sentiment and random value
    localStorage.setItem("sentiment", sentiment);
    localStorage.setItem("randomValue", randomValue);

    // Display the sentiment on the page
    const sentimentDisplay = document.getElementById("sentiment");
    sentimentDisplay.textContent = sentiment;

    // Display the random value on the Proof of Chance page
    const randomValueDisplay = document.getElementById("random-value");
    if (randomValueDisplay) {
        randomValueDisplay.textContent = `Random Value: ${randomValue}`;
    }

    // Update the background color for the sentiment
    if (sentiment === "Bullish") {
        document.body.style.backgroundColor = "green";
    } else {
        document.body.style.backgroundColor = "red";
    }

    // Update confetti for Bullish sentiment
    if (sentiment === "Bullish") {
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 45,
            origin: { x: 0, y: 0.8 }
        });
        confetti({
            particleCount: 100,
            angle: 120,
            spread: 45,
            origin: { x: 1, y: 0.8 }
        });
    }

    // Store the last update time
    localStorage.setItem("lastUpdatedTime", Date.now().toString());
}

// Start the countdown and update logic
function updateCountdown() {
    const countdownDisplay = document.getElementById("countdown-display");
    const lastUpdatedTime = parseInt(localStorage.getItem("lastUpdatedTime"), 10);

    if (isNaN(lastUpdatedTime)) return;

    function calculateRemainingTime() {
        const elapsedTime = Math.floor((Date.now() - lastUpdatedTime) / 1000);
        return Math.max(60 - elapsedTime, 0);
    }

    function updateDisplay() {
        let countdown = calculateRemainingTime();
        countdownDisplay.textContent = `Time remaining: ${countdown} seconds`;

        if (countdown === 0) {
            updateSentiment(); // Update sentiment when countdown hits 0
            updateCountdown(); // Restart countdown
        }
    }

    updateDisplay();
    setInterval(updateDisplay, 1000); // Update every second
}

// Call initial update
if (checkTime()) {
    updateSentiment();
}
updateCountdown();

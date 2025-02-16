// Array of sentiments
const sentiments = ["Bullish", "Bearish"];

// Function to randomly choose a sentiment using Crypto API
function getSentiment() {
    const randomIndex = new Uint32Array(1);
    window.crypto.getRandomValues(randomIndex);
    const index = randomIndex[0] % sentiments.length;
    return { sentiment: sentiments[index], randomValue: randomIndex[0] }; // Return both sentiment and random value
}

// Function to check if 60 seconds have passed since last sentiment change
function hasOneMinutePassed(lastUpdatedTime) {
    const currentTime = Date.now();
    return currentTime - lastUpdatedTime >= 60000; // 60 seconds in milliseconds
}

// Function to update sentiment and store the timestamp
function updateSentiment() {
    const sentimentElement = document.getElementById("sentiment");

    // Get current sentiment and random value
    const { sentiment, randomValue } = getSentiment(); // Get sentiment and random value

    sentimentElement.textContent = sentiment; // Update sentiment text
    sentimentElement.style.color = "#FFD700"; // Bright yellow for both Bullish and Bearish

    // Store the sentiment, random value, and the timestamp of the update
    localStorage.setItem("sentiment", sentiment);
    localStorage.setItem("randomValue", randomValue);
    localStorage.setItem("lastUpdatedTime", Date.now());

    console.log(`Sentiment: ${sentiment}`); // Debugging

    // Change the background color based on sentiment
    if (sentiment === "Bullish") {
        document.body.style.backgroundColor = "green"; // Bullish sentiment: green
        startConfetti(); // Trigger confetti for Bullish sentiment
    } else {
        document.body.style.backgroundColor = "red"; // Bearish sentiment: red
    }
}

// Function to update the countdown timer
function updateCountdown() {
    let countdown = parseInt(localStorage.getItem("countdown"), 10); // Get saved countdown value
    if (isNaN(countdown)) countdown = 60; // If no countdown saved, start from 60

    const countdownDisplay = document.getElementById("countdown-display");

    // Update the countdown every second
    const countdownInterval = setInterval(function () {
        countdownDisplay.textContent = `Time remaining: ${countdown} seconds`;

        // When countdown reaches 0, reset the countdown
        if (countdown === 0) {
            updateSentiment(); // Update sentiment when timer reaches 0
            countdown = 60; // Reset countdown to 60
            localStorage.setItem("countdown", countdown); // Store updated countdown value
            setTimeout(() => {
                updateCountdown(); // Restart countdown after sentiment update
            }, 3000); // Wait for 3 seconds to allow sentiment update
        }

        countdown--; // Decrease countdown by 1 second
        localStorage.setItem("countdown", countdown); // Store updated countdown value in localStorage
    }, 1000); // Update every second
}

// Confetti function (assuming it's already set up with a library like confetti.js)
function startConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}

// Initialize and run on page load
window.onload = function () {
    const sentiment = localStorage.getItem("sentiment"); // Get saved sentiment
    const lastUpdatedTime = parseInt(localStorage.getItem("lastUpdatedTime"), 10); // Get saved last updated timestamp
    let countdown = parseInt(localStorage.getItem("countdown"), 10); // Get saved countdown value

    if (!sentiment || !lastUpdatedTime || hasOneMinutePassed(lastUpdatedTime)) {
        // If no sentiment or more than 60 seconds have passed, update the sentiment
        updateSentiment();
        countdown = 60; // Reset countdown to 60
        localStorage.setItem("countdown", countdown); // Store countdown value
    } else {
        // Use stored sentiment and countdown if within 60 seconds
        document.getElementById("sentiment").textContent = sentiment;
        document.body.style.backgroundColor = sentiment === "Bullish" ? "green" : "red";
    }

    // Start or resume the countdown timer
    updateCountdown(); // Start the countdown timer when the page loads
};

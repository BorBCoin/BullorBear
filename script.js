// Array of sentiments
const sentiments = ["Bullish", "Bearish"];

// Function to randomly choose a sentiment using Crypto API
function getSentiment() {
    const randomIndex = new Uint32Array(1);
    window.crypto.getRandomValues(randomIndex);
    const index = randomIndex[0] % sentiments.length;
    console.log(`Random Value: ${randomIndex[0]}`); // Debugging
    return { sentiment: sentiments[index], randomValue: randomIndex[0] }; // Return both sentiment and random value
}

// Function to check if 60 seconds have passed since last sentiment change
function hasOneMinutePassed(lastUpdatedTime) {
    const currentTime = Date.now();
    return currentTime - lastUpdatedTime >= 60000; // 60 seconds in milliseconds
}

// Function to update sentiment
function updateSentiment() {
    const sentimentElement = document.getElementById("sentiment");

    // Get current sentiment and random value
    const { sentiment, randomValue } = getSentiment(); // Get sentiment and random value

    sentimentElement.textContent = sentiment; // Update sentiment text
    sentimentElement.style.color = "#FFD700"; // Bright yellow for both Bullish and Bearish

    // Store the sentiment and random value in localStorage
    localStorage.setItem("sentiment", sentiment);
    localStorage.setItem("randomValue", randomValue);

    // Store the last updated timestamp
    localStorage.setItem("lastUpdatedTime", Date.now());

    console.log(`Sentiment: ${sentiment}`); // Debugging

    // Change the background color based on sentiment
    if (sentiment === "Bullish") {
        document.body.style.backgroundColor = "green"; // Bullish sentiment: green
        console.log("Background color set to green"); // Debugging
        startConfetti(); // Trigger confetti for Bullish sentiment
    } else {
        document.body.style.backgroundColor = "red"; // Bearish sentiment: red
        console.log("Background color set to red"); // Debugging
    }
}

// Function to update the countdown timer
function updateCountdown() {
    let countdown = parseInt(localStorage.getItem("countdown"), 10) || 60; // Start countdown from stored value or 60 seconds if not found
    const countdownDisplay = document.getElementById("countdown-display");

    // Update the countdown every second
    const countdownInterval = setInterval(function () {
        countdownDisplay.textContent = `Time remaining: ${countdown} seconds`;

        // When countdown reaches 0, reset the countdown
        if (countdown === 0) {
            updateSentiment(); // Update sentiment when timer reaches 0
            countdown = 60; // Reset countdown to 60
            localStorage.setItem("countdown", countdown); // Store the reset value in localStorage
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
    const lastUpdatedTime = parseInt(localStorage.getItem("lastUpdatedTime"), 10);
    const sentiment = localStorage.getItem("sentiment");

    if (sentiment && hasOneMinutePassed(lastUpdatedTime)) {
        // If more than 60 seconds have passed, update the sentiment
        updateSentiment();
    } else if (sentiment) {
        // Use stored sentiment if it's within the 60 seconds
        document.getElementById("sentiment").textContent = sentiment;
    } else {
        // If no sentiment stored, set initial sentiment
        updateSentiment();
    }

    // Start or resume the countdown timer based on stored value
    updateCountdown(); // Start the countdown timer when the page loads
};

    }

    updateCountdown(); // Start the countdown timer when the page loads
};

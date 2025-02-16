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

// Function to display sentiment on the home page
function updateSentiment() {
    const sentimentElement = document.getElementById("sentiment");
    const randomValueElement = document.getElementById("random-value");

    // Get sentiment and random value
    const { sentiment, randomValue } = getSentiment(); // Get sentiment and random value

    sentimentElement.textContent = sentiment; // Update sentiment text
    sentimentElement.style.color = "#FFD700"; // Bright yellow for both Bullish and Bearish

    // Store the sentiment and random value in localStorage
    localStorage.setItem("sentiment", sentiment);
    localStorage.setItem("randomValue", randomValue);

    // Reveal the random value and show it
    randomValueElement.textContent = `Random Value: ${randomValue}`; 
    randomValueElement.style.display = "block"; // Show the value
    console.log(`Sentiment: ${sentiment}`); // Debugging

    // Change the background color based on sentiment
    if (sentiment === "Bullish") {
        setTimeout(function () {
            document.body.style.backgroundColor = "green"; // Bullish sentiment: green
            console.log("Background color set to green"); // Debugging
            startConfetti(); // Trigger confetti for Bullish sentiment
        }, 500); // Small delay to ensure everything loads first
    } else {
        setTimeout(function () {
            document.body.style.backgroundColor = "red"; // Bearish sentiment: red
            console.log("Background color set to red"); // Debugging
        }, 500); // Small delay
    }

    // Force a refresh to ensure color change is reflected immediately
    document.body.style.transition = "none"; // Disable transition for immediate change
    document.body.offsetHeight; // Trigger a reflow/repaint
    document.body.style.transition = "background-color 0.5s ease"; // Enable transition again
}

// Function to update the countdown timer
function updateCountdown() {
    let countdown = 60; // Start countdown from 60 seconds
    const countdownDisplay = document.getElementById("countdown-display");

    // Update the countdown every second
    const countdownInterval = setInterval(function () {
        countdownDisplay.textContent = `Time remaining: ${countdown} seconds`;

        // When countdown reaches 0, show "Loading..." and then update sentiment
        if (countdown === 0) {
            clearInterval(countdownInterval); // Clear the interval to stop countdown
            updateSentiment(); // Update sentiment with delay
            setTimeout(() => {
                updateCountdown(); // Restart countdown after sentiment update
            }, 3000); // Wait for 3 seconds to allow sentiment update
        }

        countdown--; // Decrease countdown by 1 second
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

// Run the countdown and sentiment update when the page loads
window.onload = function () {
    setTimeout(function () {
        updateSentiment(); // Ensure sentiment shows when the page first loads
        updateCountdown(); // Start the countdown with a slight delay
    }, 500); // Small delay to ensure everything is loaded
};

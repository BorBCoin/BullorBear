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

// Function to display sentiment on the page
function updateSentiment() {
    const sentimentElement = document.getElementById("sentiment");
    const randomValueElement = document.getElementById("random-value");
    sentimentElement.textContent = "Loading..."; // Display loading initially
    sentimentElement.style.color = "#000000"; // Black color for loading

    // Wait for 3 seconds before showing the sentiment
    setTimeout(() => {
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
            document.body.style.backgroundColor = "green"; // Bullish sentiment: green
            console.log("Background color set to green"); // Debugging
            startConfetti(); // Trigger confetti for Bullish sentiment
        } else {
            document.body.style.backgroundColor = "red"; // Bearish sentiment: red
            console.log("Background color set to red"); // Debugging
        }
    }, 3000); // 3-second delay
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
            updateSentiment(); // Update sentiment with delay
            countdown = 60; // Reset countdown to 60
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
    updateSentiment(); // Ensure sentiment shows when the page first loads
    updateCountdown(); // Start the countdown
};

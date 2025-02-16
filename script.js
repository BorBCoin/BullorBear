// Array of sentiments
const sentiments = ["Bullish", "Bearish"];

// Function to get a consistent sentiment for the day based on the current date
function getDailySentiment() {
    const today = new Date().toISOString().slice(0, 10);  // Get current date in YYYY-MM-DD format
    const sentimentIndex = today.charCodeAt(0) % sentiments.length; // Generate a hash based on the first character of the date
    return sentiments[sentimentIndex]; // Return the corresponding sentiment (Bullish or Bearish)
}

// Function to display sentiment on the home page
function updateSentiment() {
    const sentimentElement = document.getElementById("sentiment");

    // Get the daily sentiment
    const sentiment = getDailySentiment();

    sentimentElement.textContent = sentiment; // Update sentiment text
    sentimentElement.style.color = "#FFD700"; // Bright yellow for both Bullish and Bearish

    // Store the sentiment in localStorage
    localStorage.setItem("sentiment", sentiment);

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
    let countdown = 60; // Start countdown from 60 seconds
    const countdownDisplay = document.getElementById("countdown-display");

    // Update the countdown every second
    const countdownInterval = setInterval(function () {
        countdownDisplay.textContent = `Time remaining: ${countdown} seconds`;

        // When countdown reaches 0, reset the countdown
        if (countdown === 0) {
            updateSentiment(); // Update sentiment when timer reaches 0
            countdown = 60; // Reset countdown to 60
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
    const storedSentiment = localStorage.getItem("sentiment");

    // If there's no sentiment in localStorage, fetch the daily sentiment
    if (!storedSentiment) {
        updateSentiment(); // Ensure sentiment shows when the page first loads
    } else {
        // If sentiment is stored, display it directly
        document.getElementById("sentiment").textContent = storedSentiment;
        if (storedSentiment === "Bullish") {
            document.body.style.backgroundColor = "green"; // Bullish sentiment: green
        } else {
            document.body.style.backgroundColor = "red"; // Bearish sentiment: red
        }
    }

    setTimeout(updateCountdown, 500); // Set a small delay before starting the countdown
};

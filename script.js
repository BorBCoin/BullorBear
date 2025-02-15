// Array of sentiments
const sentiments = ["Bullish", "Bearish"];

// Function to randomly choose a sentiment
function getSentiment() {
    const randomIndex = Math.floor(Math.random() * sentiments.length);
    return sentiments[randomIndex];
}

// Function to display sentiment on the page
function updateSentiment() {
    const sentiment = getSentiment();
    document.getElementById("sentiment").textContent = sentiment;  // Fix the reference to the sentiment element

    // Change the background color based on sentiment
    if (sentiment === "Bullish") {
        document.body.style.backgroundColor = "green";
    } else {
        document.body.style.backgroundColor = "red";
    }
}

// Function to update the countdown timer
function updateCountdown() {
    let countdown = 60;  // Start countdown from 60 seconds
    const countdownDisplay = document.getElementById("countdown-display");

    // Update the countdown every second
    const countdownInterval = setInterval(function() {
        countdownDisplay.textContent = `Time remaining: ${countdown} seconds`;

        // When countdown reaches 0, update sentiment and reset countdown
        if (countdown === 0) {
            updateSentiment();  // Update sentiment
            countdown = 60;     // Reset countdown to 60
        }

        countdown--;  // Decrease countdown by 1 second
    }, 1000);  // Update every second
}

// Run the countdown and sentiment update when the page loads
updateSentiment();  // Ensure sentiment shows when the page first loads
updateCountdown();  // Start the countdown

// Function to generate the random sentiment
function generateSentiment() {
    const sentiments = ["Bullish", "Bearish"];
    const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    localStorage.setItem("sentiment", randomSentiment);  // Store sentiment
    return randomSentiment;
}

// Function to update sentiment text and page styling
function updateSentiment() {
    const sentiment = localStorage.getItem("sentiment") || generateSentiment(); // Fetch or generate sentiment
    document.getElementById("sentiment").textContent = sentiment; // Display sentiment

    // Change background color based on sentiment
    if (sentiment === "Bullish") {
        document.body.style.backgroundColor = "green"; // Bullish sentiment: green
    } else {
        document.body.style.backgroundColor = "red"; // Bearish sentiment: red
    }

    // Save random value to localStorage for proof of chance page
    const randomValue = Math.random(); // Generate a random value
    localStorage.setItem("randomValue", randomValue);
}

// Countdown timer logic
let countdownTime = 60; // Countdown time in seconds

function updateCountdown() {
    const countdownDisplay = document.getElementById("countdown-display");
    countdownDisplay.textContent = `Time remaining: ${countdownTime} seconds`;

    if (countdownTime <= 0) {
        // Reset countdown
        countdownTime = 60;
        generateSentiment();  // Update sentiment when countdown hits zero
        updateSentiment();     // Update sentiment display
    }

    countdownTime--;
}

// Persistent timer (floating box on the left side)
function updatePersistentTimer() {
    const persistentTimer = document.getElementById("persistent-timer");
    let persistentCountdownTime = countdownTime;

    persistentTimer.textContent = `Time remaining: ${persistentCountdownTime} seconds`;
    
    if (persistentCountdownTime <= 0) {
        persistentCountdownTime = 60;
        generateSentiment();
        updateSentiment();
    }
    
    persistentCountdownTime--;
}

// Initialize sentiment and countdown
document.addEventListener("DOMContentLoaded", function() {
    updateSentiment(); // Initialize the sentiment display on page load
    setInterval(updateCountdown, 1000); // Update countdown every second
    setInterval(updatePersistentTimer, 1000); // Update persistent timer every second
});


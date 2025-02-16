// Function to display sentiment on the page
function updateSentiment() {
    const sentimentElement = document.getElementById("sentiment");
    const randomValueElement = document.getElementById("random-value");

    // Initially, show nothing or a blank space (no "Loading..." text here)
    sentimentElement.textContent = ""; // Clear previous sentiment or set to an empty string
    sentimentElement.style.color = "#000000"; // Default color for sentiment element

    // Wait for 3 seconds before showing the sentiment after the countdown ends
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

        // Force a refresh to ensure color change is reflected immediately
        document.body.offsetHeight; // Trigger a reflow/repaint
    }, 3000); // 3-second delay to simulate loading after the countdown
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
            // Show "Loading..." for the sentiment
            document.getElementById("sentiment").textContent = "Loading...";
            updateSentiment(); // Update sentiment with delay
            countdown = 60; // Reset countdown to 60
        }

        countdown--; // Decrease countdown by 1 second
    }, 1000); // Update every second
}

// Run the countdown and sentiment update when the page loads
window.onload = function () {
    updateCountdown(); // Start the countdown immediately when the page loads
};

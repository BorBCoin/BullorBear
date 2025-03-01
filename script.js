// Function to fetch sentiment from the server
async function fetchSentiment() {
    try {
        const response = await fetch('https://bullorbear.onrender.com/api/sentiment'); // Corrected backend URL
        const data = await response.json();
        
        const sentiment = data.sentiment;
        const lastUpdatedTime = data.lastUpdatedTime;

        // Update the sentiment on the page
        const sentimentElement = document.getElementById("sentiment");
        sentimentElement.textContent = sentiment;
        sentimentElement.style.color = "#FFD700"; // Bright yellow for both Bullish and Bearish

        // Store the data in localStorage for fallback
        localStorage.setItem("sentiment", sentiment);
        localStorage.setItem("lastUpdatedTime", lastUpdatedTime);

        // Change background color based on sentiment
        document.body.style.backgroundColor = sentiment === "Bullish" ? "green" : "red";

        if (sentiment === "Bullish") {
            startConfetti();
        }
    } catch (error) {
        console.error("Error fetching sentiment:", error);
    }
}

// Function to start confetti animation when sentiment is bullish
function startConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Update countdown logic
function updateCountdown(lastUpdatedTime) {
    const countdownDisplay = document.getElementById("countdown-display");

    function calculateRemainingTime() {
        const elapsedTime = Math.floor((Date.now() - lastUpdatedTime) / 1000);
        return Math.max(60 - elapsedTime, 0);
    }

    function updateDisplay() {
        let countdown = calculateRemainingTime();
        countdownDisplay.textContent = `Time remaining: ${countdown} seconds`;

        if (countdown === 0) {
            fetchSentiment(); // Reset sentiment when countdown hits 0
            updateCountdown(Date.now()); // Restart countdown from current time
        }
    }

    updateDisplay();
    setInterval(updateDisplay, 1000); // Update every second
}

// Initialize page with data
window.onload = async function () {
    const sentiment = localStorage.getItem("sentiment");
    const lastUpdatedTime = parseInt(localStorage.getItem("lastUpdatedTime"), 10);

    // If no sentiment or if one minute has passed, fetch data from server
    if (!sentiment || isNaN(lastUpdatedTime)) {
        await fetchSentiment(); // Fetch data from the server if necessary
    } else {
        // Use stored sentiment and update the page with it
        document.getElementById("sentiment").textContent = sentiment;
        document.body.style.backgroundColor = sentiment === "Bullish" ? "green" : "red";
    }

    updateCountdown(lastUpdatedTime); // Start countdown
};

const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors()); // Allow all origins

// Array of sentiments
const sentiments = ["Bullish", "Bearish"];

// Store sentiment and timestamp globally
let sentimentData = {
    sentiment: "Bullish", // Default initial sentiment
    lastUpdatedTime: Date.now(), // Timestamp of the last update
};

// Helper function to generate a random value for Proof of Chance
function generateRandomValue() {
    return Math.floor(Math.random() * 1000000); // Random value between 0 and 1,000,000
}

// API to get sentiment, timestamp, and random value
app.get('/api/sentiment', (req, res) => {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - sentimentData.lastUpdatedTime) / 1000);
    const timeLeft = Math.max(60 - elapsedTime, 0);

    // If 60 seconds have passed, generate a new sentiment
    if (timeLeft === 0) {
        const randomIndex = Math.floor(Math.random() * sentiments.length);
        sentimentData.sentiment = sentiments[randomIndex];
        sentimentData.lastUpdatedTime = currentTime; // Update timestamp
    }

    // Send the sentiment, timestamp, time left, and random value
    res.json({
        sentiment: sentimentData.sentiment,
        lastUpdatedTime: sentimentData.lastUpdatedTime, // Send the correct timestamp
        timeLeft: timeLeft, // Send time left
        randomValue: generateRandomValue() // Add random value to the response
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

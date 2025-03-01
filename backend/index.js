const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const port = process.env.PORT; // No fallback, required for Render

// Use CORS middleware
app.use(cors()); // Allow all origins

// Array of sentiments
const sentiments = ["Bullish", "Bearish"];

// Store sentiment and timestamp globally
let sentimentData = {
    sentiment: "Bullish", // Default initial sentiment
    lastUpdatedTime: Date.now(), // Timestamp of the last update
};

// Root route to prevent "Cannot GET /"
app.get('/', (req, res) => {
    res.send("Welcome to the BorB API! Use /api/sentiment to get sentiment data.");
});

// API to get sentiment and countdown time
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

    res.json({
        sentiment: sentimentData.sentiment,
        lastUpdatedTime: sentimentData.lastUpdatedTime, // Send the correct timestamp
        timeLeft: timeLeft, // Send time left
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

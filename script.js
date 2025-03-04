const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; 

// Use CORS middleware
app.use(cors());

// Store sentiment and timestamp globally
let sentimentData = {
    sentiment: null, // Initially no sentiment
    lastUpdatedTime: Date.now(), // Timestamp of the last update
    randomValue: null // Initially no random value
};

// Helper function to generate a random value for Proof of Chance
function generateRandomValue() {
    return Math.floor(Math.random() * 1000000); // Random value between 0 and 1,000,000
}

// Helper function to determine sentiment based on random value
function generateSentiment(randomValue) {
    return randomValue < 500000 ? "Bullish" : "Bearish";
}

// Function to update sentiment and random value
function updateSentimentData() {
    const randomValue = generateRandomValue();
    const sentiment = generateSentiment(randomValue);

    sentimentData = {
        sentiment,
        randomValue,
        lastUpdatedTime: Date.now()
    };
}

// Initialize sentiment data on server start
updateSentimentData();

// API to get sentiment, timestamp, and random value
app.get('/api/sentiment', (req, res) => {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - sentimentData.lastUpdatedTime) / 1000);

    // Update sentiment every 60 seconds
    if (elapsedTime >= 60) {
        updateSentimentData();
    }

    const timeLeft = Math.max(60 - elapsedTime, 0);

    // Log the complete data response
    console.log({
        sentiment: sentimentData.sentiment,
        randomValue: sentimentData.randomValue,
        lastUpdatedTime: sentimentData.lastUpdatedTime,
        timeLeft
    });

    res.json({
        sentiment: sentimentData.sentiment,
        randomValue: sentimentData.randomValue,
        lastUpdatedTime: sentimentData.lastUpdatedTime,
        timeLeft
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on https://bullorbear.onrender.com`);
});

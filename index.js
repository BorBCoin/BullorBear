const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const port = process.env.PORT || 3000; // Use environment variable PORT for Render, default to 3000 for local development

// Use CORS middleware
app.use(cors()); // Allow all origins

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
    if (randomValue < 500000) {
        return "Bullish"; // Sentiment is Bullish if random value is less than 500,000
    } else {
        return "Bearish"; // Sentiment is Bearish if random value is greater than or equal to 500,000
    }
}

// API to get sentiment, timestamp, and random value
app.get('/api/sentiment', (req, res) => {
    const randomValue = generateRandomValue(); // Generate random value

    if (randomValue === null) {
        return res.status(400).json({ error: 'Random value generation failed' }); // Error if no random value
    }

    const sentiment = generateSentiment(randomValue); // Determine sentiment based on random value

    // Store the sentiment and timestamp globally
    sentimentData.sentiment = sentiment;
    sentimentData.randomValue = randomValue;
    sentimentData.lastUpdatedTime = Date.now(); // Update timestamp

    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - sentimentData.lastUpdatedTime) / 1000);
    const timeLeft = Math.max(60 - elapsedTime, 0);

    // Send the sentiment, timestamp, time left, and random value in the response
    res.json({
        sentiment: sentimentData.sentiment,
        randomValue: sentimentData.randomValue, // Include random value in the response
        lastUpdatedTime: sentimentData.lastUpdatedTime, // Send the correct timestamp
        timeLeft: timeLeft, // Send time left
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on https://bullorbear.onrender.com`);
});

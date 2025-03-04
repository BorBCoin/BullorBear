const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; 

// Use CORS middleware
app.use(cors());

// Store sentiment and timestamp globally
let sentimentData = {
    sentiment: null,
    lastUpdatedTime: 0,
    randomValue: null
};

// Function to generate a new sentiment every 60 seconds
function updateSentimentIfNeeded() {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - sentimentData.lastUpdatedTime) / 1000;

    if (elapsedTime >= 60 || sentimentData.sentiment === null) {
        sentimentData.randomValue = Math.floor(Math.random() * 1000000);
        sentimentData.sentiment = sentimentData.randomValue < 500000 ? "Bullish" : "Bearish";
        sentimentData.lastUpdatedTime = currentTime;

        console.log("New Sentiment Generated:", sentimentData.sentiment, "Random Value:", sentimentData.randomValue);
    }
}

// API to get sentiment, timestamp, and random value
app.get('/api/sentiment', (req, res) => {
    updateSentimentIfNeeded();

    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - sentimentData.lastUpdatedTime) / 1000);
    const timeLeft = Math.max(60 - elapsedTime, 0);

    res.json({
        sentiment: sentimentData.sentiment,
        randomValue: sentimentData.randomValue,
        lastUpdatedTime: sentimentData.lastUpdatedTime,
        timeLeft: timeLeft,
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


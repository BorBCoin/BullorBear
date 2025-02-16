const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Array of sentiments
const sentiments = ["Bullish", "Bearish"];

// Store sentiment and timestamp globally
let sentimentData = {
    sentiment: "Bullish", // Default initial sentiment
    lastUpdatedTime: Date.now(), // Timestamp of the last update
};

// Enable CORS
const cors = require('cors');
app.use(cors({
    origin: 'https://borbcoin.netlify.app', // Allow requests from Netlify
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
}));

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
    console.log(`Server running on http://localhost:${port}`);
});

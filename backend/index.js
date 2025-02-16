const express = require('express');
const app = express();
const port = 3000;

// Store the sentiment and time
let sentiment = 'Bullish';  // Default sentiment
let nextChangeTime = new Date().setHours(24, 0, 0, 0);  // Next sentiment change is 24 hours later

// Endpoint to get the sentiment and time
app.get('/api/sentiment', (req, res) => {
  // Check if it's time to change sentiment
  const currentTime = new Date().getTime();
  if (currentTime >= nextChangeTime) {
    // Change sentiment and reset timer
    sentiment = Math.random() > 0.5 ? 'Bullish' : 'Bearish';  // Random sentiment
    nextChangeTime = new Date().setHours(new Date().getHours() + 24, 0, 0, 0);  // Set next change time
  }
  const timeLeft = nextChangeTime - currentTime;  // Time left for next change
  
  res.json({
    sentiment,
    timeLeft
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

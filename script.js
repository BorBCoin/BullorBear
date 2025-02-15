// Function to generate random sentiment (bullish or bearish)
function generateSentiment() {
    const sentiments = ["Bullish", "Bearish"];
    const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    
    // Display the sentiment on the page
    const sentimentElement = document.getElementById("sentiment");
    sentimentElement.innerText = randomSentiment;

    // Change the color based on sentiment
    if (randomSentiment === "Bullish") {
        sentimentElement.style.color = "green";  // Green for Bullish
    } else {
        sentimentElement.style.color = "red";    // Red for Bearish
    }
}

// Set interval to change sentiment every minute (60000 milliseconds)
setInterval(generateSentiment, 60000);

// Generate initial sentiment when the page loads
generateSentiment();


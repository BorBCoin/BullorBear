// Array of sentiments
const sentiments = ["Bullish", "Bearish"];

// Function to randomly choose a sentiment
function getSentiment() {
    const randomIndex = Math.floor(Math.random() * sentiments.length);
    return sentiments[randomIndex];
}

// Function to display sentiment on the page
function updateSentiment() {
    const sentiment = getSentiment();
    document.getElementById("sentiment-display").textContent = sentiment;

    // Change the background color based on sentiment
    if (sentiment === "Bullish") {
        document.body.style.backgroundColor = "green";
    } else {
        document.body.style.backgroundColor = "red";
    }
}

// Run the update every 1 minute (60000 milliseconds)
setInterval(updateSentiment, 60000);

// Initial sentiment update when page loads
updateSentiment();

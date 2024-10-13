const express = require('express');
const router = express.Router();
const natural = require('natural');

// Dataset of phrases and responses
const dataset = require('../../src/Data/dataset.json');

// Functions
function findResponse(userInput) {
  let bestMatch = null;
  let highestScore = 0;

  for (const item of dataset) {
    for (const phrase of item.phrases) {
      const score = natural.JaroWinklerDistance(userInput.toLowerCase(), phrase.toLowerCase());

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item.response;
      }
    }
  }

  return bestMatch || "Sorry, I couldn't understand your request.";
}

router.post('/chat', (req, res) => {
  const userInput = req.body.message; // Extract the user's input from the request body

  // Process the user input and find a suitable response
  const response = findResponse(userInput);

  res.json({ message: response });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const natural = require('natural');

// Dataset of phrases and responses
const dataset = require('../../src/Data/dataset.json');

// Create a tokenizer
const tokenizer = new natural.WordTokenizer();

// Functions
function findResponse(tokens) {
  for (const item of dataset) {
    const phrases = item.phrases;

    // Check if any of the phrases match the tokens
    const matched = phrases.some((phrase) =>
      tokens.some((token) =>
        phrase.toLowerCase().includes(token.toLowerCase())
      )
    );

    if (matched) {
      return item.response;
    }
  }

  return "Sorry, I couldn't understand your request.";
}

router.post('/chat', (req, res) => {
  const userInput = req.body.message; // Extract the user's input from the request body
  const tokens = tokenizer.tokenize(userInput); // Tokenize the user input

  // Process the tokenized user input and find a suitable response
  const response = findResponse(tokens);

  res.json({ message: response });
});

module.exports = router;

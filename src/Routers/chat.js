const express = require('express');
const router = express.Router();

// Dataset of phrases and responses
const dataset = require('../../src/Data/dataset.json');

//Functions
function findResponse(userInput) {
  // Implement your logic here to find the appropriate response
  // Compare the user's input with the phrases in your dataset
  // Return the matched response or a default response if no match is found

  // Example implementation:
  for (const item of dataset) {
    if (item.phrase === userInput) {
      return item.response;
    }
  }

  return "Sorry, I couldn't understand your request.";
}

router.get('/chat', (req, res) => {
  res.render('chat.ejs');
});

router.post('/chat', (req, res) => {
  const userInput = req.body.message; // Extract the user's input from the request body

  // Process the user's input and find a suitable response
  const response = findResponse(userInput);

  res.json({ message: response });
});

module.exports = router;
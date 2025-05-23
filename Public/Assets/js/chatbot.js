// Toggle visibility of the chat window
function toggleChatWindow() {
  const chatWindow = document.getElementById('chat-window');
  
  if (chatWindow.style.display === 'none') {
    chatWindow.style.display = 'block';
    setTimeout(() => {
      chatWindow.classList.add('show');
    }, 50); // Add a slight delay before adding the 'show' class
  } else {
    chatWindow.classList.remove('show');
    setTimeout(() => {
      chatWindow.style.display = 'none';
    }, 1000); // Adjust the duration to match the CSS transition time
  }
}

// Send a message to the chat log
function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  document.getElementById('user-input').value = ''; // Clear the input field

  appendMessage('You', userInput);

  // Send the user's message to the chatbot server
  fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userInput
      })
    })
    .then(response => response.json())
    .then(data => {
      const response = data.message;
      appendMessage('Ben', response);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function appendMessage(sender, message) {
  const chatLog = document.getElementById('chat-log');
  const messageElement = document.createElement('p');
  messageElement.className = sender;
  messageElement.innerHTML = `<strong>${sender}: </strong>${message}`;
  chatLog.appendChild(messageElement);
}

// Clear the chat log
function clearChatLog() {
  // Empty Chat
  document.getElementById('chat-log').innerHTML = '';

  // Send initial message
  appendMessage('Ben', "Hi! My name is Ben... but in robot form. I will try my best to help you out as best as possible. Throw phrases at me and I will answer them. For example, you can ask me for a link to my CV, or my email address. If you experience any bugs, shoot me an email and I'll get the real Ben to fix me.")
}
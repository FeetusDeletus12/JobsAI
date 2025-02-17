// script.js

// Select the chat window elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Function to send user input to the Gradio space and display the response
async function sendMessage() {
    const message = userInput.value;

    if (message.trim() === "") return; // Do not send empty messages

    // Display the user message in the chat window
    chatBox.innerHTML += `<div class="message user-message">${message}</div>`;

    // Clear the input box
    userInput.value = "";

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;

    // Call Gradio API to get the AI response
    try {
        const response = await fetch("https://braxtongough-myai.hf.space/run/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: [message]
            })
        });

        const result = await response.json();

        // Display the response from the AI
        const aiResponse = result.data[0];
        chatBox.innerHTML += `<div class="message ai-message">${aiResponse}</div>`;

        // Scroll to the bottom after the response is added
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        chatBox.innerHTML += `<div class="message error-message">Sorry, something went wrong.</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Event listener for the send button
sendButton.addEventListener('click', sendMessage);

// Event listener for pressing "Enter" to send a message
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

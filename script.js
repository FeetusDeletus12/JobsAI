// script.js

// Select the chat window elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Function to send user input to the Hugging Face space and display the response
async function sendMessage() {
    const message = userInput.value;

    if (message.trim() === "") return; // Do not send empty messages

    // Display the user message in the chat window
    chatBox.innerHTML += `<div class="message user-message">${message}</div>`;

    // Clear the input box
    userInput.value = "";

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;

    // Call Hugging Face API to get the AI response
    try {
        const response = await fetch("https://huggingface.co/spaces/braxtongough-myai/api/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: [message]  // Send the user message to Hugging Face model
            })
        });

        const result = await response.json();
        console.log("Response received:", result); // Check the response for debugging

        if (response.ok) {
            const aiResponse = result.data[0]; // Get the AI response
            chatBox.innerHTML += `<div class="message ai-message">${aiResponse}</div>`;
        } else {
            chatBox.innerHTML += `<div class="message error-message">Error: ${result.error || "Unknown"}</div>`;
        }

        // Scroll to the bottom after the response is added
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error('Request failed:', error); // Log error in the console
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

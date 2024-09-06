const socket = io('http://localhost:9001'); // Ensure this is the correct port

socket.on('connect_error', (err) => {
    console.error('Connection Error:', err.message);
});

socket.on('connect', () => {
    console.log('Connected to server');
});

const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('message');
const allMessages = document.getElementById('messages');

// Listen for messages from the server
socket.on('message', (message) => {
    const p = document.createElement('p');
    p.innerText = message;
    p.classList.add('received');
    allMessages.appendChild(p);
    allMessages.scrollTop = allMessages.scrollHeight;  // Scroll to latest message
});

// Send message when "Send" button is clicked
sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        const p = document.createElement('p');
        p.innerText = message;
        p.classList.add('sent');
        allMessages.appendChild(p);
        socket.emit('user-message', message);  // Send message to server
        messageInput.value = '';  // Clear input field
        allMessages.scrollTop = allMessages.scrollHeight;  // Scroll to latest message
    }
});

// Optionally send the message when "Enter" key is pressed
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();  // Trigger send button click
    }
});

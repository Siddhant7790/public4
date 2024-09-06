const cors = require('cors');
const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(cors());
app.use(express.static(path.resolve('./public')));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Listen for 'user-message' event from the client
    socket.on('user-message', (message) => {
        // Emit the message to all clients except the sender (to avoid duplication)
        socket.broadcast.emit('message', message);
    });

    // Log when user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
});

// Start the server
server.listen(9001, () => {
    console.log('Server running on port 9001');
});

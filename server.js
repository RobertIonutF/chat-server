const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
// Configure CORS here
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow only the React app to connect
    methods: ["GET", "POST"], // Allowable methods
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Listening on port ${port}`));
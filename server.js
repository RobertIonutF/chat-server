const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL, // Allow the client URL
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
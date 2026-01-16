const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for flexibility (dev/prod mixed usage)
    methods: ["GET", "POST"]
  }
});

// State: Store users. Key: socket.id, Value: User Object
// User Object: { socketId, peerId, name, role, room }
const users = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join-room', ({ peerId, name, role, room }) => {
    // Store user info
    users[socket.id] = { socketId: socket.id, peerId, name, role, room };
    
    // Join socket room
    socket.join(room);
    console.log(`${name} (${role}) joined room: ${room}`);

    // Get all users in this room
    const usersInRoom = Object.values(users).filter(u => u.room === room);
    
    // Broadcast updated user list to everyone in the room
    io.to(room).emit('user-list', usersInRoom);
  });

  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      console.log(`${user.name} disconnected`);
      const room = user.room;
      delete users[socket.id];
      
      // Notify remaining users in the room
      const usersInRoom = Object.values(users).filter(u => u.room === room);
      io.to(room).emit('user-list', usersInRoom);
    }
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
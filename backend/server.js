require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const userRoutes = require('./routes/Auth');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

// 🔥 Correct CORS Middleware
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Allow frontend URLs
    credentials: true, // Allow cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Explicitly handle preflight (OPTIONS) requests
app.options("*", cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('🟢 A user connected:', socket.id);

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`📌 User ${socket.id} joined room: ${room}`);
    });

    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`🚪 User ${socket.id} left room: ${room}`);
    });

    socket.on('sendMessage', (message) => {
        const { room } = message;
        console.log(`📨 Message sent to room ${room}:`, message);
        io.to(room).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('🔴 User disconnected:', socket.id);
    });
});

server.listen(5000, () => console.log('🚀 Server running on port 5000'));

// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Create HTTP server for socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // Allow frontend
    methods: ['GET', 'POST'],
  },
});

// Store socket instance globally in app
app.set('io', io);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Socket connection (optional, for logging)
io.on('connection', (socket) => {
  console.log('WebSocket connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('WebSocket disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

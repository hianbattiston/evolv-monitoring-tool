import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { initSocketService } from './services/socketService';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

initSocketService(io);

import { setupExperimentRoutes } from './routes/index';

const apiRouter = express.Router();
setupExperimentRoutes(apiRouter);
app.use('/api', apiRouter);
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const startServer = (port: number) => {
  server.once('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use, trying port ${port + 1}`);
      startServer(port + 1);
    }
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer(Number(PORT));

export { app, server, io };

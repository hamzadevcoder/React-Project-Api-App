import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import facebookRoutes from './facebook.routes.js';
import authRoutes from './auth.routes.js';
import { connectToDatabase } from './db.js';

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Mount authentication routes underneath /auth
app.use('/auth', authRoutes);

// Mount the facebook API routes underneath /facebook
app.use('/facebook', facebookRoutes);

// General simple health check (directly on backend)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Request logger for debugging
app.use((req, res, next) => {
  console.log(`[Backend] ${req.method} ${req.url}`);
  next();
});

// Global catch-all
app.use('*', (req, res) => {
  console.warn(`[Backend] 404/405 at ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: `Route ${req.originalUrl} not found on backend.` });
});

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend server listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start backend server:', error);
    process.exit(1);
  });

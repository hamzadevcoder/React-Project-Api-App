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

// Mount authentication routes underneath /api/auth
app.use('/api/auth', authRoutes);

// Mount the facebook API routes underneath /api/facebook
app.use('/api/facebook', facebookRoutes);

// General simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
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

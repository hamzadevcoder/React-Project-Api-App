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
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

// Explicit preflight handler
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

// Request logger for debugging (Moved to top)
app.use((req, res, next) => {
  console.log(`[Backend] ${req.method} ${req.url} (${new Date().toLocaleTimeString()})`);
  next();
});

// Mount authentication routes underneath /auth
app.use('/auth', authRoutes);

// Mount the facebook API routes underneath /facebook
app.use('/facebook', facebookRoutes);

// General simple health check (directly on backend)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Global catch-all
app.use('*', (req, res) => {
  console.warn(`[Backend] 404/405 at ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: `Route ${req.originalUrl} not found on backend.` });
});

// Start server immediately
app.listen(PORT, () => {
  console.log(`🚀 Backend server listening at http://127.0.0.1:${PORT}`);
});

// Attempt database connection in the background
connectToDatabase()
  .then((success) => {
    if (success) console.log('✅ Database connected successfully');
    else console.warn('⚠️  Database connection failed, operating in Mock Mode.');
  })
  .catch((error) => {
    console.error('❌ Critical database error:', error);
  });

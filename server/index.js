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
  origin: (origin, callback) => {
    const explicitOrigins = (process.env.CORS_ORIGINS || process.env.CLIENT_ORIGIN || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
    const defaultOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
    const allowedOrigins = [...new Set([...defaultOrigins, ...explicitOrigins])];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// Explicit preflight handler (Express 5-safe wildcard)
app.options(/.*/, cors());

app.use(express.json());
app.use(cookieParser());

// Request logger for debugging (Moved to top)
app.use((req, res, next) => {
  console.log(`[Backend] ${req.method} ${req.url} (${new Date().toLocaleTimeString()})`);
  next();
});

// Mount authentication routes for both prefixed and direct paths.
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

// Mount Facebook routes for both prefixed and direct paths.
app.use('/api/facebook', facebookRoutes);
app.use('/facebook', facebookRoutes);

// General simple health check (directly on backend)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Global catch-all
app.use((req, res) => {
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

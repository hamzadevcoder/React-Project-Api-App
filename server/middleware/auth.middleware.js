import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import { findMockUserById } from '../mockDb.js';

/**
 * Reads JWT from cookies and returns current authenticated user.
 */
export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.auth_token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ error: 'Missing JWT_SECRET in environment' });
    }

    const payload = jwt.verify(token, jwtSecret);
    let user;

    if (mongoose.connection.readyState === 1) {
      user = await User.findById(payload.userId);
    } else {
      user = findMockUserById(payload.userId);
    }

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

/**
 * Signs and attaches authentication JWT to an HTTP-only cookie.
 */
export const setAuthCookie = (res, userId) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('Missing JWT_SECRET in environment');
  }

  const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' });
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

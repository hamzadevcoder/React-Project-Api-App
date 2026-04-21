import express from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from './models/user.model.js';
import { requireAuth, setAuthCookie } from './middleware/auth.middleware.js';
import { findMockUserByEmail, saveMockUser } from './mockDb.js';

const router = express.Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

router.use((req, _res, next) => {
  console.log(`[Auth Route Hit] ${req.method} /auth${req.path}`);
  next();
});

/**
 * Returns safe user payload for frontend.
 */
const sanitizeUser = (user) => ({
  id: user.id || user._id,
  name: user.full_name,
  full_name: user.full_name,
  email: user.email,
  email_verified: user.email_verified,
  appId: `app_${(user.id || user._id || '').toString().slice(-8)}`,
});

const isDbConnected = () => mongoose.connection.readyState === 1;

/**
 * Shared register handler for /signup and /register.
 */
const handleRegister = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user;

    if (isDbConnected()) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) return res.status(409).json({ error: 'An account with this email already exists.' });
    } else {
      const existingUser = findMockUserByEmail(normalizedEmail);
      if (existingUser) return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userData = {
      full_name: fullName.trim(),
      email: normalizedEmail,
      password_hash: passwordHash,
      email_verified: true,
      verification_code: null,
      verification_code_expires_at: null,
    };

    if (isDbConnected()) {
      user = await User.create(userData);
    } else {
      user = saveMockUser(userData);
    }

    setAuthCookie(res, user.id || user._id);
    return res.status(201).json({ success: true, user: sanitizeUser(user) });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Failed to create account.' });
  }
};

/**
 * Registers a new account and logs user in immediately.
 */
router.post('/signup', handleRegister);

// Alias for /signup to support /register as requested in checklist
router.post('/register', handleRegister);

/**
 * Logs in users with email + password and returns auth cookie.
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Please fill in all fields.' });
    if (!EMAIL_REGEX.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });

    let user;
    if (isDbConnected()) {
      user = await User.findOne({ email: email.toLowerCase().trim() });
    } else {
      user = findMockUserByEmail(email);
    }

    if (!user) return res.status(404).json({ error: 'No account found with this email. Please sign up first.' });

    const matches = await bcrypt.compare(password, user.password_hash);
    if (!matches) return res.status(401).json({ error: 'Incorrect password. Please try again.' });

    setAuthCookie(res, user.id || user._id);
    return res.json({ success: true, user: sanitizeUser(user) });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Failed to log in.' });
  }
});

/**
 * Clears auth cookie to log current user out.
 */
router.post('/logout', (req, res) => {
  res.clearCookie('auth_token');
  return res.json({ success: true });
});

/**
 * Returns current authenticated user profile for frontend route guards.
 */
router.get('/me', requireAuth, (req, res) => {
  return res.json({ user: sanitizeUser(req.user) });
});

export default router;

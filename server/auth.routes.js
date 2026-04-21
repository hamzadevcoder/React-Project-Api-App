import express from 'express';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
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
 * Creates a random 6-digit verification code.
 */
const generateVerificationCode = () => String(Math.floor(100000 + Math.random() * 900000));

/**
 * Sends verification email using SMTP credentials in environment variables.
 */
const sendVerificationEmail = async (toEmail, code) => {
  console.log(`[EMAIL CODE] ${toEmail} -> ${code}`);
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log(`[DEV EMAIL] verification code for ${toEmail}: ${code}`);
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: 'Your verification code',
      text: `Your verification code is ${code}. It expires in 10 minutes.`,
    });
    return true;
  } catch (error) {
    console.error(`[EMAIL] Failed to send code to ${toEmail}:`, error.message);
    return false;
  }
};

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
    const verificationCode = generateVerificationCode();
    const verificationExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const userData = {
      full_name: fullName.trim(),
      email: normalizedEmail,
      password_hash: passwordHash,
      email_verified: false,
      verification_code: verificationCode,
      verification_code_expires_at: verificationExpiry,
    };

    if (isDbConnected()) {
      user = await User.create(userData);
    } else {
      user = saveMockUser(userData);
    }

    const emailSent = await sendVerificationEmail(user.email, verificationCode);
    if (!emailSent && process.env.REQUIRE_EMAIL_DELIVERY === 'true') {
      return res.status(503).json({ error: 'Unable to send verification email right now. Please try again later.' });
    }
    return res.status(201).json({ success: true, email: user.email });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Failed to create account.' });
  }
};

/**
 * Registers a new account and sends email verification code.
 */
router.post('/signup', handleRegister);

// Alias for /signup to support /register as requested in checklist
router.post('/register', handleRegister);

/**
 * Verifies a 6-digit code, marks email verified, and logs user in.
 */
router.post('/verify-email', async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: 'Email and code are required.' });

    let user;
    if (isDbConnected()) {
      user = await User.findOne({ email: email.toLowerCase().trim() });
    } else {
      user = findMockUserByEmail(email);
    }

    if (!user) return res.status(404).json({ error: 'No account found with this email. Please sign up first.' });

    const expiry = user.verification_code_expires_at instanceof Date ? user.verification_code_expires_at : new Date(user.verification_code_expires_at);
    if (!expiry || expiry.getTime() < Date.now()) return res.status(400).json({ error: 'Code expired. Click Resend.' });

    if (user.verification_code !== code) return res.status(400).json({ error: 'Incorrect code. Please try again.' });

    user.email_verified = true;
    user.verification_code = null;
    user.verification_code_expires_at = null;
    
    if (isDbConnected()) {
      await user.save();
    } else {
      saveMockUser(user);
    }

    setAuthCookie(res, user.id || user._id);
    return res.json({ success: true, user: sanitizeUser(user) });
  } catch (error) {
    console.error('Verify email error:', error);
    return res.status(500).json({ error: 'Failed to verify email.' });
  }
});

/**
 * Resends a new verification code and extends expiry by 10 minutes.
 */
router.post('/resend-code', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    let user;
    if (isDbConnected()) {
      user = await User.findOne({ email: email.toLowerCase().trim() });
    } else {
      user = findMockUserByEmail(email);
    }

    if (!user) return res.status(404).json({ error: 'No account found with this email. Please sign up first.' });
    if (user.email_verified) return res.status(400).json({ error: 'Email is already verified.' });

    user.verification_code = generateVerificationCode();
    user.verification_code_expires_at = new Date(Date.now() + 10 * 60 * 1000);
    
    if (isDbConnected()) {
      await user.save();
    } else {
      saveMockUser(user);
    }

    const emailSent = await sendVerificationEmail(user.email, user.verification_code);
    if (!emailSent && process.env.REQUIRE_EMAIL_DELIVERY === 'true') {
      return res.status(503).json({ error: 'Unable to resend code right now. Please try again later.' });
    }
    return res.json({ success: true });
  } catch (error) {
    console.error('Resend code error:', error);
    return res.status(500).json({ error: 'Failed to resend code.' });
  }
});

/**
 * Logs in verified users with email + password and returns auth cookie.
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

    if (!user.email_verified) {
      return res.status(403).json({ error: 'Please verify your email first.', requiresVerification: true, email: user.email });
    }

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

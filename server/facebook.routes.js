import express from 'express';
import facebookService from './facebook.service.js';
import { requireAuth } from './middleware/auth.middleware.js';

const router = express.Router();

const CACHE_TTL_MS = 5 * 60 * 1000;
const graphCache = new Map();

/**
 * Returns a deterministic cache key for each user+section request.
 */
const getCacheKey = (userId, section) => `${userId}:${section}`;

/**
 * Clears all cached Graph API responses for a specific user.
 */
const clearUserCache = (userId) => {
  for (const key of graphCache.keys()) {
    if (key.startsWith(`${userId}:`)) {
      graphCache.delete(key);
    }
  }
};

/**
 * Returns Graph API endpoint configuration for each data section.
 */
const getSectionConfig = (section) => {
  switch (section) {
    case 'profile':
      return { endpoint: '/me', params: { fields: 'id,name,email,picture,birthday' } };
    case 'friends':
      return { endpoint: '/me/friends', params: { fields: 'name,picture.width(50)' } };
    case 'posts':
      return { endpoint: '/me/posts', params: { limit: 10, fields: 'message,created_time,full_picture' } };
    case 'photos':
      return { endpoint: '/me/photos', params: { type: 'uploaded', limit: 12, fields: 'images,created_time' } };
    case 'pages':
      return { endpoint: '/me/accounts', params: { fields: 'name,category,followers_count,picture.width(50)' } };
    case 'likes':
      return { endpoint: '/me/likes', params: { fields: 'name,category,picture.width(50)', limit: 15 } };
    default:
      return null;
  }
};

/**
 * Fetches a section from Graph API with 5-minute cache per user.
 */
const fetchSectionData = async (user, section) => {
  const cacheKey = getCacheKey(user.id, section);
  const cached = graphCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  const config = getSectionConfig(section);
  if (!config) {
    const error = new Error('Invalid section');
    error.statusCode = 400;
    throw error;
  }

  const data = await facebookService.get(config.endpoint, user.facebook_access_token, config.params);
  graphCache.set(cacheKey, { data, expiresAt: Date.now() + CACHE_TTL_MS });
  return data;
};

/**
 * GET /api/facebook/status
 * Returns connection state to the frontend.
 */
router.get('/status', requireAuth, (req, res) => {
  if (req.user.facebook_access_token) {
    return res.json({
      connected: true,
      profile: req.user.facebook_profile
    });
  }
  
  return res.json({ connected: false, profile: null });
});

/**
 * POST /api/facebook/connect
 * Receives short-lived token from frontend, exchanges it, tests it, and stores it.
 */
router.post('/connect', requireAuth, async (req, res) => {
  try {
    const { shortLivedToken } = req.body;
    if (!shortLivedToken) {
      return res.status(400).json({ error: 'Missing shortLivedToken' });
    }

    // 1. Prefer exchanging for a long-lived token, but fall back to short-lived token
    // if exchange is unavailable (common when FB env vars are missing in deployment).
    let effectiveToken = shortLivedToken;
    try {
      const tokenData = await facebookService.exchangeForLongLivedToken(shortLivedToken);
      if (tokenData?.access_token) {
        effectiveToken = tokenData.access_token;
      }
    } catch (exchangeError) {
      console.warn('[Facebook Connect] Token exchange failed, using short-lived token:', exchangeError.message);
    }

    // 2. Fetch basic user profile to confirm token works & cache identity
    const profile = await facebookService.get('/me', effectiveToken, {
      fields: 'id,name,email,picture,birthday'
    });

    req.user.facebook_access_token = effectiveToken;
    req.user.facebook_user_id = profile.id;
    req.user.facebook_profile = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      birthday: profile.birthday,
      picture: profile.picture?.data?.url || profile.picture,
    };
    await req.user.save();
    clearUserCache(req.user.id);

    res.json({ success: true, profile: req.user.facebook_profile });
  } catch (error) {
    console.error('Connect error:', error);
    res.status(500).json({ error: 'Failed to connect Facebook account', details: error.message });
  }
});

/**
 * POST /api/facebook/oauth/exchange-code
 * Exchanges an OAuth authorization code for a user access token.
 */
router.post('/oauth/exchange-code', requireAuth, async (req, res) => {
  try {
    const { code, redirectUri } = req.body;
    if (!code || !redirectUri) {
      return res.status(400).json({ error: 'Missing OAuth code or redirectUri' });
    }

    const tokenData = await facebookService.exchangeAuthorizationCode(code, redirectUri);
    if (!tokenData?.access_token) {
      return res.status(502).json({ error: 'Facebook did not return an access token' });
    }

    return res.json({
      success: true,
      accessToken: tokenData.access_token,
      tokenType: tokenData.token_type,
      expiresIn: tokenData.expires_in,
    });
  } catch (error) {
    console.error('OAuth code exchange error:', error.response?.data || error.message);
    return res.status(500).json({
      error: 'Failed to exchange Facebook OAuth code',
      details: error.response?.data?.error?.message || error.message,
    });
  }
});

/**
 * DELETE /api/facebook/disconnect
 * Revokes Graph API token via the API and clears local mock DB.
 */
router.delete('/disconnect', requireAuth, async (req, res) => {
  try {
    if (req.user.facebook_access_token && req.user.facebook_user_id) {
      // Revoke from Facebook side
      await facebookService.delete(`/${req.user.facebook_user_id}/permissions`, req.user.facebook_access_token);
    }

    req.user.facebook_access_token = null;
    req.user.facebook_user_id = null;
    req.user.facebook_profile = null;
    await req.user.save();
    clearUserCache(req.user.id);

    res.json({ success: true, connected: false });
  } catch (error) {
    console.error('Disconnect error:', error);
    res.status(500).json({ error: 'Failed to fully disconnect', details: error.message });
  }
});

/**
 * Handles section endpoints and returns mapped auth errors.
 */
const handleSection = async (req, res, section) => {
  try {
    if (!req.user.facebook_access_token) {
      return res.status(401).json({ error: { code: 190, message: 'User is not connected' } });
    }

    const data = await fetchSectionData(req.user, section);
    res.json(data);
  } catch (error) {
    const statusCode = error.statusCode || (error.code === 190 ? 401 : 500);
    res.status(statusCode).json({
      error: { code: error.code, message: error.message, isAuthError: error.isAuthError }
    });
  }
};

router.get('/profile', requireAuth, async (req, res) => handleSection(req, res, 'profile'));
router.get('/friends', requireAuth, async (req, res) => handleSection(req, res, 'friends'));
router.get('/posts', requireAuth, async (req, res) => handleSection(req, res, 'posts'));
router.get('/photos', requireAuth, async (req, res) => handleSection(req, res, 'photos'));
router.get('/pages', requireAuth, async (req, res) => handleSection(req, res, 'pages'));
router.get('/likes', requireAuth, async (req, res) => handleSection(req, res, 'likes'));
router.get('/data/:section', requireAuth, async (req, res) => handleSection(req, res, req.params.section));

export default router;

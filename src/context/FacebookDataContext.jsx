import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import api from '../utils/api';

const FacebookDataContext = createContext(null);
const FB_SESSION_KEY = 'graph_app_fb_connection';

/* ─── localStorage helpers ─────────────────────────────────── */
const loadFbSession = () => {
  try { return JSON.parse(localStorage.getItem(FB_SESSION_KEY) || 'null'); }
  catch { return null; }
};

const saveFbSession = (data) =>
  localStorage.setItem(FB_SESSION_KEY, JSON.stringify(data));

const clearFbSession = () =>
  localStorage.removeItem(FB_SESSION_KEY);

const safeParseJson = async (response) => {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    const error = new Error('Facebook returned an invalid response while connecting.');
    error.code = response.status || 500;
    throw error;
  }
};

/* ─── provider ─────────────────────────────────────────────── */
export const FacebookDataProvider = ({ children }) => {
  const { isLoggedIn, authReady } = useAuth();
  const [connected, setConnected]   = useState(false);
  const [profile,   setProfile]     = useState(null);
  const [fbData,    setFbData]      = useState(null);   // raw Graph API data
  const [loading,   setLoading]     = useState(true);

  /* Restore FB session from localStorage on mount */
  useEffect(() => {
    if (!authReady) return;
    if (!isLoggedIn) {
      setConnected(false);
      setProfile(null);
      setFbData(null);
      setLoading(false);
      return;
    }

    // 1. Check for a pending token from a redirect fallback
    const pendingToken = localStorage.getItem('fb_pending_token');
    if (pendingToken) {
      localStorage.removeItem('fb_pending_token');
      connectAccount(pendingToken);
      return; // connectAccount will handle the rest
    }

    // 2. Load existing session
    const saved = loadFbSession();
    if (saved) {
      setConnected(true);
      setProfile(saved.profile);
      setFbData(saved.fbData || null);
    }
    setLoading(false);
  }, [authReady, isLoggedIn]);

  /**
   * Called after Facebook SDK login returns an access token.
   * Sends short-lived token to backend for exchange and storage.
   */
  const connectAccount = async (shortLivedToken) => {
    try {
      // 1. Send to backend for long-lived exchange and persistence
      const res = await api.post('/facebook/connect', { shortLivedToken });
      
      const { profile } = res.data;
      const fbData = {
        accessToken: shortLivedToken, // Fallback for client-side calls
        ...profile
      };

      saveFbSession({ profile, fbData });
      setConnected(true);
      setProfile(profile);
      setFbData(fbData);

      return { success: true };
    } catch (err) {
      console.error('connectAccount error:', err);
      // Fallback: If backend fails (e.g. no DB), try client-side only
      console.log('Backend connection failed, falling back to client-side only mode.');
      
      try {
        const fields = 'id,name,picture.width(200).height(200)';
        const graphRes = await fetch(
          `https://graph.facebook.com/me?fields=${fields}&access_token=${shortLivedToken}`
        );
        const data = await safeParseJson(graphRes);
        if (!graphRes.ok) throw new Error(data?.error?.message || 'Failed to fetch Facebook profile.');

        const profile = {
          id:      data.id,
          name:    data.name,
          picture: data.picture?.data?.url || '',
        };
        const fbData = { accessToken: shortLivedToken, ...profile };

        saveFbSession({ profile, fbData });
        setConnected(true);
        setProfile(profile);
        setFbData(fbData);
        return { success: true };
      } catch (clientErr) {
        return { success: false, error: clientErr.message };
      }
    }
  };

  /**
   * Disconnects FB account — clears localStorage and resets state.
   */
  const disconnectAccount = () => {
    clearFbSession();
    setConnected(false);
    setProfile(null);
    setFbData(null);

    // Also revoke FB SDK session if available
    if (window.FB) {
      window.FB.logout?.(() => {});
    }
  };

  /**
   * Re-reads localStorage (used as a refresh mechanism).
   */
  const checkConnectionStatus = () => {
    const saved = loadFbSession();
    if (saved) {
      setConnected(true);
      setProfile(saved.profile);
      setFbData(saved.fbData || null);
    } else {
      setConnected(false);
      setProfile(null);
      setFbData(null);
    }
  };

  return (
    <FacebookDataContext.Provider
      value={{
        connected,
        profile,
        fbData,
        loading,
        connectAccount,
        disconnectAccount,
        checkConnectionStatus,
      }}
    >
      {children}
    </FacebookDataContext.Provider>
  );
};

export const useFacebookContext = () => useContext(FacebookDataContext);

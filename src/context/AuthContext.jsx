import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]         = useState(null);
  const [authReady, setAuthReady] = useState(false);

  /* restore session on mount from /api/auth/me */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await Promise.race([
          api.get('/auth/me'),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Auth check timeout')), 5000)
          ),
        ]);
        if (res.data?.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        // Not logged in or server down — ignore
        console.log('[Auth] No active session found.');
      } finally {
        setAuthReady(true);
      }
    };
    checkAuth();
  }, []);

  /* ── signup ── */
  const signup = async ({ fullName, email, password, confirmPassword }) => {
    try {
      const res = await api.post('/auth/signup', { fullName, email, password, confirmPassword });
      if (res.data?.user) {
        setUser(res.data.user);
      }
      return {
        success: true,
        email: res.data.email,
        user: res.data.user,
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  /* ── login ── */
  const login = async ({ email, password }) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      setUser(res.data.user);
      return { success: true, user: res.data.user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  /* ── logout ── */
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      setUser(null);
    }
  };

  /* ── refreshMe ── */
  const refreshMe = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.data?.user) setUser(res.data.user);
    } catch {
      // Ignore refresh failures; consumer can rely on existing auth state.
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        authReady,
        login,
        signup,
        logout,
        refreshMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

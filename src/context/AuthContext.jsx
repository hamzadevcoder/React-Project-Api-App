import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const STORAGE_KEY = 'graph_app_users';
const SESSION_KEY = 'graph_app_session';

/* ─── helpers ─────────────────────────────────────────────── */
const getUsers = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
};

const saveUsers = (users) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

const getSession = () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
  catch { return null; }
};

const saveSession = (user) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));

const clearSession = () => localStorage.removeItem(SESSION_KEY);

const sanitize = (u) => ({
  id: u.id,
  name: u.fullName,
  full_name: u.fullName,
  email: u.email,
  email_verified: true,
  appId: `app_${u.id.slice(-8)}`,
});

/* ─── provider ────────────────────────────────────────────── */
export const AuthProvider = ({ children }) => {
  const [user, setUser]         = useState(null);
  const [authReady, setAuthReady] = useState(false);

  /* restore session on mount */
  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
    setAuthReady(true);
  }, []);

  /* ── signup ── */
  const signup = async ({ fullName, email, password, confirmPassword }) => {
    if (!fullName || !email || !password || !confirmPassword)
      return { success: false, error: 'Please fill in all required fields.' };

    if (!EMAIL_REGEX.test(email))
      return { success: false, error: 'Please enter a valid email address.' };

    if (password.length < 6)
      return { success: false, error: 'Password must be at least 6 characters.' };

    if (password !== confirmPassword)
      return { success: false, error: 'Passwords do not match.' };

    const users = getUsers();
    const normalizedEmail = email.toLowerCase().trim();

    if (users.find((u) => u.email === normalizedEmail))
      return { success: false, error: 'An account with this email already exists.' };

    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      fullName: fullName.trim(),
      email: normalizedEmail,
      password,           // stored locally — fine for a dev tool
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    const profile = sanitize(newUser);
    saveSession(profile);
    setUser(profile);
    return { success: true, user: profile };
  };

  /* ── login ── */
  const login = async ({ email, password }) => {
    if (!EMAIL_REGEX.test(email || ''))
      return { success: false, error: 'Please enter a valid email address.' };

    if ((password || '').length < 6)
      return { success: false, error: 'Password must be at least 6 characters.' };

    const users = getUsers();
    const found = users.find(
      (u) => u.email === email.toLowerCase().trim() && u.password === password,
    );

    if (!found)
      return { success: false, error: 'No account found or incorrect password.' };

    const profile = sanitize(found);
    saveSession(profile);
    setUser(profile);
    return { success: true, user: profile };
  };

  /* ── verifyEmail (no-op — verification removed) ── */
  const verifyEmail = async () => ({ success: true });

  /* ── resendCode (no-op) ── */
  const resendCode = async () => ({ success: true });

  /* ── logout ── */
  const logout = async () => {
    clearSession();
    setUser(null);
  };

  /* ── refreshMe ── */
  const refreshMe = async () => {
    const session = getSession();
    if (session) setUser(session);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        authReady,
        login,
        signup,
        verifyEmail,
        resendCode,
        logout,
        refreshMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

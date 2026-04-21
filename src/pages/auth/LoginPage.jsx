import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Globe, User, Mail, Lock, AlertCircle } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

const LoginPage = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleChange = (e) => {
    setError('');
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    if (!EMAIL_REGEX.test(form.email)) { setError('Please enter a valid email address.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }

    if (mode === 'signup') {
      if (!form.name.trim()) { setError('Please enter your full name.'); return; }
      if (!form.confirmPassword) { setError('Please confirm your password.'); return; }
      if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        const result = await login({ email: form.email, password: form.password });
        if (!result.success) {
          setError(result.error);
          return;
        }
        navigate('/dashboard');
        return;
      }

      // Signup
      const result = await signup({
        fullName: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      // No email verification — go straight to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Unhandled submission error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-dark-bg flex flex-col items-center justify-center p-4">
      {/* Facebook Brand Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-facebook-blue text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg">
            <Globe size={28} strokeWidth={2.5} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-facebook-blue tracking-tight">Graph API Explorer</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Developer Reference Dashboard</p>
      </div>

      <div className="bg-white dark:bg-dark-card w-full max-w-sm rounded-2xl shadow-xl border border-gray-200 dark:border-dark-border overflow-hidden">

        {/* Mode Tabs */}
        <div className="flex border-b border-gray-100 dark:border-dark-border">
          {[{ key: 'login', label: 'Log In' }, { key: 'signup', label: 'Sign Up' }].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setMode(key); setError(''); }}
              className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${mode === key ? 'text-facebook-blue border-b-2 border-facebook-blue' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Full Name — signup only */}
          {mode === 'signup' && (
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                id="signup-name"
                name="name"
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-facebook-blue focus:border-transparent dark:text-white transition"
              />
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              id="auth-email"
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-facebook-blue dark:text-white transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              id="auth-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl pl-10 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-facebook-blue dark:text-white transition"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Confirm Password — signup only */}
          {mode === 'signup' && (
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                id="signup-confirm-password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-facebook-blue dark:text-white transition"
              />
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 p-3 rounded-lg">
              <AlertCircle size={14} className="shrink-0" /> {error}
            </div>
          )}

          {mode === 'login' && (
            <div className="text-right">
              <a href="#" className="text-xs text-facebook-blue hover:underline">Forgot password?</a>
            </div>
          )}

          <button
            id="auth-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full bg-facebook-blue hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 shadow-md shadow-blue-500/20"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : mode === 'login' ? 'Log In' : 'Create Account'}
          </button>

          {mode === 'login' && (
            <div className="text-center text-xs text-gray-500 pt-1">
              Don't have an account?{' '}
              <button type="button" onClick={() => { setMode('signup'); setError(''); }} className="text-facebook-blue font-semibold hover:underline">
                Sign Up
              </button>
            </div>
          )}

          {mode === 'signup' && (
            <div className="text-center text-xs text-gray-500 pt-1">
              Already have an account?{' '}
              <button type="button" onClick={() => { setMode('login'); setError(''); }} className="text-facebook-blue font-semibold hover:underline">
                Log In
              </button>
            </div>
          )}
        </form>
      </div>

      <p className="text-xs text-gray-400 mt-6 text-center">
        Graph API Explorer — Developer Tools
      </p>
    </div>
  );
};

export default LoginPage;

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CODE_LENGTH = 6;

/**
 * Verification page for entering 6-digit email code after signup/login.
 */
const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { verifyEmail, resendCode } = useAuth();

  const email = useMemo(() => state?.email || '', [state?.email]);
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) navigate('/login', { replace: true });
  }, [email, navigate]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = window.setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => window.clearInterval(interval);
  }, [timer]);

  /**
   * Updates one code digit and auto-focuses the next field.
   */
  const handleDigitChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setError('');

    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Supports backspace navigation across digit inputs.
   */
  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /**
   * Verifies the entered 6-digit code with the backend.
   */
  const handleVerify = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    const code = digits.join('');
    if (code.length !== CODE_LENGTH) {
      setError('Please enter the full 6-digit code.');
      return;
    }

    setLoading(true);
    const result = await verifyEmail({ email, code });
    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setSuccess('Email verified successfully. Redirecting...');
    navigate('/dashboard', { replace: true });
  };

  /**
   * Sends a new code once resend cooldown timer reaches zero.
   */
  const handleResend = async () => {
    if (timer > 0) return;
    setResending(true);
    setError('');
    setSuccess('');
    const result = await resendCode(email);
    setResending(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setTimer(60);
    setDigits(Array(CODE_LENGTH).fill(''));
    setSuccess('A new verification code has been sent.');
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-dark-bg flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-card w-full max-w-md rounded-2xl shadow-xl border border-gray-200 dark:border-dark-border p-6">
        <div className="flex items-center gap-2 mb-3 text-facebook-blue">
          <Mail size={18} />
          <h1 className="text-lg font-bold">Verify Your Email</h1>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          We sent a 6-digit code to <span className="font-semibold">{email}</span>. Enter it below.
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(event) => handleDigitChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                className="w-12 h-12 text-center text-xl font-bold border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-facebook-blue dark:bg-dark-bg dark:text-white"
              />
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 p-3 rounded-lg">
              <AlertCircle size={14} className="shrink-0" /> {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-xs bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 p-3 rounded-lg">
              <CheckCircle2 size={14} className="shrink-0" /> {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-facebook-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition disabled:opacity-70"
          >
            {loading ? 'Verifying...' : 'Verify and Continue'}
          </button>
        </form>

        <button
          type="button"
          onClick={handleResend}
          disabled={timer > 0 || resending}
          className="w-full mt-3 text-sm font-semibold text-facebook-blue disabled:text-gray-400"
        >
          {resending ? 'Sending...' : timer > 0 ? `Resend Code in ${timer}s` : 'Resend Code'}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailPage;

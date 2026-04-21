import { useEffect } from 'react';

/**
 * Facebook OAuth Callback Page
 * 
 * Facebook redirects here after the user authorizes your app.
 * This page reads the access_token from the URL hash (#access_token=...)
 * and sends it back to the opener window via postMessage, then closes itself.
 * 
 * Required: Add http://localhost:5173/auth/facebook/callback
 * to "Valid OAuth Redirect URIs" in your Meta App → Facebook Login → Settings
 */
const FacebookCallbackPage = () => {
  useEffect(() => {
    // 1. Try to find the token in the hash (implicit flow default)
    const hash = window.location.hash;
    const hashParams = new URLSearchParams(hash.replace('#', ''));
    
    // 2. Try to find it in search (if redirected as query params)
    const searchParams = new URLSearchParams(window.location.search);

    const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
    const code = searchParams.get('code') || hashParams.get('code');
    const state = searchParams.get('state') || hashParams.get('state');
    const error       = hashParams.get('error')        || searchParams.get('error');
    const errorReason = hashParams.get('error_reason') || searchParams.get('error_reason') || searchParams.get('error_description');

    console.log('[FB Callback] Token:', !!accessToken, 'Error:', error || errorReason);

    if (window.opener) {
      if (accessToken) {
        window.opener.postMessage(
          { type: 'FB_OAUTH_SUCCESS', accessToken },
          window.location.origin
        );
      } else if (code) {
        window.opener.postMessage(
          { type: 'FB_OAUTH_SUCCESS', code, state },
          window.location.origin
        );
      } else {
        window.opener.postMessage(
          { type: 'FB_OAUTH_ERROR', error: errorReason || error || 'Authorization failed' },
          window.location.origin
        );
      }
      // Give the message a moment to send before closing
      setTimeout(() => window.close(), 100);
    } else {
      // Fallback: no opener — store in localStorage and redirect back to dashboard
      if (accessToken) {
        localStorage.setItem('fb_pending_token', accessToken);
        window.location.href = '/dashboard';
      } else if (code) {
        localStorage.setItem('fb_pending_code', code);
        if (state) localStorage.setItem('fb_pending_state', state);
        window.location.href = '/dashboard';
      } else {
        // If error and no opener, just go home
        window.location.href = '/';
      }
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F0F2F5',
      fontFamily: 'sans-serif',
    }}>
      <div style={{ textAlign: 'center', color: '#606770' }}>
        <div style={{
          width: 40, height: 40,
          border: '3px solid #1877F2',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 16px',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p>Connecting your Facebook account…</p>
      </div>
    </div>
  );
};

export default FacebookCallbackPage;

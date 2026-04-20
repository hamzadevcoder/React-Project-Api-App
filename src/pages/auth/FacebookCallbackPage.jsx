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
    const hash = window.location.hash;         // e.g. #access_token=EAA...&token_type=bearer&...
    const params = new URLSearchParams(hash.replace('#', ''));
    const accessToken = params.get('access_token');
    const error       = params.get('error');
    const errorReason = params.get('error_reason');

    if (window.opener) {
      if (accessToken) {
        window.opener.postMessage(
          { type: 'FB_OAUTH_SUCCESS', accessToken },
          window.location.origin
        );
      } else {
        window.opener.postMessage(
          { type: 'FB_OAUTH_ERROR', error: errorReason || error || 'Authorization failed' },
          window.location.origin
        );
      }
      window.close();
    } else {
      // Fallback: no opener — store in localStorage and redirect back to dashboard
      if (accessToken) {
        localStorage.setItem('fb_pending_token', accessToken);
      }
      window.location.href = '/dashboard';
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

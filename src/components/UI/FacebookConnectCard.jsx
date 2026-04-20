import React, { useEffect, useRef, useState } from 'react';
import { useFacebookContext } from '../../context/FacebookDataContext';
import { Facebook, Link, Unlink, AlertCircle } from 'lucide-react';

const APP_ID       = import.meta.env.VITE_FB_APP_ID;
const REDIRECT_URI = `${window.location.origin}/auth/facebook/callback`;
const SCOPES       = 'public_profile';

const FacebookConnectCard = () => {
  const { connected, profile, connectAccount, disconnectAccount, loading } = useFacebookContext();
  const [authInProgress, setAuthInProgress] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const popupRef = useRef(null);
  const listenerRef = useRef(null);

  /* Clean up popup + listener if component unmounts mid-auth */
  useEffect(() => {
    return () => {
      if (listenerRef.current) window.removeEventListener('message', listenerRef.current);
      if (popupRef.current && !popupRef.current.closed) popupRef.current.close();
    };
  }, []);

  const handleConnect = () => {
    setErrorMsg('');

    if (!APP_ID || APP_ID === 'your_numeric_meta_app_id_here') {
      setErrorMsg('Missing VITE_FB_APP_ID in .env. Add your Meta App ID and restart the dev server.');
      return;
    }

    // Build the Facebook OAuth URL (implicit / token flow)
    const oauthUrl =
      `https://www.facebook.com/dialog/oauth` +
      `?client_id=${APP_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=${encodeURIComponent(SCOPES)}` +
      `&response_type=token` +
      `&display=popup`;

    // Open a centered popup
    const width  = 600;
    const height = 700;
    const left   = Math.round(window.screenX + (window.outerWidth  - width)  / 2);
    const top    = Math.round(window.screenY + (window.outerHeight - height) / 2);

    const popup = window.open(
      oauthUrl,
      'fb_oauth',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes`
    );

    if (!popup) {
      setErrorMsg('Popup was blocked. Please allow popups for localhost in your browser and try again.');
      return;
    }

    popupRef.current = popup;
    setAuthInProgress(true);

    /* Listen for the postMessage from FacebookCallbackPage */
    const onMessage = async (event) => {
      console.log('[FB Connect] Message received:', event.data?.type, event.origin);
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === 'FB_OAUTH_SUCCESS') {
        window.removeEventListener('message', onMessage);
        listenerRef.current = null;

        console.log('[FB Connect] Success! Token received.');
        const result = await connectAccount(event.data.accessToken);
        setAuthInProgress(false);
        if (!result.success) {
          console.error('[FB Connect] connectAccount failed:', result.error);
          setErrorMsg(result.error || 'Failed to connect Facebook account.');
        }
      }

      if (event.data?.type === 'FB_OAUTH_ERROR') {
        window.removeEventListener('message', onMessage);
        listenerRef.current = null;
        setAuthInProgress(false);
        console.error('[FB Connect] Authorization error:', event.data.error);
        setErrorMsg(event.data.error || 'Facebook authorization was cancelled.');
      }
    };

    listenerRef.current = onMessage;
    window.addEventListener('message', onMessage);

    /* Poll for popup being manually closed */
    const poll = setInterval(() => {
      if (popup.closed) {
        clearInterval(poll);
        window.removeEventListener('message', onMessage);
        listenerRef.current = null;
        if (authInProgress) {
          setAuthInProgress(false);
        }
      }
    }, 500);
  };

  /* ── loading skeleton ── */
  if (loading) {
    return (
      <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm animate-pulse flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 dark:bg-dark-bg rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-dark-bg rounded w-32" />
            <div className="h-3 bg-gray-200 dark:bg-dark-bg rounded w-24" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left: avatar + name */}
        <div className="flex items-center gap-4">
          {connected ? (
            <img
              src={profile?.picture}
              alt="Connected FB User"
              className="w-12 h-12 rounded-lg border border-gray-200 shadow-sm"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-[#F0F2F5] dark:bg-dark-bg flex items-center justify-center text-facebook-blue">
              <Facebook size={24} strokeWidth={2.5} />
            </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {connected ? profile?.name : 'Facebook Account'}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="relative flex h-2 w-2">
                {connected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${connected ? 'bg-green-500' : 'bg-gray-400'}`} />
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {connected ? `Connected as ${profile?.email || profile?.name}` : 'Not Connected'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: connect / disconnect button */}
        <div>
          {connected ? (
            <button
              onClick={disconnectAccount}
              className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-dark-bg dark:text-gray-300 dark:hover:bg-dark-border transition flex items-center gap-1.5"
            >
              <Unlink size={14} /> Disconnect
            </button>
          ) : (
            <button
              id="fb-connect-btn"
              onClick={handleConnect}
              disabled={authInProgress}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-facebook-blue text-white hover:bg-blue-700 disabled:opacity-70 transition flex items-center gap-1.5"
            >
              {authInProgress ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connecting…
                </>
              ) : (
                <><Link size={14} /> Connect Facebook</>
              )}
            </button>
          )}
        </div>
      </div>

      {errorMsg && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default FacebookConnectCard;

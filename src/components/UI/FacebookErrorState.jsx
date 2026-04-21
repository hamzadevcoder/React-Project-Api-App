import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useFacebookContext } from '../../context/FacebookDataContext';

export const FacebookErrorState = ({ error, onRetry }) => {
  const { disconnectAccount } = useFacebookContext();

  const handleReconnect = () => {
    disconnectAccount();
    // Reconnecting requires user to push "Connect" again on the main card.
    // In a more complex app, this could auto-open the dialog.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-3">
      <AlertCircle className="text-red-500" size={28} />
      
      <div className="text-sm">
        <div className="font-bold text-red-700 dark:text-red-400 mb-1">
          {error.isAuthError ? "Your Facebook session has expired." : "Failed to load data"}
        </div>
        <p className="text-red-600/80 dark:text-red-300 text-xs">
          {error.code === 200 && "A required Facebook permission is missing. Please reconnect with full permissions."}
          {(error.code === 4 || error.code === 32) && "Facebook data is temporarily unavailable. Please try again in a few minutes."}
          {error.code === 100 && "This feature is pending Facebook app review and will be available soon."}
          {(![200, 4, 32, 100].includes(error.code) && !error.isAuthError) && error.message}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-2">
        {error.isAuthError || error.code === 200 ? (
          <button 
            onClick={handleReconnect}
            className="px-4 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg shadow disabled:opacity-50"
          >
            Reconnect Account
          </button>
        ) : null}
        
        {/* Do not show retry for explicit Rate limits or App Unapproved state to avoid infinite pinging */}
        {![4, 32, 100].includes(error.code) && onRetry && (
          <button 
            onClick={onRetry}
            className="px-4 py-1.5 bg-white text-red-600 border border-red-200 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5"
          >
            <RefreshCw size={12} /> Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default FacebookErrorState;

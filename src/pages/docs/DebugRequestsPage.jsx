import React, { useState } from 'react';
import { Bug, Search, ChevronRight } from 'lucide-react';

const DebugRequestsPage = () => {
  const [token, setToken] = useState('');
  const [debugged, setDebugged] = useState(false);

  return (
    <div className="w-full pb-16 space-y-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-dark-border">
        <div className="flex items-center gap-3 mb-2">
          <Bug className="text-red-500" size={28} />
          <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Debug Requests</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">Use Meta's debugging tools to inspect tokens, trace API calls, and diagnose errors in your integration.</p>
      </div>

      {/* Token Debugger Mini UI */}
      <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 dark:text-white flex items-center gap-2"><Search size={18} className="text-facebook-blue" /> Access Token Debugger</h2>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Paste your access token here..."
            value={token}
            onChange={e => setToken(e.target.value)}
            className="flex-1 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg px-4 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-facebook-blue dark:text-white"
          />
          <button
            onClick={() => token && setDebugged(true)}
            className="bg-facebook-blue text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center gap-2"
          >
            Debug <ChevronRight size={16} />
          </button>
        </div>

        {debugged && (
          <div className="bg-gray-900 rounded-xl p-5 text-sm font-mono space-y-3 text-gray-300 animate-in fade-in duration-300">
            {[
              ['App ID', '123456789012345'],
              ['App Name', 'My Facebook App'],
              ['Type', 'USER'],
              ['Issued At', new Date().toLocaleString()],
              ['Expires At', 'never (long-lived token)'],
              ['Scopes', 'public_profile, email, pages_read_engagement'],
              ['Valid', 'true ✓'],
            ].map(([key, val]) => (
              <div key={key} className="flex items-start gap-3">
                <span className="text-blue-400 w-36 shrink-0">{key}:</span>
                <span className={val.includes('true') ? 'text-green-400' : undefined}>{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Common error codes */}
      <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Common Error Codes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-bg text-gray-500">
                <th className="text-left px-4 py-2 rounded-l-lg font-semibold">Code</th>
                <th className="text-left px-4 py-2 font-semibold">Subcode</th>
                <th className="text-left px-4 py-2 font-semibold">Meaning</th>
                <th className="text-left px-4 py-2 rounded-r-lg font-semibold">Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
              {[
                ['100', '', 'Invalid parameter', 'Check parameter names and types'],
                ['190', '463', 'Access token expired', 'Refresh or re-authenticate the user'],
                ['200', '', 'Permission error', 'Request the needed permission'],
                ['4', '', 'Rate limit exceeded', 'Implement exponential backoff'],
                ['10', '', 'Permission not granted', 'Enable permission in App Review'],
              ].map(([code, sub, meaning, fix]) => (
                <tr key={code+sub} className="hover:bg-gray-50 dark:hover:bg-dark-bg/50">
                  <td className="px-4 py-3 font-mono font-bold text-red-500">{code}</td>
                  <td className="px-4 py-3 font-mono text-gray-500">{sub || '—'}</td>
                  <td className="px-4 py-3 dark:text-white">{meaning}</td>
                  <td className="px-4 py-3 text-gray-500">{fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DebugRequestsPage;

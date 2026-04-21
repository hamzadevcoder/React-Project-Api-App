import React from 'react';
import { ShieldCheck, Lock, Key } from 'lucide-react';

const SecureRequestsPage = () => (
  <div className="w-full pb-16 space-y-8 animate-in fade-in duration-500">
    <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-dark-border">
      <div className="flex items-center gap-3 mb-2">
        <ShieldCheck className="text-green-500" size={28} />
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Secure Requests</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
        Securing your Graph API requests is critical. Meta provides several mechanisms to prevent token theft, replay attacks, and unauthorized access to user data.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { icon: Lock, title: 'HTTPS Only', desc: 'All Graph API requests must use HTTPS. HTTP requests are rejected automatically.', color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
        { icon: Key, title: 'App Secret Proof', desc: 'Generate an HMAC-SHA256 hash of your access token using your App Secret to verify server-to-server calls.', color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
        { icon: ShieldCheck, title: 'Token Expiry', desc: 'Short-lived tokens expire in ~1 hour. Use the token exchange endpoint to get long-lived tokens.', color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
      ].map(({ icon: Icon, title, desc, color }) => (
        <div key={title} className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-5 shadow-sm">
          <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
            <Icon size={20} className={color.split(' ')[0]} />
          </div>
          <h3 className="font-bold dark:text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
        </div>
      ))}
    </div>

    {/* App Secret Proof */}
    <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-4 dark:text-white">Generating App Secret Proof</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">When calling the API from a server, include the <code className="bg-gray-100 dark:bg-dark-bg px-1.5 rounded font-mono text-xs text-facebook-blue">appsecret_proof</code> parameter:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Node.js Example</div>
          <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto">
{`const crypto = require('crypto');

const appsecret_proof = crypto
  .createHmac('sha256', APP_SECRET)
  .update(ACCESS_TOKEN)
  .digest('hex');

const url = \`https://graph.facebook.com/v25.0/me
  ?access_token=\${ACCESS_TOKEN}
  &appsecret_proof=\${appsecret_proof}\`;`}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Python Example</div>
          <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto">
{`import hmac, hashlib

appsecret_proof = hmac.new(
    APP_SECRET.encode('utf-8'),
    ACCESS_TOKEN.encode('utf-8'),
    hashlib.sha256
).hexdigest()

url = (
  "https://graph.facebook.com/v25.0/me"
  f"?access_token={ACCESS_TOKEN}"
  f"&appsecret_proof={appsecret_proof}"
)`}
          </div>
        </div>
      </div>
    </div>

    {/* Token Types */}
    <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-4 dark:text-white">Access Token Types</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-dark-bg text-gray-500">
              <th className="text-left px-4 py-2 rounded-l-lg font-semibold">Token Type</th>
              <th className="text-left px-4 py-2 font-semibold">Lifespan</th>
              <th className="text-left px-4 py-2 font-semibold">Use Case</th>
              <th className="text-left px-4 py-2 rounded-r-lg font-semibold">Store Securely?</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
            {[
              ['User Token (short)', '~1 hour', 'Client-side user actions', 'No (expires soon)'],
              ['User Token (long-lived)', '~60 days', 'Server-side user calls', 'Yes (encrypted)'],
              ['Page Token', 'Never expires', 'Posting to pages', 'Yes (very sensitive)'],
              ['App Token', 'Never expires', 'Server-to-server calls', 'Yes (never expose)'],
            ].map(([type, life, use, store]) => (
              <tr key={type} className="hover:bg-gray-50 dark:hover:bg-dark-bg/50">
                <td className="px-4 py-3 font-semibold dark:text-white">{type}</td>
                <td className="px-4 py-3 text-gray-500">{life}</td>
                <td className="px-4 py-3 text-gray-500">{use}</td>
                <td className="px-4 py-3 text-xs font-bold">
                  <span className={store.startsWith('Yes') ? 'text-green-600' : 'text-gray-400'}>{store}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default SecureRequestsPage;

import React from 'react';
import { AlertTriangle } from 'lucide-react';

const errors = [
  {
    type: 'OAuthException',
    code: 190,
    message: 'Error validating access token: Session has expired.',
    solution: 'The user\'s session has expired. Use the re-authentication flow to get a new access token.',
    severity: 'error'
  },
  {
    type: 'GraphMethodException',
    code: 100,
    message: 'Invalid parameter: fields contains an invalid field.',
    solution: 'Check the `fields` parameter and ensure all requested fields are valid for this node type.',
    severity: 'warning'
  },
  {
    type: 'GraphThrottleException',
    code: 32,
    message: 'Application request limit reached.',
    solution: 'You have exceeded the rate limit. Use exponential backoff before retrying.',
    severity: 'error'
  },
  {
    type: 'GraphPermissionsException',
    code: 200,
    message: 'Requires extended permission: publish_actions.',
    solution: 'Request this permission via App Review before using this endpoint.',
    severity: 'warning'
  },
];

const HandleErrorsPage = () => (
  <div className="w-full pb-16 space-y-8 animate-in fade-in duration-500">
    <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-dark-border">
      <div className="flex items-center gap-3 mb-2">
        <AlertTriangle className="text-amber-500" size={28} />
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Handle Errors</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
        When an API request fails, the Graph API returns a structured JSON error object. Understanding this structure is key to building resilient apps.
      </p>
    </div>

    {/* Error Structure */}
    <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-4 dark:text-white">Error Response Structure</h2>
      <div className="bg-gray-900 rounded-xl p-5 font-mono text-sm text-gray-300 overflow-x-auto">
{`{
  "error": {
    "message": "Invalid OAuth access token.",
    "type": "OAuthException",
    "code": 190,
    "fbtrace_id": "EJplcsCHuLt"
  }
}`}
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        {[
          { field: 'message', desc: 'Human-readable error description' },
          { field: 'type', desc: 'Exception class name' },
          { field: 'code', desc: 'Numeric error code' },
          { field: 'fbtrace_id', desc: 'Trace ID for Meta support' },
        ].map(({ field, desc }) => (
          <div key={field} className="bg-gray-50 dark:bg-dark-bg rounded-lg p-3">
            <code className="text-facebook-blue font-bold">{field}</code>
            <p className="mt-1 text-gray-500">{desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Common Errors */}
    <div className="space-y-4">
      <h2 className="text-lg font-bold dark:text-white">Common Error Examples</h2>
      {errors.map((err, i) => (
        <div key={i} className={`bg-white dark:bg-dark-card border rounded-2xl p-5 shadow-sm ${err.severity === 'error' ? 'border-red-200 dark:border-red-900/30' : 'border-amber-200 dark:border-amber-900/30'}`}>
          <div className="flex items-start justify-between mb-3 gap-4">
            <div className="flex items-center gap-2">
              <code className="font-mono font-bold text-sm text-gray-900 dark:text-white">{err.type}</code>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${err.severity === 'error' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                Code {err.code}
              </span>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-red-400 mb-3">
            "{err.message}"
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="font-semibold text-gray-700 dark:text-gray-300 shrink-0">Solution:</span>
            <span className="text-gray-600 dark:text-gray-400">{err.solution}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HandleErrorsPage;

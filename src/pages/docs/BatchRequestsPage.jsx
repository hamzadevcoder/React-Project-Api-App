import React from 'react';
import { Layers, AlertCircle } from 'lucide-react';

const BatchRequestsPage = () => (
  <div className="w-full pb-16 space-y-8 animate-in fade-in duration-500">
    <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-dark-border">
      <div className="flex items-center gap-3 mb-2">
        <Layers className="text-purple-500" size={28} />
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Batch Requests</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
        The Graph API supports batching — sending multiple API calls in a single HTTP request. Batching reduces network overhead and makes your app more efficient. All responses are returned in a single response body.
      </p>
    </div>

    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4 flex gap-3">
      <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
      <div className="text-sm text-amber-800 dark:text-amber-300">
        <strong>Limit:</strong> A batch can contain up to <strong>50</strong> individual requests. Batches also share the same access token.
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Example Batch Request</h2>
        <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto">
{`curl -X POST "https://graph.facebook.com/v25.0/" \\
  -d 'access_token=YOUR_TOKEN' \\
  -d 'batch=[
    {
      "method": "GET",
      "relative_url": "me"
    },
    {
      "method": "GET",
      "relative_url": "me/friends?limit=5"
    }
  ]'`}
        </div>
      </div>

      <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Response Format</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">The response is a JSON array where each item corresponds to one request in the batch:</p>
        <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-green-400 overflow-x-auto">
{`[
  {
    "code": 200,
    "headers": [...],
    "body": "{\\"id\\":\\"12345\\",\\"name\\":\\"John\\"}"
  },
  {
    "code": 200,
    "headers": [...],
    "body": "{\\"data\\":[...]}"
  }
]`}
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-4 dark:text-white">Best Practices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Group related calls', desc: 'Batch requests that need the same access token and are logically related.' },
          { title: 'Handle partial failures', desc: 'Individual items in a batch can fail. Always check the `code` field per response.' },
          { title: 'respect rate limits', desc: 'Batching reduces HTTP calls but the rate limits still apply to each individual request.' },
          { title: 'Dependencies via JSONPath', desc: 'Use `{result=request_name:$.path}` to reference results from previous steps in the same batch.' },
        ].map(({ title, desc }) => (
          <div key={title} className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
            <div className="font-semibold text-sm dark:text-white mb-1">{title}</div>
            <div className="text-xs text-gray-500">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default BatchRequestsPage;

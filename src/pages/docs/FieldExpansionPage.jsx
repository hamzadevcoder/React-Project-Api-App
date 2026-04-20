import React, { useState } from 'react';
import { Expand } from 'lucide-react';

const FieldExpansionPage = () => {
  const [fields, setFields] = useState('id,name,email');

  const mockResponse = fields.split(',').reduce((acc, f) => {
    const key = f.trim();
    const mockValues = { id: '10023456789', name: 'Jane Doe', email: 'jane@example.com', birthday: '01/15/1990', location: { name: 'San Francisco, CA' }, friends: { data: [], summary: { total_count: 428 } } };
    if (key && mockValues[key] !== undefined) acc[key] = mockValues[key];
    return acc;
  }, {});

  return (
    <div className="w-full pb-16 space-y-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-dark-border">
        <div className="flex items-center gap-3 mb-2">
          <Expand className="text-indigo-500" size={28} />
          <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Field Expansion</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
          By default, Graph API nodes return only a limited set of fields. Use the <code className="bg-gray-100 dark:bg-dark-bg px-1.5 py-0.5 rounded text-facebook-blue font-mono text-xs">fields</code> parameter to request specific fields and nested data, reducing payload size.
        </p>
      </div>

      {/* Interactive Field Selector */}
      <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Interactive Explorer</h2>
        <p className="text-sm text-gray-500 mb-3">Edit the fields below — try: <code className="bg-gray-100 dark:bg-dark-bg px-1.5 rounded text-xs font-mono">id,name,email,birthday,friends</code></p>
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-gray-900 rounded-xl flex items-center overflow-hidden">
            <span className="text-gray-500 font-mono text-xs px-4 whitespace-nowrap">GET /me?fields=</span>
            <input
              value={fields}
              onChange={e => setFields(e.target.value)}
              className="flex-1 bg-transparent text-green-400 font-mono text-sm py-3 pr-4 outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Request</div>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto">
              {`curl "https://graph.facebook.com/v25.0/me?fields=${fields}&access_token=TOKEN"`}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Response</div>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-green-400 overflow-x-auto min-h-[80px]">
              {JSON.stringify(Object.keys(mockResponse).length > 0 ? mockResponse : { error: 'Unknown fields' }, null, 2)}
            </div>
          </div>
        </div>
      </div>

      {/* Nested fields */}
      <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Nested Field Expansion</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">You can expand nested objects and edges by using dot notation or curly braces:</p>
        <div className="space-y-3">
          {[
            { label: 'Basic nested field', code: 'GET /me?fields=location{name,country}' },
            { label: 'Edge with limit', code: 'GET /me?fields=friends.limit(5){name,picture}' },
            { label: 'Multiple nested', code: 'GET /me?fields=photos{images{source,width}}' },
          ].map(({ label, code }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">{label}</span>
              <div className="bg-gray-900 rounded-lg px-4 py-2.5 font-mono text-xs text-gray-300">{code}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldExpansionPage;

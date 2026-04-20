import React from 'react';
import { BookOpen, Zap, ShieldCheck, Activity, Code } from 'lucide-react';

const OverviewPage = () => (
  <div className="w-full pb-16 space-y-8 animate-in fade-in duration-500">
    {/* Hero */}
    <div className="bg-gradient-to-br from-facebook-blue to-indigo-600 rounded-2xl p-8 md:p-12 text-white shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen size={32} className="opacity-80" />
        <span className="uppercase tracking-widest text-blue-200 text-xs font-semibold">Reference</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Graph API Overview</h1>
      <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
        The Graph API is the primary way to get data in and out of the Meta social graph. It's a low-level HTTP-based API that you can use to programmatically query data, post new stories, manage ads, upload photos, and perform a wide variety of other tasks.
      </p>
    </div>

    {/* What is it */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4 dark:text-white">What is the Graph API?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">The Graph API is named after the idea of a "social graph" — a representation of the information on Facebook. It's composed of:</p>
        <ul className="space-y-3">
          {['Nodes — individual objects (e.g., a User, a Photo, a Page)', 'Edges — connections between objects (e.g., a Page\'s Photos)', 'Fields — data about those objects (e.g., the birthday of a User)'].map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-facebook-blue/10 text-facebook-blue font-bold text-xs flex items-center justify-center">{i + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Base URL</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">All API requests are made to the base URL:</p>
        <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 mb-4">
          https://graph.facebook.com/
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Followed by the API version and the path of the resource. For example, to read a user's public profile:</p>
        <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300 mt-3">
          GET /v25.0/me?access_token=YOUR_TOKEN
        </div>
      </div>
    </div>

    {/* Features grid */}
    <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6 dark:text-white">Core Capabilities</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Activity, title: 'Read Data', desc: 'Query user, page, and media data' },
          { icon: Code, title: 'Post Content', desc: 'Publish posts, photos, and videos' },
          { icon: ShieldCheck, title: 'Secure OAuth', desc: 'Token-based authentication' },
          { icon: Zap, title: 'Real-time', desc: 'Webhooks and subscriptions' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl text-center">
            <Icon className="mx-auto mb-3 text-facebook-blue" size={28} />
            <div className="font-semibold text-sm dark:text-white mb-1">{title}</div>
            <div className="text-xs text-gray-500">{desc}</div>
          </div>
        ))}
      </div>
    </div>

    {/* API Versions */}
    <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4 dark:text-white">API Versions</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
        The Graph API is versioned. The current version is <code className="bg-gray-100 dark:bg-dark-bg px-1.5 py-0.5 rounded text-facebook-blue font-mono text-xs">v25.0</code>. Meta releases a new version approximately every 6 months, and each version is supported for at least 2 years.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-dark-bg">
              <th className="text-left px-4 py-2 text-gray-500 font-semibold rounded-l-lg">Version</th>
              <th className="text-left px-4 py-2 text-gray-500 font-semibold">Status</th>
              <th className="text-left px-4 py-2 text-gray-500 font-semibold rounded-r-lg">Available Until</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
            {[
              { v: 'v25.0', status: 'Current', until: 'Feb 2027' },
              { v: 'v24.0', status: 'Active', until: 'Sep 2026' },
              { v: 'v23.0', status: 'Active', until: 'Mar 2026' },
              { v: 'v22.0', status: 'Deprecated', until: 'Sep 2025' },
            ].map(row => (
              <tr key={row.v} className="hover:bg-gray-50 dark:hover:bg-dark-bg/50">
                <td className="px-4 py-3 font-mono text-facebook-blue font-semibold">{row.v}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${row.status === 'Current' ? 'bg-green-100 text-green-700' : row.status === 'Deprecated' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{row.until}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default OverviewPage;

import React from 'react';
import { ScrollText, Calendar, ArrowRight } from 'lucide-react';

const entries = [
  {
    version: 'v25.0',
    date: 'Feb 4, 2025',
    badge: 'Current',
    changes: [
      { type: 'new', text: '`threads_basic` permission is now generally available for all Threads users.' },
      { type: 'new', text: 'Added `media_product_type` field to Instagram Media nodes.' },
      { type: 'deprecated', text: '`user_likes` permission is deprecated. Use `pages_likes` instead.' },
      { type: 'breaking', text: 'Removed `app_roles` field from the App node. Use Business Roles API.' },
    ]
  },
  {
    version: 'v24.0',
    date: 'Sep 17, 2024',
    badge: 'Active',
    changes: [
      { type: 'new', text: 'Added support for WhatsApp `flows` in the template message API.' },
      { type: 'new', text: '`instagram_business_basic` permission launched for creators.' },
      { type: 'deprecated', text: 'Legacy Marketing API batch endpoints deprecated. Migrate to Async Requests.' },
    ]
  },
  {
    version: 'v23.0',
    date: 'Mar 5, 2024',
    badge: 'Active',
    changes: [
      { type: 'new', text: 'Introduced `Leads Retrieval API v2` with CRM export support.' },
      { type: 'breaking', text: '`catalog_management` now requires Business Verification for new apps.' },
      { type: 'fix', text: 'Fixed pagination cursor inconsistency on `/me/friends` edge in EU region.' },
    ]
  },
];

const typeStyles = {
  new: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  deprecated: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  breaking: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  fix: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

const ChangelogPage = () => (
  <div className="w-full pb-16 space-y-8 animate-in fade-in duration-500">
    <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-dark-border">
      <div className="flex items-center gap-3 mb-2">
        <ScrollText className="text-gray-600 dark:text-gray-300" size={28} />
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Changelog</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
        Track all updates, breaking changes, feature additions, and deprecations across Graph API versions.
      </p>
    </div>

    {/* Legend */}
    <div className="flex flex-wrap gap-3">
      {Object.entries(typeStyles).map(([key, cls]) => (
        <span key={key} className={`${cls} px-2 py-0.5 rounded text-[10px] font-bold uppercase`}>{key}</span>
      ))}
    </div>

    {/* Entries */}
    <div className="space-y-6">
      {entries.map(entry => (
        <div key={entry.version} className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-dark-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-lg dark:text-white font-mono">{entry.version}</h2>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${entry.badge === 'Current' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                {entry.badge}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar size={14} /> {entry.date}
            </div>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-dark-border/50">
            {entry.changes.map((change, i) => (
              <div key={i} className="px-6 py-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition">
                <span className={`mt-0.5 shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${typeStyles[change.type]}`}>
                  {change.type}
                </span>
                <p className="text-sm text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: change.text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-dark-border px-1.5 py-0.5 rounded font-mono text-xs text-facebook-blue">$1</code>') }}
                />
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-gray-50 dark:bg-dark-bg/50 border-t border-gray-100 dark:border-dark-border">
            <a href="https://developers.facebook.com/docs/graph-api/changelog" target="_blank" rel="noreferrer"
              className="text-xs text-facebook-blue flex items-center gap-1 hover:underline font-medium">
              View full {entry.version} migration guide <ArrowRight size={12} />
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ChangelogPage;

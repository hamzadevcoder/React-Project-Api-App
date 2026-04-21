import React from 'react';
import { scopes } from '../data/scopes';
import ScopeCard from '../components/UI/ScopeCard';
import { Layers, Zap, BookOpen } from 'lucide-react';

const Home = () => {
  const totalScopes = scopes.length;
  
  // Get counts per category
  const categoryCounts = scopes.reduce((acc, scope) => {
    acc[scope.category] = (acc[scope.category] || 0) + 1;
    return acc;
  }, {});

  // For the homepage showcase, let's pick 6 featured or diverse scopes
  const featuredScopes = scopes.filter(s => 
    ['ads_management', 'instagram_basic', 'pages_read_engagement', 'whatsapp_business_messaging', 'threads_content_publish', 'user_location'].includes(s.id)
  );

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-facebook-blue to-indigo-600 rounded-3xl p-8 md:p-12 text-white mb-10 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mx-20 -my-20"></div>
        <div className="absolute bottom-0 right-40 w-48 h-48 bg-indigo-900/30 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <Zap size={16} className="text-yellow-300" />
            <span>Developer Reference Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Meta Graph API <br className="hidden md:block"/>Explorer Interactive
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
            A beautiful, visual directory of all {totalScopes} Graph API permissions. Understand what data endpoints return and what features they unlock with realistic mock dashboards.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10">
              <Layers className="text-blue-300" />
              <div>
                <div className="text-2xl font-bold">{totalScopes}</div>
                <div className="text-xs text-blue-200 uppercase tracking-wider">Total Scopes</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10">
              <BookOpen className="text-blue-300" />
              <div>
                <div className="text-2xl font-bold">{Object.keys(categoryCounts).length}</div>
                <div className="text-xs text-blue-200 uppercase tracking-wider">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          Explore by Category
        </h2>
        <div className="flex flex-wrap gap-3">
          {Object.entries(categoryCounts).sort().map(([category, count]) => (
             <div key={category} className="px-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg shadow-sm flex items-center gap-3 hover:border-facebook-blue/50 transition cursor-default">
               <span className="font-medium text-sm text-gray-700 dark:text-gray-300">{category}</span>
               <span className="bg-gray-100 dark:bg-dark-bg text-gray-500 text-xs px-2 py-0.5 rounded-full">{count}</span>
             </div>
          ))}
        </div>
      </section>

      {/* Featured Scopes */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Featured Scopes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredScopes.map(scope => (
            <ScopeCard key={scope.id} scope={scope} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

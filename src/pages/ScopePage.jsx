import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Shield, Info, Code, LayoutDashboard, Copy, Check, ExternalLink } from 'lucide-react';
import { scopes } from '../data/scopes';
import ScopeBadge from '../components/UI/ScopeBadge';
import StatusBadge from '../components/UI/StatusBadge';
import CodeBlock from '../components/UI/CodeBlock';
import DependencyChip from '../components/UI/DependencyChip';

// Lazy load dashboards
const AdsDashboard = lazy(() => import('../dashboards/AdsDashboard'));
const InstagramDashboard = lazy(() => import('../dashboards/InstagramDashboard'));
const PagesDashboard = lazy(() => import('../dashboards/PagesDashboard'));
const UserDashboard = lazy(() => import('../dashboards/UserDashboard'));
const CommerceDashboard = lazy(() => import('../dashboards/CommerceDashboard'));
const WhatsAppDashboard = lazy(() => import('../dashboards/WhatsAppDashboard'));
const ThreadsDashboard = lazy(() => import('../dashboards/ThreadsDashboard'));
const LeadsDashboard = lazy(() => import('../dashboards/LeadsDashboard'));
const MessagingDashboard = lazy(() => import('../dashboards/MessagingDashboard'));
const GamingDashboard = lazy(() => import('../dashboards/GamingDashboard'));
const InsightsDashboard = lazy(() => import('../dashboards/InsightsDashboard'));
const GenericDashboard = lazy(() => import('../dashboards/GenericDashboard'));

const dashboardComponents = {
  ads: AdsDashboard,
  instagram: InstagramDashboard,
  pages: PagesDashboard,
  user: UserDashboard,
  commerce: CommerceDashboard,
  whatsapp: WhatsAppDashboard,
  threads: ThreadsDashboard,
  leads: LeadsDashboard,
  messaging: MessagingDashboard,
  gaming: GamingDashboard,
  insights: InsightsDashboard,
  generic: GenericDashboard
};

const ScopePage = () => {
  const { scopeId } = useParams();
  const [loading, setLoading] = useState(true);
  
  const [copiedScope, setCopiedScope] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  
  // Fake loading state for UX polish
  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [scopeId]);

  const scope = scopes.find(s => s.id === scopeId);

  if (!scope) {
    return <Navigate to="/404" replace />;
  }

  const DashboardComponent = dashboardComponents[scope.dashboardType] || GenericDashboard;

  const handleCopyScope = () => {
    navigator.clipboard.writeText(scope.name);
    setCopiedScope(true);
    setTimeout(() => setCopiedScope(false), 2000);
  };

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(scope.curlExample);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  if (loading) {
    return (
      <div className="w-full animate-pulse">
        <div className="h-40 bg-gray-200 dark:bg-dark-card rounded-2xl mb-8"></div>
        <div className="h-64 bg-gray-200 dark:bg-dark-card rounded-2xl mb-8"></div>
        <div className="grid grid-cols-3 gap-6">
          <div className="h-32 bg-gray-200 dark:bg-dark-card rounded-xl"></div>
          <div className="h-32 bg-gray-200 dark:bg-dark-card rounded-xl"></div>
          <div className="h-32 bg-gray-200 dark:bg-dark-card rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in duration-300 relative pb-16">
      {/* 1. Header Section */}
      <section className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-dark-border mb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ScopeBadge scopeName={scope.name} size="lg" />
              <StatusBadge level={scope.accessLevel} />
              <span className="bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {scope.category}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {scope.name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Permission
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
              {scope.description}
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Column: Info & Requirements */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* 2. What This Scope Does */}
          <section className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-dark-border">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-dark-border pb-3">
              <Info className="text-facebook-blue" size={20} />
              Allowed Usages
            </h2>
            <ul className="space-y-3">
              {scope.allowedUsage.map((usage, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-facebook-blue mt-1.5"></span>
                  <span>{usage}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Dependencies */}
          <section className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-dark-border">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-dark-border pb-3">
              <Shield className="text-facebook-green" size={20} />
              Dependencies
            </h2>
            {scope.dependencies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {scope.dependencies.map(dep => (
                  <DependencyChip key={dep} scopeId={dep} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No dependencies required.</p>
            )}
          </section>
          
          {/* 6. App Review */}
          <section className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-dark-border">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-dark-border pb-3">
              <Check className="text-purple-500" size={20} />
              App Review Requirements
            </h2>
            <div className="space-y-4">
              <div>
                <span className="block text-sm font-semibold mb-1">Use Case Description</span>
                <p className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-bg p-3 rounded-lg border border-gray-100 dark:border-dark-border">
                  "Our application uses `{scope.name}` to provide users with analytics and dashboarding features securely via the Graph API."
                </p>
              </div>
              <div>
                <span className="block text-sm font-semibold mb-2">Screencast Checklist</span>
                <ol className="text-xs text-gray-600 dark:text-gray-400 list-decimal pl-4 space-y-1.5 marker:text-gray-400">
                  <li>Show the Facebook Login button.</li>
                  <li>Go through the OAuth flow showing this permission requested.</li>
                  <li>Demonstrate how the data is used in the app UI.</li>
                  <li>Ensure the Facebook App ID is visible.</li>
                </ol>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Code & Dashboard */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 3. Example Endpoint */}
          <section className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-dark-border">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-dark-border pb-3">
              <Code className="text-orange-500" size={20} />
              Example Implementations
            </h2>
            
            <div className="space-y-4 shadow-inner">
              <CodeBlock 
                label="cURL Request" 
                language="bash" 
                code={scope.curlExample} 
              />
              <CodeBlock 
                label="JSON Response" 
                language="json" 
                code={JSON.stringify(scope.exampleResponse, null, 2)} 
              />
            </div>
          </section>

          {/* 4. Mock Dashboard */}
          <section className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-dark-border">
            <h2 className="text-lg font-bold flex items-center justify-between mb-6 border-b border-gray-100 dark:border-dark-border pb-3">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="text-instagram-pink" size={20} />
                <span>Mock Data Dashboard</span>
              </div>
              <span className="text-xs font-mono bg-gray-100 dark:bg-dark-bg text-gray-500 px-2 py-1 rounded">
                Type: {scope.dashboardType}
              </span>
            </h2>
            
            <div className="mt-4">
              <Suspense fallback={<div className="h-64 flex items-center justify-center text-gray-400">Loading dashboard UI...</div>}>
                <DashboardComponent />
              </Suspense>
            </div>
          </section>

        </div>
      </div>

      {/* 7. Quick Copy Panel */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col md:flex-row gap-3 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md p-2 rounded-xl shadow-xl border border-gray-200 dark:border-dark-border">
        <button 
          onClick={handleCopyScope}
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-bg rounded-lg text-sm font-medium transition"
        >
          {copiedScope ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-facebook-blue" />}
          <span>{copiedScope ? 'Copied!' : 'Copy Scope'}</span>
        </button>
        <button 
          onClick={handleCopyCurl}
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-bg rounded-lg text-sm font-medium transition"
        >
          {copiedCurl ? <Check size={16} className="text-green-500" /> : <Code size={16} className="text-orange-500" />}
          <span>{copiedCurl ? 'Copied!' : 'Copy cURL'}</span>
        </button>
        <div className="w-px bg-gray-200 dark:bg-dark-border my-2 hidden md:block"></div>
        <a 
          href={scope.metaDocsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-facebook-blue hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg text-sm font-medium transition"
        >
          <ExternalLink size={16} />
          <span>Official Docs</span>
        </a>
      </div>
      
    </div>
  );
};

export default ScopePage;

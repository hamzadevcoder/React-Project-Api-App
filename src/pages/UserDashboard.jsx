import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Activity, Code, Zap, CheckCircle, Bell, Terminal, LogOut, Key, BarChart2 } from 'lucide-react';
import FacebookConnectCard from '../components/UI/FacebookConnectCard';
import LiveFacebookDashboard from '../dashboards/UserDashboard';

const mockActivity = [
  { method: 'GET', endpoint: '/me/posts', status: 200, time: '2m ago', duration: '142ms' },
  { method: 'GET', endpoint: '/me?fields=id,name,email', status: 200, time: '9m ago', duration: '88ms' },
  { method: 'POST', endpoint: '/me/photos', status: 200, time: '18m ago', duration: '312ms' },
  { method: 'GET', endpoint: '/me/friends?limit=10', status: 200, time: '31m ago', duration: '94ms' },
  { method: 'GET', endpoint: '/{page-id}/insights', status: 400, time: '1h ago', duration: '—' },
  { method: 'GET', endpoint: '/me/videos', status: 200, time: '2h ago', duration: '208ms' },
];

const GlassCard = ({ children, className = '' }) => (
  <div className={`bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border border-white/60 dark:border-dark-border shadow-lg rounded-2xl ${className}`}>
    {children}
  </div>
);

const StatCard = ({ icon: Icon, label, value, color }) => (
  <GlassCard className="p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <div className="text-2xl font-bold dark:text-white">{value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
    </div>
  </GlassCard>
);

const Toggle = ({ label, defaultOn = false }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${on ? 'bg-facebook-blue' : 'bg-gray-300 dark:bg-gray-600'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${on ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
};

import HelperWalkthrough from '../components/UI/HelperWalkthrough';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="w-full pb-16 space-y-8 animate-in fade-in duration-500">
      <HelperWalkthrough />
      
      {/* Profile Header */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-facebook-blue to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30">
              {user?.avatar || 'JD'}
            </div>
            <div>
              <h1 className="text-2xl font-bold dark:text-white">{user?.name || 'John Doe'}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full font-bold uppercase">Developer</span>
                <span className="text-[10px] text-gray-400 font-mono">ID: {user?.appId}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 text-sm font-semibold transition-colors"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </GlassCard>

      {/* Connected Accounts Section */}
      <div>
        <h2 className="text-lg font-bold dark:text-white mb-3 pl-1">Connected Accounts</h2>
        <FacebookConnectCard />
      </div>

      <div>
        <h2 className="text-lg font-bold dark:text-white mb-3 pl-1">Live Facebook Data</h2>
        <LiveFacebookDashboard />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={Key} label="Active Scopes" value="12" color="bg-gradient-to-br from-facebook-blue to-indigo-500" />
        <StatCard icon={BarChart2} label="API Calls (Last 24h)" value="1,402" color="bg-gradient-to-br from-green-500 to-emerald-500" />
        <StatCard icon={CheckCircle} label="App Status" value="Live" color="bg-gradient-to-br from-purple-500 to-pink-500" />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <GlassCard className="lg:col-span-2 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 dark:border-dark-border">
            <Activity size={18} className="text-facebook-blue" />
            <h2 className="font-bold dark:text-white">Recent API Calls</h2>
            <span className="ml-auto text-[10px] text-gray-400">Live</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-dark-border/50">
            {mockActivity.map((call, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/80 dark:hover:bg-dark-bg/50 transition group">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono shrink-0 ${call.method === 'POST' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {call.method}
                </span>
                <code className="text-xs font-mono text-gray-700 dark:text-gray-300 flex-1 truncate">{call.endpoint}</code>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${call.status === 200 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {call.status}
                </span>
                <span className="text-[10px] text-gray-400 shrink-0 hidden sm:block">{call.duration}</span>
                <span className="text-[10px] text-gray-400 shrink-0">{call.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Settings Panel */}
        <GlassCard className="p-5">
          <h2 className="font-bold dark:text-white mb-4 flex items-center gap-2">
            <Zap size={16} className="text-purple-500" /> Settings
          </h2>
          <div className="divide-y divide-gray-100 dark:divide-dark-border/50">
            <Toggle label="🌙 Dark Mode" defaultOn={document.documentElement.classList.contains('dark')} />
            <Toggle label="🔔 Email Notifications" defaultOn={true} />
            <Toggle label="🛠️ Developer Mode" defaultOn={true} />
            <Toggle label="📊 Analytics Tracking" defaultOn={false} />
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-dark-border">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { icon: Code, label: 'Graph API Explorer', color: 'text-facebook-blue' },
                { icon: Terminal, label: 'Test API Call', color: 'text-green-500' },
                { icon: Bell, label: 'Rate Limit Status', color: 'text-orange-500' },
              ].map(({ icon: Icon, label, color }) => (
                <button key={label} className="w-full flex items-center gap-3 text-sm py-2 px-3 rounded-lg hover:bg-gray-100/80 dark:hover:bg-dark-bg/50 transition text-gray-700 dark:text-gray-300">
                  <Icon size={16} className={color} /> {label}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default UserDashboard;

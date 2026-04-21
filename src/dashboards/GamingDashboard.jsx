import React from 'react';
import KPICard from '../components/UI/KPICard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Globe, Users, Trophy } from 'lucide-react';

const mockLocaleData = [
  { locale: 'en_US', count: 45000 },
  { locale: 'pt_BR', count: 22000 },
  { locale: 'es_ES', count: 18000 },
  { locale: 'fr_FR', count: 12000 },
  { locale: 'de_DE', count: 9000 },
];

const GamingDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard title="Total Players" value="124.5K" trend="up" trendValue="+5%" icon={Users} color="facebook-blue" />
        <KPICard title="Locales Available" value="12" trend="up" trendValue="+2" icon={Globe} color="purple" />
        <KPICard title="Achievements Unlocked" value="842K" trend="up" trendValue="+12%" icon={Trophy} color="orange" />
      </div>

      <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
        <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Player Base by Locale</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockLocaleData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" opacity={0.2} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis dataKey="locale" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: 'none' }} />
              <Bar dataKey="count" fill="#E4405F" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/40 p-4 rounded-xl flex gap-3">
        <Globe className="text-blue-500 shrink-0" />
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Insight:</strong> The `gaming_user_locale` scope allows your game to automatically adjust its language settings to match the user's preferred Facebook locale, creating a frictionless onboarding experience.
        </p>
      </div>
    </div>
  );
};

export default GamingDashboard;

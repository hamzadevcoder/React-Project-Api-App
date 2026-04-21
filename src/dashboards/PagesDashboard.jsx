import React from 'react';
import KPICard from '../components/UI/KPICard';
import MockAvatar from '../components/UI/MockAvatar';
import DataTable from '../components/UI/DataTable';
import LoadingSkeleton from '../components/UI/LoadingSkeleton';
import FacebookErrorState from '../components/UI/FacebookErrorState';
import { useFacebookData } from '../hooks/useFacebookData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Eye, ThumbsUp, MessageSquare, Flag } from 'lucide-react';

const PagesDashboard = () => {
  const { data, loading, error, refetch } = useFacebookData('pages');

  if (loading) return <LoadingSkeleton type="card" lines={10} />;
  if (error) return <FacebookErrorState error={error} onRetry={refetch} />;

  const pages = data?.data || [];
  const activePage = pages[0]; // For this demo, we focus on the primary page

  if (!activePage) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-dark-card rounded-2xl border border-dashed border-gray-200 dark:border-dark-border">
        <Flag size={48} className="text-gray-300 mb-4" />
        <p className="text-gray-500 font-medium">No Facebook Pages found associated with this account.</p>
      </div>
    );
  }

  const chartData = [
    { day: 'Mon', reach: 4000, engagement: 2400 },
    { day: 'Tue', reach: 3000, engagement: 1398 },
    { day: 'Wed', reach: 2000, engagement: 9800 },
    { day: 'Thu', reach: 2780, engagement: 3908 },
    { day: 'Fri', reach: 1890, engagement: 4800 },
    { day: 'Sat', reach: 2390, engagement: 3800 },
    { day: 'Sun', reach: 3490, engagement: 4300 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Page Info Card */}
      <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl p-6 flex items-center gap-6 shadow-sm">
        <div className="relative">
          <img 
            src={activePage.picture?.data?.url} 
            className="w-24 h-24 rounded-2xl shadow-lg border-2 border-facebook-blue/10" 
            alt={activePage.name}
            crossOrigin="anonymous"
          />
          <div className="absolute -bottom-1 -right-1 bg-facebook-blue text-white p-1 rounded-lg">
            <Flag size={14} />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold dark:text-white">{activePage.name}</h2>
            <span className="bg-facebook-blue/10 text-facebook-blue text-[10px] uppercase px-2 py-0.5 rounded font-bold">Official Page</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md">
            Category: <span className="font-semibold text-facebook-blue">{activePage.category}</span>
          </p>
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="font-black text-xl text-gray-900 dark:text-white">{(activePage.fan_count || 0).toLocaleString()}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Followers</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-gray-900 dark:text-white">{(activePage.followers_count || 0).toLocaleString()}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Likes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Followers" value={activePage.fan_count || 0} trend="up" trendValue="Live" icon={Users} color="facebook-blue" />
        <KPICard title="Page Views" value="842" trend="up" trendValue="+5%" icon={Eye} color="facebook-green" />
        <KPICard title="Engagement" value="1.2k" trend="up" trendValue="+12%" icon={ThumbsUp} color="purple" />
        <KPICard title="Inquiry Rate" value="92%" trend="up" trendValue="Stable" icon={MessageSquare} color="orange" />
      </div>

      <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
        <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Engagement Overview (Sample)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1877F2" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1877F2" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#42B72A" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#42B72A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
              <Area type="monotone" dataKey="reach" stroke="#1877F2" fillOpacity={1} fill="url(#colorReach)" />
              <Area type="monotone" dataKey="engagement" stroke="#42B72A" fillOpacity={1} fill="url(#colorEngage)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <Flag size={18} className="text-facebook-blue" />
          All Managed Pages
        </h3>
        <DataTable 
          columns={[
            { 
              header: 'Page', 
              accessor: 'name', 
              cell: (row) => (
                <div className="flex items-center gap-3">
                  <img src={row.picture?.data?.url} className="w-8 h-8 rounded-lg" alt="" crossOrigin="anonymous" />
                  <div className="font-bold">{row.name}</div>
                </div>
              )
            },
            { header: 'Category', accessor: 'category' },
            { header: 'Followers', accessor: 'fan_count', cell: (row) => (row.fan_count || 0).toLocaleString() },
            { header: 'Talking About', accessor: 'talking_about_count', cell: (row) => (row.talking_about_count || 0).toLocaleString() },
          ]}
          data={pages}
          emptyMessage="No pages found."
        />
      </div>
    </div>
  );
};

export default PagesDashboard;

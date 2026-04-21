import React from 'react';
import KPICard from '../components/UI/KPICard';
import DataTable from '../components/UI/DataTable';
import LoadingSkeleton from '../components/UI/LoadingSkeleton';
import FacebookErrorState from '../components/UI/FacebookErrorState';
import { useFacebookData } from '../hooks/useFacebookData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, MousePointerClick, Eye, TrendingUp, Briefcase } from 'lucide-react';

const AdsDashboard = () => {
  const { data, loading, error, refetch } = useFacebookData('adaccounts');

  if (loading) return <LoadingSkeleton type="card" lines={10} />;
  if (error) return <FacebookErrorState error={error} onRetry={refetch} />;

  const adAccounts = data?.data || [];
  
  // Aggregate stats from all accounts or just use the first one for the summary
  const totalSpend = adAccounts.reduce((sum, acc) => sum + parseFloat(acc.amount_spent || 0), 0) / 100;
  const totalImpressions = adAccounts.reduce((sum, acc) => sum + (acc.insights?.data?.[0]?.impressions || 0), 0);
  const totalClicks = adAccounts.reduce((sum, acc) => sum + (acc.insights?.data?.[0]?.clicks || 0), 0);
  const avgCtr = adAccounts.length > 0 ? (adAccounts.reduce((sum, acc) => sum + parseFloat(acc.insights?.data?.[0]?.ctr || 0), 0) / adAccounts.length) : 0;

  // Format chart data from insights
  const chartData = adAccounts.map(acc => ({
    name: acc.name.substring(0, 10),
    spend: parseFloat(acc.amount_spent || 0) / 100,
    impressions: acc.insights?.data?.[0]?.impressions || 0,
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Total Spend" 
          value={`$${totalSpend.toLocaleString()}`} 
          trend="up" 
          trendValue="+Real-time" 
          icon={DollarSign} 
          color="facebook-blue" 
        />
        <KPICard 
          title="Impressions" 
          value={totalImpressions > 1000 ? `${(totalImpressions/1000).toFixed(1)}K` : totalImpressions} 
          trend="up" 
          trendValue="Live" 
          icon={Eye} 
          color="purple" 
        />
        <KPICard 
          title="Clicks" 
          value={totalClicks} 
          trend="up" 
          trendValue="Live" 
          icon={MousePointerClick} 
          color="orange" 
        />
        <KPICard 
          title="Avg CTR" 
          value={`${(avgCtr * 100).toFixed(2)}%`} 
          trend="up" 
          trendValue="Live" 
          icon={TrendingUp} 
          color="facebook-green" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Spend by Ad Account</h3>
          <div className="h-64">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} tickFormatter={(val) => `$${val}`} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="spend" fill="#1877F2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">No data available</div>
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Impressions by Account</h3>
          <div className="h-64">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} tickFormatter={(val) => val > 1000 ? `${val/1000}k` : val} />
                  <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                  <Bar dataKey="impressions" fill="#42B72A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">No data available</div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <Briefcase size={18} className="text-facebook-blue" />
          Active Ad Accounts
        </h3>
        <DataTable 
          columns={[
            { header: 'Account Name', accessor: 'name' },
            { 
              header: 'Status', 
              accessor: 'account_status',
              cell: (row) => {
                const statusMap = {
                  1: 'ACTIVE',
                  2: 'DISABLED',
                  3: 'UNSETTLED',
                  7: 'PENDING_REVIEW',
                  9: 'IN_GRACE_PERIOD'
                };
                const status = statusMap[row.account_status] || 'UNKNOWN';
                return (
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {status}
                  </span>
                );
              }
            },
            { header: 'Currency', accessor: 'currency' },
            { 
              header: 'Total Spend', 
              accessor: 'amount_spent',
              cell: (row) => `$${(parseFloat(row.amount_spent || 0) / 100).toLocaleString()}`
            },
            { 
              header: 'Balance', 
              accessor: 'balance',
              cell: (row) => `$${(parseFloat(row.balance || 0) / 100).toLocaleString()}`
            }
          ]}
          data={adAccounts}
          emptyMessage="No ad accounts found for this user."
        />
      </div>
    </div>
  );
};

export default AdsDashboard;

import React from 'react';
import KPICard from '../components/UI/KPICard';
import DataTable from '../components/UI/DataTable';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, MousePointerClick, Eye, TrendingUp } from 'lucide-react';

const mockChartData = Array.from({ length: 30 }).map((_, i) => ({
  day: i + 1,
  spend: Math.floor(Math.random() * 500) + 100,
  impressions: Math.floor(Math.random() * 5000) + 1000
}));

const mockCampaigns = [
  { name: 'Summer Retreat 2024', status: 'ACTIVE', budget: '$5,000', spend: '$1,204', impressions: '45,230', ctr: '1.2%' },
  { name: 'Retargeting - Cart Abandon', status: 'ACTIVE', budget: '$2,000', spend: '$1,800', impressions: '12,400', ctr: '3.4%' },
  { name: 'Brand Awareness Q3', status: 'PAUSED', budget: '$10,000', spend: '$10,000', impressions: '250,000', ctr: '0.8%' },
  { name: 'Lookalike 1% Buyers', status: 'ACTIVE', budget: '$3,500', spend: '$800', impressions: '15,200', ctr: '2.1%' },
  { name: 'Flash Sale Weekend', status: 'COMPLETED', budget: '$1,000', spend: '$1,000', impressions: '22,100', ctr: '4.5%' },
];

const AdsDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Spend" value="$14,804" trend="up" trendValue="+12%" icon={DollarSign} color="facebook-blue" />
        <KPICard title="Impressions" value="344.9K" trend="up" trendValue="+5%" icon={Eye} color="purple" />
        <KPICard title="Clicks" value="8,402" trend="down" trendValue="-2%" icon={MousePointerClick} color="orange" />
        <KPICard title="Avg CTR" value="2.4%" trend="up" trendValue="+0.4%" icon={TrendingUp} color="facebook-green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Daily Spend (Last 30 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} tickFormatter={(val) => `$${val}`} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="spend" stroke="#1877F2" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Impressions by Day</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData.slice(15, 30)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Bar dataKey="impressions" fill="#42B72A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Top Campaigns</h3>
        <DataTable 
          columns={[
            { header: 'Campaign Name', accessor: 'name' },
            { 
              header: 'Status', 
              accessor: 'status',
              cell: (row) => (
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  row.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                  row.status === 'PAUSED' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                  'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                  {row.status}
                </span>
              )
            },
            { header: 'Budget', accessor: 'budget' },
            { header: 'Spend', accessor: 'spend' },
            { header: 'Impressions', accessor: 'impressions' },
            { header: 'CTR', accessor: 'ctr' }
          ]}
          data={mockCampaigns}
        />
      </div>
    </div>
  );
};

export default AdsDashboard;

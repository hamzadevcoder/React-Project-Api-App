import React from 'react';
import KPICard from '../components/UI/KPICard';
import DataTable from '../components/UI/DataTable';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const mockRevenueData = Array.from({ length: 30 }).map((_, i) => ({
  day: i + 1,
  revenue: Math.floor(Math.random() * 2000) + 500,
  fillRate: Math.floor(Math.random() * 20) + 70
}));

const mockProperties = [
  { name: 'App iOS - Main Format', format: 'Banner', requests: '1.2M', impressions: '980K', fillRate: '81%', revenue: '$1,240' },
  { name: 'App Android - Interstitial', format: 'Interstitial', requests: '450K', impressions: '410K', fillRate: '91%', revenue: '$3,800' },
  { name: 'App iOS - Rewarded', format: 'Rewarded Video', requests: '200K', impressions: '190K', fillRate: '95%', revenue: '$5,210' },
];

const InsightsDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Aud. Rev." value="$12,450" trend="up" trendValue="+8%" icon={Activity} color="facebook-blue" />
        <KPICard title="impressions" value="2.4M" trend="up" trendValue="+12%" icon={Activity} color="purple" />
        <KPICard title="Avg eCPM" value="$5.18" trend="down" trendValue="-$0.12" icon={Activity} color="orange" />
        <KPICard title="Avg Fill Rate" value="88.4%" trend="up" trendValue="+1.2%" icon={Activity} color="facebook-green" />
      </div>

      <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
        <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Revenue Metrics (Last 30 Days)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockRevenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fontSize: 12}} tickFormatter={(v) => `$${v}`} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fontSize: 12}} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#1877F2" strokeWidth={3} dot={false} activeDot={{ r: 6 }} name="Revenue" />
              <Line yAxisId="right" type="monotone" dataKey="fillRate" stroke="#42B72A" strokeWidth={3} dot={false} activeDot={{ r: 6 }} name="Fill Rate" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Monetization Properties Breakdown</h3>
        <DataTable 
          columns={[
            { header: 'Property Name', accessor: 'name', cell: (row) => <span className="font-semibold">{row.name}</span> },
            { header: 'Ad Format', accessor: 'format' },
            { header: 'Requests', accessor: 'requests' },
            { header: 'Impressions', accessor: 'impressions' },
            { header: 'Fill Rate', accessor: 'fillRate', cell: (row) => <span className="text-green-600 dark:text-green-400 font-medium">{row.fillRate}</span> },
            { header: 'Est. Revenue', accessor: 'revenue' },
          ]}
          data={mockProperties}
        />
      </div>
    </div>
  );
};

export default InsightsDashboard;

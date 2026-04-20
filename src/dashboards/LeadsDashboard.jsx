import React from 'react';
import KPICard from '../components/UI/KPICard';
import DataTable from '../components/UI/DataTable';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, UserPlus, FileText, Phone } from 'lucide-react';

const mockFunnelData = [
  { stage: 'Impressions', count: 125000 },
  { stage: 'Clicks', count: 15400 },
  { stage: 'Form Opens', count: 4200 },
  { stage: 'Submissions', count: 864 }
];

const mockLeads = [
  { id: '101', name: 'John Smith', email: 'john.smith@example.com', phone: '+1 (555) 123-4567', form: 'Summer Catalog 2024', status: 'New', date: 'Oct 15, 2023, 10:45 AM' },
  { id: '102', name: 'Emily Davis', email: 'emily.d@test.com', phone: '+1 (555) 987-6543', form: 'Newsletter Signup', status: 'Contacted', date: 'Oct 15, 2023, 09:20 AM' },
  { id: '103', name: 'Michael Johnson', email: 'mjohnson@company.inc', phone: '+1 (555) 678-1234', form: 'B2B Demo Request', status: 'Qualified', date: 'Oct 14, 2023, 04:15 PM' },
  { id: '104', name: 'Sarah Wilson', email: 'swilson@mail.com', phone: '+1 (555) 321-7654', form: 'Summer Catalog 2024', status: 'New', date: 'Oct 14, 2023, 02:10 PM' },
  { id: '105', name: 'David Lee', email: 'david.lee@startup.io', phone: '+1 (555) 456-7890', form: 'B2B Demo Request', status: 'Converted', date: 'Oct 13, 2023, 11:30 AM' },
];

const LeadsDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Leads (30d)" value="864" trend="up" trendValue="+24%" icon={Users} color="facebook-blue" />
        <KPICard title="Conv. Rate" value="5.6%" trend="up" trendValue="+0.8%" icon={UserPlus} color="facebook-green" />
        <KPICard title="Cost per Lead" value="$12.40" trend="down" trendValue="-$1.20" icon={FileText} color="purple" />
        <KPICard title="Phone Provided" value="82%" trend="up" trendValue="+2%" icon={Phone} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Lead Generation Funnel</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockFunnelData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" opacity={0.2} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12}} width={100} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Bar dataKey="count" fill="#1877F2" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Top Performing Add/Forms</h3>
          <div className="space-y-4">
            <div className="p-3 border border-gray-100 dark:border-dark-border rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm dark:text-white">Summer Catalog 2024</span>
                <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded">420 leads</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div className="p-3 border border-gray-100 dark:border-dark-border rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm dark:text-white">B2B Demo Request</span>
                <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">215 leads</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            
            <div className="p-3 border border-gray-100 dark:border-dark-border rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm dark:text-white">Newsletter Signup</span>
                <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded">189 leads</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-700 dark:text-gray-300">Lead Retrievals (CRM View)</h3>
        </div>
        <DataTable 
          columns={[
            { header: 'Contact Name', accessor: 'name', cell: (row) => <div className="font-semibold">{row.name}</div> },
            { header: 'Email', accessor: 'email', cell: (row) => <div className="text-gray-500 dark:text-gray-400">{row.email}</div> },
            { header: 'Phone', accessor: 'phone' },
            { header: 'Form Source', accessor: 'form' },
            { 
              header: 'CRM Status', 
              accessor: 'status',
              cell: (row) => {
                const colors = {
                  'New': 'bg-blue-100 text-blue-700',
                  'Contacted': 'bg-purple-100 text-purple-700',
                  'Qualified': 'bg-amber-100 text-amber-700',
                  'Converted': 'bg-green-100 text-green-700'
                };
                return (
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${colors[row.status]}`}>
                    {row.status}
                  </span>
                )
              }
            },
            { header: 'Date Retrieved', accessor: 'date' }
          ]}
          data={mockLeads}
        />
      </div>
    </div>
  );
};

export default LeadsDashboard;

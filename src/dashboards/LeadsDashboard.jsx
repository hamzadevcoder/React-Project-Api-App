import React from 'react';
import KPICard from '../components/UI/KPICard';
import DataTable from '../components/UI/DataTable';
import LoadingSkeleton from '../components/UI/LoadingSkeleton';
import FacebookErrorState from '../components/UI/FacebookErrorState';
import { useFacebookData } from '../hooks/useFacebookData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, UserPlus, FileText, Phone, ClipboardList } from 'lucide-react';

const LeadsDashboard = () => {
  const { data, loading, error, refetch } = useFacebookData('leads');

  if (loading) return <LoadingSkeleton type="card" lines={10} />;
  if (error) return <FacebookErrorState error={error} onRetry={refetch} />;

  const pages = data?.data || [];
  
  // Flatten lead forms from all pages
  const allForms = pages.flatMap(page => 
    (page.leadgen_forms?.data || []).map(form => ({
      ...form,
      pageName: page.name
    }))
  ).sort((a, b) => (b.lead_count || 0) - (a.lead_count || 0));

  const totalLeads = allForms.reduce((sum, form) => sum + (form.lead_count || 0), 0);
  const activeForms = allForms.filter(f => f.status === 'ACTIVE').length;

  const chartData = allForms.slice(0, 5).map(form => ({
    name: form.name.substring(0, 15),
    count: form.lead_count || 0
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Leads (All Time)" value={totalLeads} trend="up" trendValue="Live" icon={Users} color="facebook-blue" />
        <KPICard title="Active Forms" value={activeForms} trend="up" trendValue="Current" icon={ClipboardList} color="facebook-green" />
        <KPICard title="Forms Connected" value={allForms.length} trend="up" trendValue="Total" icon={FileText} color="purple" />
        <KPICard title="Avg Leads/Form" value={allForms.length > 0 ? (totalLeads / allForms.length).toFixed(1) : 0} trend="up" trendValue="Avg" icon={UserPlus} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Leads by Form (Top 5)</h3>
          <div className="h-64">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" opacity={0.2} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10}} width={100} />
                  <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                  <Bar dataKey="count" fill="#1877F2" radius={[0, 4, 4, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">No lead forms found.</div>
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Lead Form Breakdown</h3>
          <div className="space-y-4">
            {allForms.slice(0, 4).map((form, i) => (
              <div key={i} className="p-3 border border-gray-100 dark:border-dark-border rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-xs dark:text-white truncate max-w-[120px]">{form.name}</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded">{form.lead_count || 0} leads</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (form.lead_count || 0) / (totalLeads || 1) * 100)}%` }}></div>
                </div>
              </div>
            ))}
            {allForms.length === 0 && (
              <div className="text-center py-10 text-gray-400 text-sm italic">Connect a page with lead forms to see statistics.</div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-700 dark:text-gray-300">All Lead Forms</h3>
        </div>
        <DataTable 
          columns={[
            { header: 'Form Name', accessor: 'name', cell: (row) => <div className="font-semibold text-sm">{row.name}</div> },
            { header: 'Page', accessor: 'pageName', cell: (row) => <div className="text-xs text-gray-500">{row.pageName}</div> },
            { 
              header: 'Status', 
              accessor: 'status',
              cell: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  row.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {row.status}
                </span>
              )
            },
            { header: 'Leads', accessor: 'lead_count', cell: (row) => <div className="font-bold">{row.lead_count || 0}</div> },
            { header: 'Created', accessor: 'created_time', cell: (row) => new Date(row.created_time).toLocaleDateString() }
          ]}
          data={allForms}
          emptyMessage="No lead forms found."
        />
      </div>
    </div>
  );
};

export default LeadsDashboard;

import React from 'react';
import { Activity, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const services = [
  { name: 'Graph API', status: 'Operational', latency: '42ms', uptime: '99.98%' },
  { name: 'Login & OAuth', status: 'Operational', latency: '67ms', uptime: '99.99%' },
  { name: 'Marketing API', status: 'Degraded', latency: '312ms', uptime: '98.12%' },
  { name: 'Webhooks', status: 'Operational', latency: '88ms', uptime: '99.95%' },
  { name: 'Messenger Platform', status: 'Operational', latency: '55ms', uptime: '99.97%' },
  { name: 'WhatsApp Business API', status: 'Operational', latency: '74ms', uptime: '99.96%' },
];

const incidents = [
  { id: '#INC-20241015', date: 'Oct 15, 2024', title: 'Elevated error rates for Marketing API', severity: 'Major', resolved: false },
  { id: '#INC-20241009', date: 'Oct 9, 2024', title: 'Webhook delivery delay (EU region)', severity: 'Minor', resolved: true },
  { id: '#INC-20241001', date: 'Oct 1, 2024', title: 'Intermittent login failures', severity: 'Minor', resolved: true },
];

const StatusPage = () => (
  <div className="w-full pb-16 space-y-8 animate-in fade-in duration-500">
    <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-dark-border">
      <div className="flex items-center gap-3 mb-2">
        <Activity className="text-facebook-blue" size={28} />
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Status, Support & Tools</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400">Monitor real-time service health, review past incidents, and access developer tools.</p>
    </div>

    {/* Overall Status */}
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-2xl p-6">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
        <h2 className="font-bold text-green-800 dark:text-green-400 text-lg">All Systems Operational</h2>
        <span className="ml-auto text-xs text-green-700 dark:text-green-500">Last updated: 3 min ago</span>
      </div>
    </div>

    {/* Services table */}
    <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <h2 className="font-bold text-lg dark:text-white">Platform Services</h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-dark-border">
        {services.map(service => (
          <div key={service.name} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition">
            <div className="flex items-center gap-3">
              {service.status === 'Operational'
                ? <CheckCircle size={18} className="text-green-500 shrink-0" />
                : <AlertCircle size={18} className="text-amber-500 shrink-0" />
              }
              <span className="font-medium dark:text-white">{service.name}</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-gray-500 hidden md:block">Latency: <strong className="text-gray-800 dark:text-gray-200">{service.latency}</strong></span>
              <span className="text-gray-500 hidden md:block">Uptime: <strong className="text-gray-800 dark:text-gray-200">{service.uptime}</strong></span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${service.status === 'Operational' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {service.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Incidents */}
    <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <h2 className="font-bold text-lg dark:text-white">Recent Incidents</h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-dark-border">
        {incidents.map(incident => (
          <div key={incident.id} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition">
            <div>
              <div className="font-medium dark:text-white mb-0.5">{incident.title}</div>
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <Clock size={12} /> {incident.date} · <span className="font-mono">{incident.id}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${incident.severity === 'Major' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                {incident.severity}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${incident.resolved ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {incident.resolved ? 'Resolved' : 'Ongoing'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default StatusPage;

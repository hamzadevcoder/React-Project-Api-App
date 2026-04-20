import React from 'react';
import KPICard from '../components/UI/KPICard';
import { MessageCircle, CheckCheck, Clock, XCircle, User } from 'lucide-react';

const mockMessages = [
  { sender: 'user', text: 'Hi, I need help with my recent order #12345.', time: '10:42 AM' },
  { sender: 'business', text: 'Hello! I can certainly help you with that. Let me look up your order.', time: '10:43 AM' },
  { sender: 'business', text: 'It looks like your order is currently out for delivery and should arrive by 8 PM tonight.', time: '10:45 AM' },
  { sender: 'user', text: 'Great, thank you so much!', time: '10:46 AM' },
  { sender: 'business', text: 'You\'re very welcome! Is there anything else I can help you with today?', time: '10:46 AM' },
  { sender: 'user', text: 'No, that\'s all. Have a good day.', time: '10:48 AM' },
];

const mockTemplates = [
  { name: 'order_update', status: 'Approved', language: 'en_US', category: 'Transactional' },
  { name: 'account_alert', status: 'Approved', language: 'en_US', category: 'Authentication' },
  { name: 'seasonal_promo_v2', status: 'Pending', language: 'es_ES', category: 'Marketing' },
];

const WhatsAppDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* WhatsApp Profile Info */}
      <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
          <MessageCircle size={24} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold dark:text-white">Customer Support WhatsApp</h2>
            <span className="bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 text-[10px] uppercase px-2 py-0.5 rounded font-bold">OBA Approved</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-1">
            +1 (555) 123-4567 • WABA ID: 987654321
          </p>
        </div>
        <div className="hidden sm:block text-right">
          <div className="text-sm text-gray-500">Messaging Tier</div>
          <div className="font-bold dark:text-white">Tier 2 (10k msgs/day)</div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Messages Sent" value="8,402" trend="up" trendValue="+12%" icon={MessageCircle} color="facebook-blue" />
        <KPICard title="Delivered Rate" value="98.5%" trend="up" trendValue="+0.2%" icon={CheckCheck} color="facebook-green" />
        <KPICard title="Avg Response" value="4m 12s" trend="down" trendValue="-30s" icon={Clock} color="purple" />
        <KPICard title="Failed" value="1.2%" trend="down" trendValue="-0.1%" icon={XCircle} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat UI Mockup */}
        <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl flex flex-col shadow-sm h-[400px] overflow-hidden">
          <div className="bg-gray-50 dark:bg-dark-bg border-b border-gray-100 dark:border-dark-border p-3 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
               <User size={16} />
             </div>
             <div>
               <div className="text-sm font-bold dark:text-white">+1 (415) 555-2671</div>
               <div className="text-xs text-green-500 flex items-center gap-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
               </div>
             </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-[#E5DDD5] dark:bg-[#111B21] flex flex-col gap-3">
            {mockMessages.map((msg, i) => (
              <div key={i} className={`flex max-w-[80%] ${msg.sender === 'user' ? 'self-start' : 'self-end'}`}>
                <div className={`rounded-lg p-2.5 shadow-sm text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-white dark:bg-[#202C33] text-gray-800 dark:text-gray-200 rounded-tl-none' 
                    : 'bg-[#D9FDD3] dark:bg-[#005C4B] text-gray-800 dark:text-gray-200 rounded-tr-none'
                }`}>
                  <p>{msg.text}</p>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 flex justify-end items-center gap-1">
                    {msg.time}
                    {msg.sender === 'business' && <CheckCheck size={12} className="text-blue-500" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Templates List */}
        <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300 flex items-center justify-between">
            <span>Message Templates</span>
            <span className="text-xs bg-gray-100 dark:bg-dark-bg px-2 py-1 flex rounded">Manage</span>
          </h3>
          <div className="space-y-4">
            {mockTemplates.map((template, i) => (
              <div key={i} className="border border-gray-100 dark:border-dark-border p-3 rounded-xl hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200">{template.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    template.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                  }`}>
                    {template.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="bg-gray-100 dark:bg-dark-bg px-2 py-0.5 rounded">{template.language}</span>
                  <span className="bg-gray-100 dark:bg-dark-bg px-2 py-0.5 rounded">{template.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppDashboard;

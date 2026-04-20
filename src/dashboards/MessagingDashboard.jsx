import React from 'react';
import KPICard from '../components/UI/KPICard';
import MockAvatar from '../components/UI/MockAvatar';
import { MessageCircle, Clock, Smile, Inbox } from 'lucide-react';

const mockConversations = [
  { id: 1, user: 'Sarah Jenkins', lastMsg: 'Thanks for the quick response!', time: '10:42 AM', unread: false },
  { id: 2, user: 'Mark Roberts', lastMsg: 'How long does shipping take to NY?', time: '10:15 AM', unread: true },
  { id: 3, user: 'Elena Costa', lastMsg: 'I need to return my items please.', time: 'Yesterday', unread: false },
  { id: 4, user: 'James Wilson', lastMsg: 'Are you guys open on Sunday?', time: 'Yesterday', unread: false },
  { id: 5, user: 'Amanda Chen', lastMsg: 'Perfect, I will order it now.', time: '2 days ago', unread: false },
];

const mockChat = [
  { sender: 'user', text: 'Hi, I received my order but one item is missing.', time: '10:35 AM' },
  { sender: 'page', text: 'Hello Sarah! I am so sorry to hear that. Let me look into this for you right away. Do you have your order number?', time: '10:36 AM' },
  { sender: 'user', text: 'Yes, it is #ORD-98745', time: '10:38 AM' },
  { sender: 'page', text: 'Thank you. I see the order here. It looks like the blue t-shirt is shipping separately and will arrive tomorrow.', time: '10:40 AM' },
  { sender: 'user', text: 'Oh I see! That makes sense.', time: '10:41 AM' },
  { sender: 'user', text: 'Thanks for the quick response!', time: '10:42 AM' },
  { sender: 'page', text: 'You are very welcome! Have a wonderful day!', time: '10:43 AM' },
];

const MessagingDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Conversations" value="1,245" trend="up" trendValue="+5%" icon={Inbox} color="facebook-blue" />
        <KPICard title="Avg Response Time" value="2m 14s" trend="down" trendValue="-30s" icon={Clock} color="purple" />
        <KPICard title="CSAT Score" value="4.8/5" trend="up" trendValue="+0.1" icon={Smile} color="facebook-green" />
        <KPICard title="Messages Today" value="342" trend="down" trendValue="-8%" icon={MessageCircle} color="orange" />
      </div>

      <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl shadow-sm h-[500px] flex overflow-hidden">
        {/* Inbox List */}
        <div className="w-1/3 border-r border-gray-100 dark:border-dark-border flex flex-col">
          <div className="p-3 border-b border-gray-100 dark:border-dark-border font-semibold dark:text-white flex items-center justify-between">
            Inbox <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs">1 new</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map(conv => (
              <div key={conv.id} className={`p-3 border-b border-gray-50 dark:border-dark-border/50 flex gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-border/30 transition-colors ${conv.id === 1 ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                <MockAvatar name={conv.user} size="sm" className="hidden sm:flex" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className={`text-sm truncate mr-2 dark:text-white ${conv.unread ? 'font-bold' : 'font-medium'}`}>{conv.user}</span>
                    <span className="text-[10px] text-gray-500 whitespace-nowrap">{conv.time}</span>
                  </div>
                  <p className={`text-xs truncate ${conv.unread ? 'font-semibold text-gray-900 dark:text-gray-200' : 'text-gray-500'}`}>{conv.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50/50 dark:bg-dark-bg/50">
          <div className="p-3 bg-white dark:bg-dark-card border-b border-gray-100 dark:border-dark-border flex items-center gap-3">
            <MockAvatar name="Sarah Jenkins" size="sm" />
            <div>
              <div className="font-semibold text-sm dark:text-white">Sarah Jenkins</div>
              <div className="text-xs text-gray-500">Instagram Direct</div>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
            <div className="text-center text-xs text-gray-400 my-2">Today</div>
            {mockChat.map((msg, i) => (
              <div key={i} className={`flex max-w-[80%] ${msg.sender === 'user' ? 'self-start' : 'self-end'}`}>
                <div className={`rounded-xl px-4 py-2 shadow-sm text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border text-gray-800 dark:text-gray-200 rounded-bl-none' 
                    : 'bg-facebook-blue text-white rounded-br-none'
                }`}>
                  <p>{msg.text}</p>
                  <div className={`text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-gray-400' : 'text-blue-200'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 bg-white dark:bg-dark-card border-t border-gray-100 dark:border-dark-border">
            <div className="bg-gray-100 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 flex items-center text-gray-400 text-sm">
              Reply as Page...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingDashboard;

import React from 'react';
import KPICard from '../components/UI/KPICard';
import MockAvatar from '../components/UI/MockAvatar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Eye, MessageCircle, Repeat2, Heart, AtSign } from 'lucide-react';

const mockEngagementData = Array.from({ length: 7 }).map((_, i) => ({
  day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
  views: Math.floor(Math.random() * 5000) + 1000,
  interactions: Math.floor(Math.random() * 1000) + 200
}));

const mockThreads = [
  { id: 1, author: 'threads_creator', content: 'Just dropping my first thoughts here on the new platform! Let\'s build an amazing community together.', likes: 450, replies: 28, reposts: 12, time: '2h' },
  { id: 2, author: 'threads_creator', content: 'What\'s everyone working on this weekend? I\'m building a new React dashboard. 💻✨', likes: 1205, replies: 142, reposts: 56, time: '5h' },
  { id: 3, author: 'threads_creator', content: 'Hot take: TypeScript is absolutely essential for any project over 10 files. Change my mind.', likes: 890, replies: 312, reposts: 89, time: '1d' },
];

const mockReplies = [
  { author: 'dev_guy', content: 'I completely agree with the TS take! It saved me so many times.', time: '10m', isHidden: false },
  { author: 'spambot482', content: 'CLICK HERE FOR FREE CRYPTO 🤑🤑🤑', time: '15m', isHidden: true },
  { author: 'react_fan', content: 'React + TS = ❤️', time: '1h', isHidden: false },
];

const ThreadsDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Profile Insights Summary */}
      <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <MockAvatar name="Threads Creator" size="lg" className="bg-gradient-to-br from-gray-800 to-black text-white" />
          <div>
            <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
              threads_creator
              <span className="bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase px-2 py-0.5 rounded-full font-bold">@</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">14.2K followers</p>
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-center">
          <div>
            <div className="text-2xl font-bold dark:text-white">850K</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Profile Views</div>
          </div>
          <div>
            <div className="text-2xl font-bold dark:text-white">12%</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Engagement Rate</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Followers" value="14,204" trend="up" trendValue="+2.1%" icon={Users} color="facebook-blue" />
        <KPICard title="Total Reach" value="2.4M" trend="up" trendValue="+15%" icon={Eye} color="purple" />
        <KPICard title="Mentions" value="482" trend="up" trendValue="+8%" icon={AtSign} color="orange" />
        <KPICard title="Profile Views" value="850K" trend="up" trendValue="+12%" icon={Eye} color="facebook-green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-medium text-gray-700 dark:text-gray-300">Your Threads</h3>
          {mockThreads.map(thread => (
            <div key={thread.id} className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <MockAvatar name={thread.author} size="sm" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                     <span className="font-bold text-sm dark:text-white">{thread.author}</span>
                     <span className="text-xs text-gray-500">{thread.time}</span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200 mb-3">{thread.content}</p>
                  <div className="flex items-center gap-6 text-gray-500 mt-2">
                    <div className="flex items-center gap-1.5 text-xs hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                      <Heart size={16} /> {thread.likes}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                      <MessageCircle size={16} /> {thread.replies}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                      <Repeat2 size={16} /> {thread.reposts}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Sidebar Insights */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
            <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Engagement (7 Days)</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockEngagementData}>
                   <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000000" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDarkViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#242526', color: '#fff' }} />
                  <Area type="monotone" dataKey="views" stroke="currentColor" fillOpacity={1} fill="url(#colorViews)" className="text-black dark:text-white dark:fill-[url(#colorDarkViews)]" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
            <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Manage Replies</h3>
            <div className="space-y-4">
              {mockReplies.map((reply, i) => (
                <div key={i} className="flex gap-3 text-sm">
                   <MockAvatar name={reply.author} size="sm" className="shrink-0" />
                   <div>
                     <span className="font-bold dark:text-white mr-1 text-xs">{reply.author}</span>
                     <span className="text-gray-600 dark:text-gray-300 text-xs">{reply.content}</span>
                     <div className="mt-1 flex items-center gap-2">
                       {reply.isHidden ? (
                         <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">Hidden</span>
                       ) : (
                         <span className="text-[10px] text-blue-500 hover:underline cursor-pointer">Hide</span>
                       )}
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadsDashboard;

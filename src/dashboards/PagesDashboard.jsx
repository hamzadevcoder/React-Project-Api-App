import React from 'react';
import KPICard from '../components/UI/KPICard';
import MockAvatar from '../components/UI/MockAvatar';
import DataTable from '../components/UI/DataTable';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Eye, ThumbsUp, MessageSquare } from 'lucide-react';

const mockReachData = Array.from({ length: 14 }).map((_, i) => ({
  day: `Day ${i + 1}`,
  organic: Math.floor(Math.random() * 8000) + 2000,
  paid: Math.floor(Math.random() * 5000) + 500
}));

const mockPosts = [
  { id: '1', content: 'Exciting news! We are launching our new product line tomorrow. Stay tuned! 🚀', likes: 1240, comments: 89, shares: 45, date: '2 hours ago' },
  { id: '2', content: 'Our summer sale starts now! Check out the link in our bio for up to 50% off.', likes: 856, comments: 42, shares: 12, date: 'Yesterday' },
  { id: '3', content: 'Behind the scenes at our latest photoshoot 📸📸', likes: 2100, comments: 156, shares: 28, date: '3 days ago' },
  { id: '4', content: 'Thank you for reaching 100k followers! We appreciate every single one of you.', likes: 5400, comments: 890, shares: 120, date: '1 week ago' },
  { id: '5', content: 'Reminder: we will be closed this weekend for the holiday.', likes: 450, comments: 12, shares: 5, date: '2 weeks ago' },
];

const PagesDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Page Info Card */}
      <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl p-6 flex items-center gap-6 shadow-sm">
        <MockAvatar name="Global Store" size="xl" />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold dark:text-white">Global Store Page</h2>
            <span className="bg-facebook-blue/10 text-facebook-blue text-[10px] uppercase px-2 py-0.5 rounded font-bold">Verified</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md">
            The official Facebook page for Global Store. Retail and e-commerce.
          </p>
          <div className="flex gap-6">
            <div><span className="font-bold text-gray-900 dark:text-white">2.4M</span> <span className="text-gray-500 text-sm">Followers</span></div>
            <div><span className="font-bold text-gray-900 dark:text-white">1.8M</span> <span className="text-gray-500 text-sm">Likes</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Post Reach" value="142K" trend="up" trendValue="+24%" icon={Eye} color="facebook-blue" />
        <KPICard title="New Followers" value="1,204" trend="up" trendValue="+5%" icon={Users} color="facebook-green" />
        <KPICard title="Post Engagements" value="24.5K" trend="up" trendValue="+12%" icon={ThumbsUp} color="purple" />
        <KPICard title="Messages" value="342" trend="down" trendValue="-8%" icon={MessageSquare} color="orange" />
      </div>

      <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
        <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Reach Overview (Last 14 Days)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockReachData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1877F2" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1877F2" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#42B72A" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#42B72A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} tickFormatter={(v) => `${v/1000}k`} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
              <Area type="monotone" dataKey="organic" stroke="#1877F2" fillOpacity={1} fill="url(#colorOrganic)" />
              <Area type="monotone" dataKey="paid" stroke="#42B72A" fillOpacity={1} fill="url(#colorPaid)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Recent Posts</h3>
        <DataTable 
          columns={[
            { header: 'Post Content', accessor: 'content', cell: (row) => <div className="max-w-xs truncate">{row.content}</div> },
            { header: 'Date', accessor: 'date' },
            { header: 'Likes', accessor: 'likes', cell: (row) => <div className="flex items-center gap-1.5"><ThumbsUp size={14} className="text-gray-400"/> {row.likes}</div> },
            { header: 'Comments', accessor: 'comments', cell: (row) => <div className="flex items-center gap-1.5"><MessageSquare size={14} className="text-gray-400"/> {row.comments}</div> },
            { header: 'Shares', accessor: 'shares' },
          ]}
          data={mockPosts}
        />
      </div>
    </div>
  );
};

export default PagesDashboard;

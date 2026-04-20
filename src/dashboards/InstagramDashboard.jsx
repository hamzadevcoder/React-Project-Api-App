import React from 'react';
import KPICard from '../components/UI/KPICard';
import MockAvatar from '../components/UI/MockAvatar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Heart, MessageCircle, Image as ImageIcon, PlayCircle } from 'lucide-react';

const mockEngagementData = [
  { name: 'Mon', likes: 1200, comments: 240 },
  { name: 'Tue', likes: 1800, comments: 310 },
  { name: 'Wed', likes: 1500, comments: 280 },
  { name: 'Thu', likes: 2100, comments: 450 },
  { name: 'Fri', likes: 2900, comments: 550 },
  { name: 'Sat', likes: 3500, comments: 800 },
  { name: 'Sun', likes: 3100, comments: 650 },
];

const mockPosts = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  type: i % 3 === 0 ? 'video' : 'image',
  likes: Math.floor(Math.random() * 5000) + 100,
  comments: Math.floor(Math.random() * 500) + 10,
  color: ['bg-pink-400', 'bg-blue-400', 'bg-emerald-400', 'bg-amber-400', 'bg-purple-400', 'bg-red-400'][i]
}));

const InstagramDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Profile Card */}
      <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl p-6 flex items-center gap-6 shadow-sm">
        <MockAvatar name="Instagram Brand" size="xl" className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1" />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold dark:text-white">@mock_brand</h2>
            <span className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 text-[10px] uppercase px-2 py-0.5 rounded font-bold">Business</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md">
            Official mock account. Sharing lifestyle, product drops, and behind-the-scenes content.
          </p>
          <div className="flex gap-6">
            <div><span className="font-bold text-gray-900 dark:text-white">452</span> <span className="text-gray-500 text-sm">posts</span></div>
            <div><span className="font-bold text-gray-900 dark:text-white">124K</span> <span className="text-gray-500 text-sm">followers</span></div>
            <div><span className="font-bold text-gray-900 dark:text-white">230</span> <span className="text-gray-500 text-sm">following</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Profile Views" value="45.2K" trend="up" trendValue="+8%" icon={Users} color="instagram-pink" />
        <KPICard title="Total Reach" value="892K" trend="up" trendValue="+15%" icon={Users} color="purple" />
        <KPICard title="Engagements" value="24.5K" trend="down" trendValue="-3%" icon={Heart} color="instagram-pink" />
        <KPICard title="Story Replies" value="1,240" trend="up" trendValue="+12%" icon={MessageCircle} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Engagement (Last 7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockEngagementData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Bar dataKey="likes" stackId="a" fill="#E4405F" radius={[0, 0, 0, 0]} />
                <Bar dataKey="comments" stackId="a" fill="#F56040" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Recent Posts</h3>
          <div className="grid grid-cols-2 gap-2">
            {mockPosts.map(post => (
              <div key={post.id} className={`aspect-square rounded-md flex items-center justify-center relative group overflow-hidden ${post.color}`}>
                <div className="absolute top-1 right-1 text-white drop-shadow-md">
                  {post.type === 'video' ? <PlayCircle size={16} /> : <ImageIcon size={16} />}
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white transition-opacity text-[10px] font-bold">
                  <div className="flex items-center gap-1"><Heart size={12}/> {post.likes}</div>
                  <div className="flex items-center gap-1 mt-1"><MessageCircle size={12}/> {post.comments}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramDashboard;

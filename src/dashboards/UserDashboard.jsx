import React from 'react';
import { Mail, Calendar, Globe, Facebook, Key, User, MessageCircle, Heart, Star, ImageIcon } from 'lucide-react';
import { useFacebookContext } from '../context/FacebookDataContext';
import { useFacebookData } from '../hooks/useFacebookData';
import LoadingSkeleton from '../components/UI/LoadingSkeleton';
import FacebookErrorState from '../components/UI/FacebookErrorState';

const ConnectPrompt = () => {
  return (
    <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border border-blue-200 dark:border-blue-900/30 rounded-3xl p-10 shadow-2xl flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-facebook-blue/10 rounded-2xl flex items-center justify-center mb-6 animate-bounce">
        <Facebook size={40} className="text-facebook-blue" />
      </div>
      <h3 className="text-2xl font-bold dark:text-white mb-3 tracking-tight">Sync Your Social Identity</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm leading-relaxed">
        Unlock premium insights and real-time data visualizations by connecting your Facebook account.
      </p>
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="px-8 py-3 bg-facebook-blue text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 active:scale-95"
      >
        Connect Facebook Now
      </button>
    </div>
  );
};

const DashboardCard = ({ title, icon: Icon, children, count, color = "text-facebook-blue" }) => (
  <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl shadow-xl overflow-hidden flex flex-col">
    <div className="px-6 py-4 border-b border-gray-50 dark:border-dark-border/50 flex items-center justify-between bg-gray-50/50 dark:bg-dark-bg/20">
      <div className="flex items-center gap-2">
        <Icon size={18} className={color} />
        <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm tracking-wide uppercase">{title}</h3>
      </div>
      {count !== undefined && (
        <span className="text-[10px] bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border px-2.5 py-1 rounded-full text-gray-600 dark:text-gray-400 font-bold shadow-sm">
          {count} Total
        </span>
      )}
    </div>
    <div className="p-6 flex-1">
      {children}
    </div>
  </div>
);

const UserDashboard = () => {
  const { connected } = useFacebookContext();

  // Fetch real data hooks
  const profileData = useFacebookData('profile');
  const friendsData = useFacebookData('friends');
  const likesData = useFacebookData('likes');
  const postsData   = useFacebookData('posts');

  if (!connected) {
    return <ConnectPrompt />;
  }

  const profileImageUrl = profileData.data?.picture?.data?.url || profileData.data?.picture;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* ─── Premium Profile Header ─── */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-facebook-blue via-indigo-600 to-purple-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border border-white/40 dark:border-dark-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-facebook-blue to-indigo-500 opacity-90"></div>
          
          <div className="relative flex flex-col md:flex-row items-center md:items-end gap-8 pt-12">
            <div className="relative">
              {profileData.loading ? (
                <div className="w-32 h-32 bg-gray-200 rounded-3xl animate-pulse border-4 border-white dark:border-dark-card shadow-2xl" />
              ) : (
                <div className="relative">
                  <img 
                    src={profileImageUrl || '/fallback-avatar.jpg'} 
                    className="w-32 h-32 rounded-3xl border-4 border-white dark:border-dark-card shadow-2xl object-cover hover:scale-105 transition-transform duration-500" 
                    alt="Profile"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-dark-card shadow-md"></div>
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              {profileData.loading ? (
                <div className="w-64 mb-4"><LoadingSkeleton lines={2} /></div>
              ) : profileData.error ? (
                 <FacebookErrorState error={profileData.error} onRetry={profileData.refetch} />
              ) : (
                <div className="pb-2">
                  <h2 className="text-3xl font-black dark:text-white mb-2 leading-tight tracking-tight">
                    {profileData.data?.name}
                  </h2>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium">
                    <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                      <Mail size={16} /> {profileData.data?.email || 'Public Profile'}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                      <Calendar size={16} /> {profileData.data?.birthday || 'Birthday Hidden'}
                    </span>
                    <span className="flex items-center gap-1.5 text-facebook-blue font-bold">
                      <Key size={16} /> ID: {profileData.data?.id}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Friends & Likes Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Friends Section */}
        <DashboardCard 
          title="Active Friends" 
          icon={User} 
          count={friendsData.data?.summary?.total_count || friendsData.data?.data?.length}
        >
          <div className="space-y-4">
            {friendsData.loading && <LoadingSkeleton lines={4} />}
            {friendsData.error && <FacebookErrorState error={friendsData.error} onRetry={friendsData.refetch} />}
            {!friendsData.loading && !friendsData.error && (!friendsData.data?.data || friendsData.data.data.length === 0) && (
               <div className="text-center py-6">
                 <Users size={32} className="mx-auto text-gray-300 mb-2" />
                 <p className="text-sm text-gray-500">No active app users found.</p>
               </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {friendsData.data?.data?.map((friend, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-bg/50 hover:bg-facebook-blue/5 dark:hover:bg-facebook-blue/10 rounded-xl transition-all group">
                  <img 
                    src={friend.picture?.data?.url} 
                    className="w-10 h-10 rounded-xl bg-gray-200 border-2 border-transparent group-hover:border-facebook-blue transition-all" 
                    alt="" 
                    crossOrigin="anonymous" 
                  />
                  <div className="font-bold text-sm dark:text-white truncate">{friend.name}</div>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>

        {/* Liked Pages Section */}
        <DashboardCard title="Personal Interests" icon={Heart} color="text-red-500">
          <div className="space-y-4">
            {likesData.loading && <LoadingSkeleton lines={4} />}
            {likesData.error && <FacebookErrorState error={likesData.error} onRetry={likesData.refetch} />}
            {!likesData.loading && !likesData.error && (!likesData.data?.data || likesData.data.data.length === 0) && (
              <div className="text-center py-6 text-gray-400 text-sm italic">No interest data found.</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {likesData.data?.data?.map((page, i) => (
                <div key={i} className="p-3 bg-gray-50 dark:bg-dark-bg/50 border border-transparent hover:border-red-200 dark:hover:border-red-900/30 rounded-xl flex items-center gap-3 group transition-all">
                  <div className="w-10 h-10 bg-white dark:bg-dark-border rounded-xl flex items-center justify-center text-red-500 shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    {page.picture?.data?.url ? (
                      <img src={page.picture.data.url} className="w-full h-full rounded-xl object-cover" alt="" crossOrigin="anonymous" />
                    ) : (
                      <Globe size={20} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-black dark:text-white truncate uppercase tracking-tighter">{page.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold truncate">{page.category || 'Page'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>
      </div>
      
      {/* ─── Timeline Feed ─── */}
      <DashboardCard title="Timeline Feed" icon={MessageCircle} color="text-purple-500">
        <div className="max-w-3xl mx-auto space-y-6">
          {postsData.loading && <LoadingSkeleton type="card" lines={3} />}
          {postsData.error && <FacebookErrorState error={postsData.error} onRetry={postsData.refetch} />}
          {!postsData.loading && !postsData.error && (!postsData.data?.data || postsData.data.data.length === 0) && (
            <div className="text-center py-10 bg-gray-50 dark:bg-dark-bg/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-dark-border text-gray-400">
              Your timeline is currently quiet.
            </div>
          )}
          
          {postsData.data?.data?.map((post, i) => (
            <div key={i} className="bg-white dark:bg-dark-bg/30 border border-gray-100 dark:border-dark-border p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow group">
               <div className="flex items-center gap-4 mb-4">
                 <img src={profileImageUrl} className="w-12 h-12 rounded-2xl shadow-sm" alt="" crossOrigin="anonymous" />
                 <div className="flex-1">
                   <div className="text-base font-black dark:text-white flex items-center gap-1.5">
                     {profileData.data?.name} <Star size={14} className="text-yellow-500 fill-yellow-500" />
                   </div>
                   <div className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-facebook-blue"></span>
                     {new Date(post.created_time).toLocaleString()}
                   </div>
                 </div>
               </div>
               
               {post.message && (
                 <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-4 font-medium italic">
                   "{post.message}"
                 </p>
               )}
               
               {post.full_picture && (
                 <div className="relative rounded-2xl overflow-hidden bg-black/5 dark:bg-black/20">
                   <img 
                    src={post.full_picture} 
                    className="w-full max-h-[500px] object-contain mx-auto" 
                    alt="Timeline content" 
                    crossOrigin="anonymous" 
                   />
                   <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] text-white font-black uppercase flex items-center gap-1.5">
                     <ImageIcon size={12} /> High Resolution
                   </div>
                 </div>
               )}
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
};

export default UserDashboard;

export default UserDashboard;

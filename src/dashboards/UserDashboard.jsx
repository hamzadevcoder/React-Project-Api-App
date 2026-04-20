import React from 'react';
import { Mail, MapPin, Calendar, Users, Map, Globe, Facebook, Key } from 'lucide-react';
import { useFacebookContext } from '../context/FacebookDataContext';
import { useFacebookData } from '../hooks/useFacebookData';
import LoadingSkeleton from '../components/UI/LoadingSkeleton';
import FacebookErrorState from '../components/UI/FacebookErrorState';

const ConnectPrompt = () => {
  return (
    <div className="bg-white dark:bg-dark-card border border-blue-200 dark:border-blue-900/30 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
      <Facebook size={48} className="text-facebook-blue mb-4" />
      <h3 className="text-xl font-bold dark:text-white mb-2">Connect your Facebook Account</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-md">
        Connect your Facebook account to see your real data here instead of placeholders.
      </p>
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="px-6 py-2.5 bg-facebook-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition"
      >
        Connect from the card above
      </button>
    </div>
  );
};

const UserDashboard = () => {
  const { connected } = useFacebookContext();

  // Fetch real data hooks
  const profileData = useFacebookData('profile');
  const friendsData = useFacebookData('friends');
  const likesData = useFacebookData('likes');
  const postsData = useFacebookData('posts');

  if (!connected) {
    return <ConnectPrompt />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* User Profile Card */}
      <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-facebook-blue to-cyan-500"></div>
        <div className="relative pt-12 flex flex-col md:flex-row items-center md:items-start gap-6">
          {profileData.loading ? (
            <div className="w-[120px] h-[120px] bg-gray-200 rounded-full animate-pulse border-4 border-white shadow-lg mx-auto md:mx-0"></div>
          ) : (
            <img 
              src={profileData.data?.picture?.data?.url || '/fallback-avatar.jpg'} 
              className="w-[120px] h-[120px] rounded-full border-4 border-white dark:border-dark-card shadow-lg object-cover" 
              alt="Profile"
              crossOrigin="anonymous"
            />
          )}

          <div className="flex-1 text-center md:text-left mt-2 md:mt-10 w-full">
            {profileData.loading ? (
              <div className="max-w-md mx-auto md:mx-0"><LoadingSkeleton lines={2} type="card" /></div>
            ) : profileData.error ? (
               <FacebookErrorState error={profileData.error} onRetry={profileData.refetch} />
            ) : (
              <>
                <h2 className="text-2xl font-bold dark:text-white mb-1">{profileData.data?.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4 flex items-center justify-center md:justify-start gap-1.5 text-sm">
                  <Mail size={16} /> {profileData.data?.email || 'N/A'}
                </p>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <div className="flex items-start gap-2">
                    <Key className="text-gray-400 mt-0.5" size={16} />
                    <div>
                      <div className="text-xs text-gray-500 uppercase">Facebook ID</div>
                      <div className="font-mono dark:text-gray-300 text-[10px] break-all">{profileData.data?.id}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="text-gray-400 mt-0.5" size={16} />
                    <div>
                      <div className="text-xs text-gray-500 uppercase">Birthday</div>
                      <div className="font-medium dark:text-white text-sm">{profileData.data?.birthday || 'Private'}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Friends List */}
        <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm max-h-96 overflow-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Friends (App Users)</h3>
            <span className="text-xs bg-gray-100 dark:bg-dark-bg px-2 py-1 rounded text-gray-500 font-semibold text-mono">
              {friendsData.data?.summary?.total_count || friendsData.data?.data?.length || 0} total
            </span>
          </div>
          
          <div className="space-y-3">
            {friendsData.loading && <LoadingSkeleton lines={4} />}
            {friendsData.error && <FacebookErrorState error={friendsData.error} onRetry={friendsData.refetch} />}
            {friendsData.data?.data && friendsData.data.data.length === 0 && (
               <div className="text-sm text-gray-500 py-4 text-center">No friends using this app yet.</div>
            )}
            {friendsData.data?.data?.map((friend, i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-lg transition-colors">
                <img src={friend.picture?.data?.url} className="w-8 h-8 rounded-full bg-gray-200" alt="" crossOrigin="anonymous" />
                <div>
                  <div className="text-sm font-medium dark:text-white">{friend.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Liked Pages */}
        <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm max-h-96 overflow-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Recently Liked Pages</h3>
          </div>
          <div className="space-y-3 lg:grid lg:grid-cols-2 lg:space-y-0 lg:gap-3">
            {likesData.loading && <LoadingSkeleton lines={4} />}
            {likesData.error && <FacebookErrorState error={likesData.error} onRetry={likesData.refetch} />}
            {likesData.data?.data?.length === 0 && <div className="text-sm text-gray-500">No liked pages returned.</div>}
            {likesData.data?.data?.map((page, i) => (
              <div key={i} className="border border-gray-100 dark:border-dark-border p-3 rounded-lg flex items-center gap-2">
                <Globe size={18} className="text-facebook-blue opacity-70 shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold dark:text-white truncate">{page.name}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider truncate">{page.category || 'Page'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Timeline Posts */}
      <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
        <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Recent Posts</h3>
        <div className="space-y-4">
          {postsData.loading && <LoadingSkeleton type="card" lines={3} />}
          {postsData.error && <FacebookErrorState error={postsData.error} onRetry={postsData.refetch} />}
          {postsData.data?.data?.length === 0 && <div className="text-sm text-gray-500">No posts found.</div>}
          
          {postsData.data?.data?.map((post, i) => (
            <div key={i} className="border border-gray-100 dark:border-dark-border p-4 rounded-xl flex flex-col gap-3">
               <div className="flex items-center gap-2">
                 <img src={profileData.data?.picture?.data?.url} className="w-8 h-8 rounded-full" alt="" crossOrigin="anonymous" />
                 <div>
                   <div className="text-sm font-semibold dark:text-white">{profileData.data?.name}</div>
                   <div className="text-xs text-gray-500">{new Date(post.created_time).toLocaleString()}</div>
                 </div>
               </div>
               {post.message && <p className="text-sm dark:text-gray-200">{post.message}</p>}
               {post.full_picture && (
                 <img src={post.full_picture} className="rounded-lg max-h-96 object-contain bg-black/5" alt="Post attachment" crossOrigin="anonymous" />
               )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

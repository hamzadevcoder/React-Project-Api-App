import React, { useState } from 'react';
import KPICard from '../components/UI/KPICard';
import MockAvatar from '../components/UI/MockAvatar';
import LoadingSkeleton from '../components/UI/LoadingSkeleton';
import FacebookErrorState from '../components/UI/FacebookErrorState';
import { useFacebookData } from '../hooks/useFacebookData';
import { MessageCircle, Clock, Smile, Inbox, Send } from 'lucide-react';

const MessagingDashboard = () => {
  const { data, loading, error, refetch } = useFacebookData('conversations');
  const [selectedConv, setSelectedConv] = useState(null);

  if (loading) return <LoadingSkeleton type="card" lines={10} />;
  if (error) return <FacebookErrorState error={error} onRetry={refetch} />;

  const pages = data?.data || [];
  
  // Flatten conversations from all pages
  const allConversations = pages.flatMap(page => 
    (page.conversations?.data || []).map(conv => ({
      ...conv,
      pageName: page.name,
      pageId: page.id
    }))
  ).sort((a, b) => new Date(b.updated_time) - new Date(a.updated_time));

  const totalConversations = allConversations.length;
  const unreadCount = allConversations.reduce((sum, conv) => sum + (conv.unread_count || 0), 0);
  
  const activeConv = selectedConv || allConversations[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Conversations" value={totalConversations} trend="up" trendValue="Total" icon={Inbox} color="facebook-blue" />
        <KPICard title="Unread" value={unreadCount} trend={unreadCount > 0 ? "up" : "down"} trendValue="Action Required" icon={MessageCircle} color="orange" />
        <KPICard title="Avg Response" value="< 5m" trend="down" trendValue="Excellent" icon={Clock} color="purple" />
        <KPICard title="Sentiment" value="Positive" trend="up" trendValue="+12%" icon={Smile} color="facebook-green" />
      </div>

      <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl shadow-sm h-[600px] flex overflow-hidden">
        {/* Inbox List */}
        <div className="w-1/3 border-r border-gray-100 dark:border-dark-border flex flex-col">
          <div className="p-4 border-b border-gray-100 dark:border-dark-border font-bold dark:text-white flex items-center justify-between bg-gray-50/50 dark:bg-dark-bg/20">
            Messages {unreadCount > 0 && <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px]">{unreadCount}</span>}
          </div>
          <div className="flex-1 overflow-y-auto">
            {allConversations.map(conv => {
              const lastSender = conv.senders?.data?.[0]?.name || 'Unknown';
              return (
                <div 
                  key={conv.id} 
                  onClick={() => setSelectedConv(conv)}
                  className={`p-4 border-b border-gray-50 dark:border-dark-border/50 flex gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-border/30 transition-colors ${activeConv?.id === conv.id ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
                >
                  <MockAvatar name={lastSender} size="sm" className="hidden sm:flex" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className={`text-sm truncate mr-2 dark:text-white ${conv.unread_count > 0 ? 'font-black' : 'font-semibold'}`}>
                        {lastSender}
                      </span>
                      <span className="text-[9px] text-gray-400 font-bold whitespace-nowrap">
                        {new Date(conv.updated_time).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-xs truncate ${conv.unread_count > 0 ? 'font-bold text-gray-900 dark:text-gray-200' : 'text-gray-500'}`}>
                      {conv.snippets}
                    </p>
                    <div className="text-[9px] text-facebook-blue font-bold uppercase mt-1">via {conv.pageName}</div>
                  </div>
                </div>
              );
            })}
            {allConversations.length === 0 && (
              <div className="p-10 text-center text-gray-400 text-sm italic">No conversations found.</div>
            )}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50/30 dark:bg-dark-bg/10">
          {activeConv ? (
            <>
              <div className="p-4 bg-white dark:bg-dark-card border-b border-gray-100 dark:border-dark-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MockAvatar name={activeConv.senders?.data?.[0]?.name || 'User'} size="sm" />
                  <div>
                    <div className="font-bold text-sm dark:text-white">{activeConv.senders?.data?.[0]?.name || 'User'}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Active Conversation</div>
                  </div>
                </div>
                <div className="text-[10px] bg-gray-100 dark:bg-dark-bg px-2 py-1 rounded font-bold text-gray-400 uppercase">
                  ID: {activeConv.id.substring(0, 8)}...
                </div>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
                {activeConv.messages?.data?.map((msg, i) => {
                  const isPage = msg.from?.id === activeConv.pageId;
                  return (
                    <div key={i} className={`flex flex-col max-w-[80%] ${isPage ? 'self-end' : 'self-start'}`}>
                      <div className={`rounded-2xl px-4 py-2.5 shadow-sm text-sm ${
                        !isPage 
                          ? 'bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border text-gray-800 dark:text-gray-200 rounded-bl-none' 
                          : 'bg-facebook-blue text-white rounded-br-none'
                      }`}>
                        <p className="leading-relaxed">{msg.message}</p>
                        <div className={`text-[9px] mt-1.5 font-bold uppercase ${!isPage ? 'text-gray-400' : 'text-blue-100'}`}>
                          {new Date(msg.created_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {(!activeConv.messages?.data || activeConv.messages.data.length === 0) && (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">
                    Open this conversation on Facebook to reply.
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-white dark:bg-dark-card border-t border-gray-100 dark:border-dark-border">
                <div className="relative">
                  <input 
                    disabled
                    placeholder="Reply via Meta Business Suite..." 
                    className="w-full bg-gray-100 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-3 text-sm text-gray-400 cursor-not-allowed pr-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
                    <Send size={18} />
                  </div>
                </div>
                <p className="text-[9px] text-center text-gray-400 font-bold uppercase mt-2 tracking-widest">
                  Messaging API is limited to Read-Only in this Preview
                </p>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <MessageCircle size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">Select a conversation to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingDashboard;

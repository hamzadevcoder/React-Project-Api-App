import React, { useState } from 'react';
import { useFacebookContext } from '../../context/FacebookDataContext';
import { useFacebookData } from '../../hooks/useFacebookData';
import { Facebook, ArrowRight, ArrowLeft, X, Compass } from 'lucide-react';
import LoadingSkeleton from './LoadingSkeleton';
import FacebookErrorState from './FacebookErrorState';

const HelperWalkthrough = () => {
  const { connected, profile } = useFacebookContext();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Pre-fetch all necessary step data
  const profileProps = useFacebookData('profile');
  const pagesProps = useFacebookData('pages');
  const postsProps = useFacebookData('posts');
  const photosProps = useFacebookData('photos');

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 font-semibold z-50 transition-transform hover:scale-105 animate-bounce"
      >
        <Compass size={24} /> Helper
      </button>
    );
  }

  const StepWrapper = ({ title, desc, children }) => (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className="text-xl font-bold dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6">{desc}</p>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        {/* Render Blur Overlay if not connected */}
        {!connected && (
          <div className="absolute inset-0 z-10 backdrop-blur-md bg-white/30 dark:bg-dark-card/30 flex flex-col items-center justify-center p-6 text-center">
            <Facebook className="text-facebook-blue mb-4 opacity-50" size={48} />
            <h4 className="font-bold dark:text-white mb-2">Unlock this feature</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Connect your Facebook account to see your real data here.</p>
            <button 
              onClick={() => { setIsOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className="px-4 py-2 bg-facebook-blue text-white rounded-xl text-sm font-bold shadow-lg"
            >
              Connect Facebook
            </button>
          </div>
        )}
        
        <div className={!connected ? "filter blur-sm opacity-50 pointer-events-none select-none" : ""}>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-sm sm:max-w-md bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-border z-50 flex flex-col overflow-hidden max-h-[80vh]">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-facebook-blue to-indigo-600 p-4 flex justify-between items-center text-white">
        <div className="font-bold flex items-center gap-2">
          <Compass size={18} /> Getting Started Guide
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
          <X size={20} />
        </button>
      </div>

      {/* Body Area */}
      <div className="p-6 flex-1 min-h-[300px] bg-[#F0F2F5] dark:bg-dark-bg/50">
        
        {step === 1 && (
          <StepWrapper 
            title="Step 1: Welcome" 
            desc="Explore how live data instantly populates your app once authenticated."
          >
            <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-100 dark:border-dark-border text-center shadow-sm">
              <img src={profile?.picture || "https://placehold.co/100"} alt="Avatar" className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-50 shadow-md" />
              <h2 className="text-lg font-bold dark:text-white">
                Welcome back, {profile?.name || "Friend"}!
              </h2>
              <p className="text-xs text-gray-500 mt-2">Here is what we pulled from your Facebook dynamically.</p>
            </div>
          </StepWrapper>
        )}

        {step === 2 && (
          <StepWrapper title="Step 2: Your Profile" desc="Graph API: GET /me?fields=name,email,birthday">
            <div className="bg-white dark:bg-dark-card p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
              {profileProps.loading && <LoadingSkeleton lines={2} />}
              {profileProps.error && <FacebookErrorState error={profileProps.error} onRetry={profileProps.refetch} />}
              {profileProps.data && (
                <>
                  <div className="flex justify-between border-b pb-2 dark:border-dark-border">
                    <span className="text-gray-500 text-sm">Name</span>
                    <span className="font-semibold dark:text-white">{profileProps.data.name}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 dark:border-dark-border">
                    <span className="text-gray-500 text-sm">Email</span>
                    <span className="font-semibold dark:text-white">{profileProps.data.email}</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-gray-500 text-sm">Birthday</span>
                    <span className="font-semibold dark:text-white">{profileProps.data.birthday || 'N/A'}</span>
                  </div>
                </>
              )}
            </div>
          </StepWrapper>
        )}

        {step === 3 && (
          <StepWrapper title="Step 3: Your Pages" desc="Graph API: GET /me/accounts">
            <div className="space-y-3">
              {pagesProps.loading && <LoadingSkeleton type="list" lines={2} />}
              {pagesProps.error && <FacebookErrorState error={pagesProps.error} onRetry={pagesProps.refetch} />}
              {pagesProps.data?.data?.length === 0 && <div className="text-sm text-gray-500">No pages found.</div>}
              {pagesProps.data?.data?.map((page, i) => (
                <div key={i} className="bg-white dark:bg-dark-card p-3 rounded-lg flex items-center gap-3 shadow-sm">
                   <img src={page.picture?.data?.url || "https://placehold.co/40"} className="w-10 h-10 rounded-lg" alt="" />
                   <div>
                     <div className="font-semibold dark:text-white text-sm">{page.name}</div>
                     <div className="text-xs text-gray-500">{page.category}</div>
                   </div>
                </div>
              ))}
            </div>
          </StepWrapper>
        )}

        {step === 4 && (
          <StepWrapper title="Step 4: Your Posts" desc="Graph API: GET /me/posts?limit=3">
             <div className="space-y-3">
              {postsProps.loading && <LoadingSkeleton type="card" lines={1} />}
              {postsProps.error && <FacebookErrorState error={postsProps.error} onRetry={postsProps.refetch} />}
              {postsProps.data?.data?.length === 0 && <div className="text-sm text-gray-500">No posts found.</div>}
              {postsProps.data?.data?.slice(0,3).map((post, i) => (
                <div key={i} className="bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm border border-gray-100 dark:border-dark-border">
                  <p className="text-sm dark:text-white mb-2">{post.message || 'Shared a media item'}</p>
                  <div className="text-[10px] text-gray-400">{new Date(post.created_time).toLocaleString()}</div>
                </div>
              ))}
             </div>
          </StepWrapper>
        )}

        {step === 5 && (
          <StepWrapper title="Step 5: Your Photos" desc="Graph API: GET /me/photos?type=uploaded">
            {photosProps.loading && <LoadingSkeleton type="grid" lines={3} />}
            {photosProps.error && <FacebookErrorState error={photosProps.error} onRetry={photosProps.refetch} />}
            {photosProps.data?.data?.length === 0 && <div className="text-sm text-gray-500">No photos found.</div>}
            <div className="grid grid-cols-2 gap-2">
              {photosProps.data?.data?.slice(0,4).map((photo, i) => (
                <div key={i} className="bg-gray-200 aspect-square rounded-lg overflow-hidden relative group">
                   <img src={photo.images?.[0]?.source} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </StepWrapper>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-gray-200 dark:border-dark-border flex justify-between bg-white dark:bg-dark-card">
        <button 
          onClick={() => setStep(prev => prev > 1 ? prev - 1 : prev)}
          className={`flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-lg ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-bg transition'}`}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex gap-1 items-center">
          {[1,2,3,4,5].map(dot => (
            <div key={dot} className={`w-2 h-2 rounded-full ${step === dot ? 'bg-facebook-blue' : 'bg-gray-300 dark:bg-gray-600'}`}/>
          ))}
        </div>
        <button 
          onClick={() => {
            if (step < 5) setStep(prev => prev + 1);
            else setIsOpen(false);
          }}
          className="flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-lg bg-facebook-blue text-white shadow hover:bg-blue-700 transition"
        >
          {step === 5 ? 'Done' : 'Next'} <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
};

export default HelperWalkthrough;

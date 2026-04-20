import React from 'react';
import { 
  CheckCircle2, 
  Terminal, 
  Database,
  Image as ImageIcon,
  MessageSquare,
  Calendar,
  Mail,
  Heart,
  Share2
} from 'lucide-react';
import CodeBlock from './UI/CodeBlock';
import clsx from 'clsx';

const ApiScopeDashboard = ({ 
  scopeId, 
  name, 
  description, 
  status = 'Active', 
  currentEndpoint = 'GET /v25.0/me', 
  fields = [], 
  mockResponse = {}, 
  visualizationType = 'default' 
}) => {

  const renderVisualization = () => {
    switch(visualizationType) {
      case 'user_posts':
        return (
          <div className="bg-white dark:bg-[#242526] border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-4 w-full max-w-sm mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
              <div>
                <div className="text-sm font-bold dark:text-white">John Doe</div>
                <div className="text-xs text-gray-500">2 hours ago</div>
              </div>
            </div>
            <p className="text-sm dark:text-gray-200 mb-3">Just finished an amazing hike at Mount Tamalpais! The views were absolutely incredible today. 🥾🌲</p>
            <div className="flex items-center justify-between text-gray-500 border-t border-gray-100 dark:border-dark-border pt-3 px-2">
              <button className="flex items-center gap-1.5 text-xs hover:bg-gray-50 dark:hover:bg-dark-bg p-1.5 rounded"><Heart size={16}/> Like</button>
              <button className="flex items-center gap-1.5 text-xs hover:bg-gray-50 dark:hover:bg-dark-bg p-1.5 rounded"><MessageSquare size={16}/> Comment</button>
              <button className="flex items-center gap-1.5 text-xs hover:bg-gray-50 dark:hover:bg-dark-bg p-1.5 rounded"><Share2 size={16}/> Share</button>
            </div>
          </div>
        );

      case 'user_photos':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 bg-gray-50 dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-square bg-gray-200 dark:bg-[#3A3B3C] rounded-lg flex items-center justify-center relative overflow-hidden group">
                <ImageIcon className="text-gray-400 opacity-50" size={32} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-end p-2 transition-opacity">
                  <span className="text-[10px] text-white font-medium truncate">IMG_{3450+i}.jpg</span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'email':
        return (
          <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border">
            <div className="bg-white dark:bg-dark-card shadow-sm border border-gray-200 dark:border-dark-border p-4 rounded-full flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-10 h-10 rounded-full flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div className="pr-4">
                <div className="text-sm font-semibold dark:text-white">Primary Email</div>
                <div className="text-gray-500 font-mono text-sm tracking-tight">developer@example.com</div>
              </div>
              <div className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] uppercase px-2 py-1 rounded-full font-bold">
                Verified
              </div>
            </div>
          </div>
        );

      case 'user_events':
        return (
          <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl shadow-sm overflow-hidden">
            <div className="bg-red-50 dark:bg-red-900/10 px-4 py-3 border-b border-gray-100 dark:border-dark-border flex items-center gap-2">
              <Calendar className="text-red-500" size={18} />
              <span className="font-semibold text-red-900 dark:text-red-400 text-sm">Upcoming Events</span>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-dark-border">
              {[
                { name: 'Tech Conference 2024', date: 'Oct 15 - San Francisco, CA', rsvp: 'Attending' },
                { name: 'Developer Meetup', date: 'Oct 22 - Online', rsvp: 'Interested' }
              ].map((event, i) => (
                <div key={i} className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition">
                  <div>
                    <div className="font-medium dark:text-white text-sm">{event.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{event.date}</div>
                  </div>
                  <span className={clsx(
                    "text-[10px] font-bold uppercase px-2 py-1 rounded",
                    event.rsvp === 'Attending' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-700 dark:bg-dark-border dark:text-gray-300"
                  )}>
                    {event.rsvp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center p-10 bg-gray-50 dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border text-gray-400 text-sm">
            <Database size={32} className="mb-2 opacity-50" />
            No visualization specified for this scope type.
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header Section */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-dark-border">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-sans tracking-tight">
             {name || scopeId}
          </h1>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800/30">
            <CheckCircle2 size={16} />
            <span className="text-[11px] uppercase tracking-wider font-bold">{status}</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
          {description}
        </p>

        {/* API Endpoint Box */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Terminal size={14} /> Example Endpoint
          </h3>
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-inner flex items-center">
            <div className="px-4 py-3 bg-facebook-blue text-white font-mono text-sm font-bold">
              GET
            </div>
            <div className="px-4 py-3 text-gray-300 font-mono text-sm overflow-x-auto whitespace-nowrap custom-scrollbar">
              {currentEndpoint}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Col: Key Data Fields */}
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-dark-border">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 border-b border-gray-100 dark:border-dark-border pb-3">
            Key Data Fields
          </h2>
          
          {fields && fields.length > 0 ? (
            <div className="space-y-4">
              {fields.map((field, i) => (
                <div key={i} className="group">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-mono text-sm font-semibold text-facebook-blue dark:text-blue-400">
                      {field.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
                    {field.explanation}
                  </p>
                </div>
              ))}
            </div>
          ) : (
             <p className="text-sm text-gray-500 italic">No field data provided for this scope.</p>
          )}
        </div>

        {/* Right Col: Mock API Response */}
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-dark-border">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 border-b border-gray-100 dark:border-dark-border pb-3">
            JSON Response Payload
          </h2>
          <div className="shadow-inner">
            <CodeBlock 
              language="json" 
              code={JSON.stringify(mockResponse, null, 2)} 
            />
          </div>
        </div>
      </div>

      {/* Bottom Visualization UI */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-dark-border">
         <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Live Preview
         </h2>
         <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-dark-bg/50 rounded-xl border border-gray-100 dark:border-dark-border">
            {renderVisualization()}
         </div>
      </div>

    </div>
  );
};

export default ApiScopeDashboard;

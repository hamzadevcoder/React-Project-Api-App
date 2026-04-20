import React, { useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { scopes } from '../../data/scopes';
import clsx from 'clsx';
import { X, LayoutDashboard, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Helper to humanize the scope IDs nicely like "Ads Management Standard Access"
  const humanizeScopeName = (name) => {
    return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const sortedScopes = useMemo(() => {
    return [...scopes].sort((a, b) => humanizeScopeName(a.name).localeCompare(humanizeScopeName(b.name)));
  }, []);

  const topLevelLinks = [
    { title: 'Overview', path: '/' },
    { title: 'Status, Support, and Tools', path: '/status' },
    { title: 'Get Started', path: '/get-started' },
    { title: 'Batch Requests', path: '/batch-requests' },
    { title: 'Debug Requests', path: '/debug-requests' },
    { title: 'Handle Errors', path: '/handle-errors' },
    { title: 'Field Expansion', path: '/field-expansion' },
    { title: 'Secure Requests', path: '/secure-requests' },
    { title: 'Upload a File or Video', path: '/upload' },
    { title: 'Changelog', path: '/changelog' },
  ];

  return (
    <>
      <div 
        className={clsx(
          "fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )} 
        onClick={() => setIsOpen(false)}
      />
      
      <div className={clsx(
        "fixed inset-y-0 left-0 z-50 w-[280px] h-full bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col flex-shrink-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Mobile Header purely for closing */}
        <div className="flex lg:hidden items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-dark-border">
          <span className="font-bold text-lg dark:text-white">Menu</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-border transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar lg:pt-6 pb-4">
          <div className="px-6 space-y-4">
            
            {/* Top Level Category: Graph API */}
            <div>
              <h2 className="text-[15px] font-bold text-gray-900 dark:text-gray-100 mb-2">
                Graph API
              </h2>
              
              <ul className="space-y-1 mt-3">
                {topLevelLinks.map(link => (
                  <li key={link.title}>
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) => clsx(
                        "block py-1.5 px-2 -ml-2 text-[14px] font-medium transition-colors rounded-md",
                        isActive
                          ? "text-gray-900 dark:text-white font-semibold bg-gray-100 dark:bg-dark-border/50"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border/50"
                      )}
                    >
                      {link.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section: Features Reference */}
            <div className="pt-2">
              <h3 className="text-[14px] font-semibold text-facebook-blue dark:text-blue-400 mb-3 leading-snug">
                Features<br />Reference
              </h3>
              
              <ul className="space-y-2.5 ml-4 border-l border-gray-100 dark:border-dark-border/50 pl-3">
                {sortedScopes.map(scope => (
                  <li key={scope.id}>
                    <NavLink
                      to={`/scope/${scope.id}`}
                      className={({ isActive }) => clsx(
                        "block text-[13px] font-medium leading-snug transition-colors",
                        isActive 
                          ? "text-facebook-blue dark:text-blue-400 font-semibold" 
                          : "text-[#4b5563] dark:text-gray-400 hover:text-black dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border/30 px-2 -ml-2 rounded-md py-1"
                      )}
                    >
                      {humanizeScopeName(scope.name)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* User Profile Strip at bottom */}
        <div className="border-t border-gray-100 dark:border-dark-border px-4 py-3 shrink-0">
          {isLoggedIn ? (
            <div>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => clsx(
                  'flex items-center gap-3 p-2 rounded-lg mb-2 transition-colors',
                  isActive ? 'bg-facebook-blue/10 text-facebook-blue' : 'hover:bg-gray-100 dark:hover:bg-dark-border/50'
                )}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-facebook-blue to-indigo-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {user?.avatar || 'JD'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold dark:text-white truncate">{user?.name}</div>
                  <div className="text-[10px] text-gray-400 truncate">{user?.email}</div>
                </div>
                <LayoutDashboard size={14} className="text-gray-400 shrink-0" />
              </NavLink>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center gap-2 p-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border/50 transition-colors"
            >
              <LogIn size={16} className="text-facebook-blue" />
              <span className="font-medium">Log in to your account</span>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

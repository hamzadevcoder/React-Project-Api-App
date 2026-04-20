import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { scopes } from '../../data/scopes';
import clsx from 'clsx';

const Header = ({ toggleSidebar, isDarkMode, toggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const results = scopes.filter(s => 
      s.name.toLowerCase().includes(query) || 
      s.description.toLowerCase().includes(query) ||
      s.category.toLowerCase().includes(query)
    ).slice(0, 8); // Limit to top 8
    setSearchResults(results);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectScope = (scopeId) => {
    navigate(`/scope/${scopeId}`);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-border lg:hidden transition"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex-1 max-w-xl px-4 flex justify-end lg:justify-center">
        <div ref={searchRef} className="relative w-full max-w-sm group">
          <div className={clsx(
            "flex items-center px-3 py-2 border rounded-xl bg-gray-50 dark:bg-dark-bg transition-all",
            isSearchFocused 
              ? "border-facebook-blue ring-2 ring-facebook-blue/20 dark:border-facebook-blue dark:ring-facebook-blue/20" 
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          )}>
            <Search size={18} className="text-gray-400 min-w-max" />
            <input 
              type="text"
              placeholder="Search permissions (e.g., pages_read_engagement)"
              className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100 px-3 placeholder-gray-400 dark:placeholder-gray-500 truncate"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />
            {searchQuery && (
              <button 
                className="text-xs border bg-white dark:bg-dark-border rounded px-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                onClick={() => setSearchQuery('')}
              >
                esc
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-100 dark:border-dark-border/80 py-2 custom-scrollbar">
              {searchResults.map(result => (
                <button
                  key={result.id}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-dark-border flex flex-col gap-1 transition"
                  onClick={() => handleSelectScope(result.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-facebook-blue">{result.name}</span>
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-gray-100 dark:bg-dark-bg text-gray-500">{result.category}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{result.description}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-dark-border dark:hover:text-blue-400 transition"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>
      </div>
    </header>
  );
};

export default Header;

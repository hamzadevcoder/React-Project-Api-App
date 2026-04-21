import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ScopeBadge from './ScopeBadge';
import StatusBadge from './StatusBadge';

const ScopeCard = ({ scope }) => {
  return (
    <Link 
      to={`/scope/${scope.id}`}
      className="group flex flex-col bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-5 hover:shadow-lg hover:border-facebook-blue/30 dark:hover:border-facebook-blue/40 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <ScopeBadge scopeName={scope.name} interactive={false} />
        <StatusBadge level={scope.accessLevel} />
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1 line-clamp-2">
        {scope.description}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-dark-border/50">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {scope.category}
        </span>
        <div className="flex items-center text-facebook-blue text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Explore <ChevronRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  );
};

export default ScopeCard;

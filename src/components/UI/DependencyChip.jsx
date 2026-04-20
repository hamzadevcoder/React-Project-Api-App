import React from 'react';
import { Link } from 'react-router-dom';
import { Network } from 'lucide-react';

const DependencyChip = ({ scopeId }) => {
  return (
    <Link 
      to={`/scope/${scopeId}`}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-dark-border dark:text-gray-300 dark:hover:bg-gray-700 transition"
    >
      <Network size={12} className="text-gray-400" />
      <span className="font-mono">{scopeId}</span>
    </Link>
  );
};

export default DependencyChip;

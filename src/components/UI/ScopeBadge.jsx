import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import clsx from 'clsx';

const ScopeBadge = ({ scopeName, size = 'md', interactive = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    if (!interactive) return;
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(scopeName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  return (
    <div className="inline-flex items-center">
      <div className={clsx(
        "font-mono font-medium rounded-md bg-facebook-blue/10 text-facebook-blue dark:bg-facebook-blue/20 flex items-center border border-facebook-blue/20",
        sizeClasses[size],
        interactive && "pr-1"
      )}>
        <span>{scopeName}</span>
        
        {interactive && (
          <button 
            onClick={handleCopy}
            className="p-1 rounded opacity-60 hover:opacity-100 hover:bg-facebook-blue/20 transition-all ml-1"
            title="Copy to clipboard"
            aria-label="Copy scope name"
          >
            {copied ? <Check size={iconSizes[size]} className="text-green-500" /> : <Copy size={iconSizes[size]} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default ScopeBadge;

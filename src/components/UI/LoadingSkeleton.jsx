import React from 'react';

/**
 * Reusable generic loading skeleton blocks mapping to component shapes
 */
export const LoadingSkeleton = ({ type = 'list', lines = 3 }) => {
  const arr = Array.from({ length: lines });

  if (type === 'card') {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-32 bg-gray-200 dark:bg-dark-bg rounded-xl w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-dark-bg rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-dark-bg rounded w-1/2"></div>
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-pulse">
        {arr.map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 dark:bg-dark-bg rounded-lg"></div>
        ))}
      </div>
    );
  }

  // Default 'list'
  return (
    <div className="space-y-4 animate-pulse">
      {arr.map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-dark-bg shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-dark-bg rounded w-3/4"></div>
            <div className="h-2 bg-gray-200 dark:bg-dark-bg rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;

import React from 'react';
import clsx from 'clsx';

const MockAvatar = ({ name, size = 'md', className }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const colors = [
    'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 
    'bg-pink-500', 'bg-amber-500', 'bg-cyan-500'
  ];
  
  // Deterministic color based on name
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const bgColor = colors[colorIndex];

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl'
  };

  return (
    <div className={clsx(
      "flex items-center justify-center rounded-full text-white font-semibold font-sans shadow-inner",
      bgColor,
      sizeClasses[size],
      className
    )}>
      {initials}
    </div>
  );
};

export default MockAvatar;

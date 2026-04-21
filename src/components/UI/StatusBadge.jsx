import React from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';

const StatusBadge = ({ level }) => {
  const isAdvanced = level === 'Advanced';
  
  return (
    <div className={clsx(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
      isAdvanced 
        ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20" 
        : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
    )}>
      {isAdvanced ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />}
      <span>{isAdvanced ? 'Advanced Access' : 'Standard Access'}</span>
    </div>
  );
};

export default StatusBadge;

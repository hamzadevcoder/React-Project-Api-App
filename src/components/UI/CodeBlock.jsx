import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import clsx from 'clsx';

const CodeBlock = ({ code, language = 'bash', label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-[#1E1E1E] border border-gray-700 font-mono text-sm shadow-sm group mt-2 mb-4">
      {label && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D] border-b border-gray-700 text-xs text-gray-400">
          <span>{label}</span>
          <span className="uppercase text-[10px] tracking-widest">{language}</span>
        </div>
      )}
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
      <button
        onClick={handleCopy}
        className={clsx(
          "absolute bottom-3 right-4 p-1.5 rounded-md transition-all duration-200 z-10",
          copied 
            ? "bg-green-500/20 text-green-400" 
            : "bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-600 opacity-0 group-hover:opacity-100"
        )}
        aria-label="Copy code"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};

export default CodeBlock;

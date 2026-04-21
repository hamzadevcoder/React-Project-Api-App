import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-red-50 dark:bg-red-500/10 text-red-500 p-6 rounded-full mb-6">
        <AlertTriangle size={64} />
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">404 - Scope Not Found</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-8">
        The permission scope you're looking for doesn't exist in our database or the URL is incorrect.
      </p>
      <Link 
        to="/" 
        className="flex items-center gap-2 bg-facebook-blue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md shadow-blue-500/20"
      >
        <Home size={20} />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;

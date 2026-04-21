import React from 'react';
import KPICard from '../components/UI/KPICard';
import { Database, AlertCircle } from 'lucide-react';

const GenericDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-800 dark:text-yellow-500 p-4 rounded-xl flex items-start gap-3">
        <AlertCircle className="mt-0.5" size={20} />
        <div>
          <h4 className="font-semibold text-sm mb-1">Standard Output UI</h4>
          <p className="text-sm">This is a dynamic scope that doesn't have a specific UI category. It typically returns JSON data structured like the example response.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <KPICard 
          title="Data Entities Retrievable" 
          value="Limited" 
          icon={Database} 
          color="facebook-blue" 
        />
        <KPICard 
          title="API Rate Limit" 
          value="Standard" 
          icon={Database} 
          color="facebook-green" 
        />
      </div>
    </div>
  );
};

export default GenericDashboard;

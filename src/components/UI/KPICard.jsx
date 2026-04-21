import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const KPICard = ({ title, value, icon: Icon, trend, trendValue, color = "facebook-blue" }) => {
  const colorMap = {
    'facebook-blue': 'text-facebook-blue bg-facebook-blue/10 dark:bg-facebook-blue/20',
    'facebook-green': 'text-facebook-green bg-facebook-green/10 dark:bg-facebook-green/20',
    'instagram-pink': 'text-instagram-pink bg-instagram-pink/10 dark:bg-instagram-pink/20',
    'purple': 'text-purple-500 bg-purple-500/10 dark:bg-purple-500/20',
    'orange': 'text-orange-500 bg-orange-500/10 dark:bg-orange-500/20'
  };

  return (
    <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        {Icon && (
          <div className={`p-2 rounded-lg ${colorMap[color] || colorMap['facebook-blue']}`}>
            <Icon size={18} />
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend === 'up' ? 'text-green-500' : 
            trend === 'down' ? 'text-red-500' : 
            'text-gray-400'
          }`}>
            {trend === 'up' ? <TrendingUp size={16} /> : 
             trend === 'down' ? <TrendingDown size={16} /> : 
             <Minus size={16} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;

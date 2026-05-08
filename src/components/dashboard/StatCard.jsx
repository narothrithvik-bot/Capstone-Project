import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, amount, icon: Icon, color, trend, trendUp }) => {
  return (
    <div className="card glass group">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${color} text-white shadow-lg shadow-${color.split('-')[1]}/30`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
          trendUp ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
        }`}>
          {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500 dark:text-dark-muted">{title}</p>
        <h2 className="text-3xl font-bold mt-1">
          ${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </h2>
      </div>
    </div>
  );
};

export default StatCard;

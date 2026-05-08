import React from 'react';
import { PieChart, TrendingUp } from 'lucide-react';

const PlaceholderPage = ({ title, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
    <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-full text-primary">
      <Icon className="w-12 h-12" />
    </div>
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-slate-500 dark:text-dark-muted">This feature is coming soon to your Pro account.</p>
    </div>
    <button className="btn-primary">Upgrade Now</button>
  </div>
);

export const Reports = () => <PlaceholderPage title="Financial Reports" icon={PieChart} />;
export const Budget = () => <PlaceholderPage title="Budget Planning" icon={TrendingUp} />;

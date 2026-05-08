import React from 'react';
import { useSelector } from 'react-redux';
import { ArrowUpRight, ArrowDownLeft, MoreVertical } from 'lucide-react';
import { selectAllTransactions } from '../../store/slices/transactionSlice';
import { format } from 'date-fns';

const RecentTransactions = () => {
  const transactions = useSelector(selectAllTransactions);
  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div className="card glass">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Recent Transactions</h3>
        <button className="text-primary text-sm font-bold hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {recent.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${
                t.type === 'income' 
                  ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' 
                  : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
              }`}>
                {t.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
              </div>
              <div>
                <p className="font-bold">{t.text}</p>
                <p className="text-xs text-slate-500 dark:text-dark-muted">{t.category} • {format(new Date(t.date), 'MMM dd, yyyy')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <p className={`font-bold ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
              </p>
              <button className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;

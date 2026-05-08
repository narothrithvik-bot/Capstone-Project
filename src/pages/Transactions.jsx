import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Trash2, 
  Edit3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { selectAllTransactions, deleteTransaction } from '../store/slices/transactionSlice';
import { setActiveModal } from '../store/slices/uiSlice';
import { format } from 'date-fns';
import { clsx } from 'clsx';

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  // Filtering logic
  const filteredTransactions = transactions
    .filter(t => 
      t.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(t => filterType === 'all' || t.type === filterType)
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-slate-500 dark:text-dark-muted">Manage and track all your financial activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={() => dispatch(setActiveModal('add-transaction'))}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="card glass overflow-hidden">
        {/* Filters bar */}
        <div className="p-4 border-b border-slate-200 dark:border-dark-border flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {['all', 'income', 'expense'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={clsx(
                    "px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all",
                    filterType === type 
                      ? "bg-white dark:bg-dark-card shadow-sm text-primary" 
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-dark-text"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
            <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <Filter className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-dark-muted text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold cursor-pointer" onClick={() => handleSort('text')}>Description</th>
                <th className="px-6 py-4 font-semibold cursor-pointer" onClick={() => handleSort('category')}>Category</th>
                <th className="px-6 py-4 font-semibold cursor-pointer" onClick={() => handleSort('date')}>Date</th>
                <th className="px-6 py-4 font-semibold cursor-pointer text-right" onClick={() => handleSort('amount')}>Amount</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-dark-border">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium">{t.text}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-dark-muted">
                    {format(new Date(t.date), 'MMM dd, yyyy')}
                  </td>
                  <td className={clsx(
                    "px-6 py-4 text-right font-bold",
                    t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                  )}>
                    {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => dispatch(deleteTransaction(t.id))}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-expense transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 dark:border-dark-border flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-dark-muted">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTransactions.length}</span> of <span className="font-medium">{filteredTransactions.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-slate-200 dark:border-dark-border disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg border border-slate-200 dark:border-dark-border">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

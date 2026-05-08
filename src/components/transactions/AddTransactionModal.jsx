import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Tag, Calendar, Type } from 'lucide-react';
import { addTransaction } from '../../store/slices/transactionSlice';
import { setActiveModal } from '../../store/slices/uiSlice';

const AddTransactionModal = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    text: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  });

  const categories = {
    income: ['Salary', 'Freelance', 'Investments', 'Gift', 'Other'],
    expense: ['Food', 'Housing', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Other']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.text || !formData.amount) return;

    dispatch(addTransaction({
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount)
    }));
    dispatch(setActiveModal(null));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => dispatch(setActiveModal(null))}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      ></motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white dark:bg-dark-card rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 dark:border-dark-border flex items-center justify-between">
          <h2 className="text-xl font-bold">Add Transaction</h2>
          <button 
            onClick={() => dispatch(setActiveModal(null))}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
            {['income', 'expense'].map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, type, category: categories[type][0] })}
                className={`flex-1 py-3 rounded-xl text-sm font-bold capitalize transition-all ${
                  formData.type === type 
                    ? 'bg-white dark:bg-dark-card shadow-lg text-primary' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Description"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                required
              />
            </div>

            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="number" 
                placeholder="Amount"
                step="0.01"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium appearance-none"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories[formData.type].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="date" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full btn-primary py-4 text-lg shadow-xl shadow-primary/30">
            Add {formData.type}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTransactionModal;

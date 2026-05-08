import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || [
    { id: 1, text: 'Salary', amount: 5000, type: 'income', category: 'Job', date: '2024-05-01' },
    { id: 2, text: 'Rent', amount: 1500, type: 'expense', category: 'Housing', date: '2024-05-02' },
    { id: 3, text: 'Groceries', amount: 300, type: 'expense', category: 'Food', date: '2024-05-03' },
    { id: 4, text: 'Freelance Work', amount: 1200, type: 'income', category: 'Side Project', date: '2024-05-05' },
  ],
  status: 'idle',
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
      }
    }
  },
});

export const { addTransaction, deleteTransaction, updateTransaction } = transactionSlice.actions;

export const selectAllTransactions = (state) => state.transactions.transactions;
export const selectTotalBalance = (state) => 
  state.transactions.transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0);
export const selectTotalIncome = (state) => 
  state.transactions.transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
export const selectTotalExpenses = (state) => 
  state.transactions.transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

export default transactionSlice.reducer;

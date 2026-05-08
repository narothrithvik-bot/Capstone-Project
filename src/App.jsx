import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import AddTransactionModal from './components/transactions/AddTransactionModal';
import { useSelector } from 'react-redux';
import { selectActiveModal } from './store/slices/uiSlice';
import { AnimatePresence } from 'framer-motion';

// Lazy loading pages for performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Settings = lazy(() => import('./pages/Settings'));
import { Reports, Budget } from './pages/Placeholders';

const App = () => {
  const activeModal = useSelector(selectActiveModal);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </main>
      </div>

      <AnimatePresence>
        {activeModal === 'add-transaction' && <AddTransactionModal />}
      </AnimatePresence>
    </div>
  );
};

export default App;

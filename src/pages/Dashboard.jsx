import { useDispatch, useSelector } from 'react-redux';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Plus, 
  ArrowUpRight,
  Calendar
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { selectTotalBalance, selectTotalIncome, selectTotalExpenses } from '../store/slices/transactionSlice';
import { setActiveModal } from '../store/slices/uiSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const totalBalance = useSelector(selectTotalBalance);
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpenses = useSelector(selectTotalExpenses);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-slate-500 dark:text-dark-muted">Welcome back! Here's what's happening with your money.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border px-4 py-2 rounded-xl text-sm font-medium">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>May 2024</span>
          </div>
          <button 
            onClick={() => dispatch(setActiveModal('add-transaction'))}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Balance" 
          amount={totalBalance} 
          icon={Wallet} 
          color="bg-blue-500"
          trend="+12.5%"
          trendUp={true}
        />
        <StatCard 
          title="Total Income" 
          amount={totalIncome} 
          icon={TrendingUp} 
          color="bg-primary"
          trend="+8.2%"
          trendUp={true}
        />
        <StatCard 
          title="Total Expenses" 
          amount={totalExpenses} 
          icon={TrendingDown} 
          color="bg-expense"
          trend="+5.1%"
          trendUp={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ExpenseChart />
          <RecentTransactions />
        </div>
        
        <div className="space-y-8">
          <div className="card glass">
            <h3 className="text-lg font-bold mb-4">Savings Goal</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">New MacBook Pro</span>
                <span className="font-bold">75%</span>
              </div>
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-slate-400 text-center">You need $500 more to reach your goal.</p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl shadow-slate-900/20">
            <h3 className="text-lg font-bold mb-2">Financial Tip</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Based on your spending patterns, you can save an extra $150 this month by reducing "Dining Out" expenses.
            </p>
            <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
              View Insights <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

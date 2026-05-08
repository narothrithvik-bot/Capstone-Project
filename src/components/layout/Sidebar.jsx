import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Settings as SettingsIcon, 
  PieChart, 
  TrendingUp, 
  Wallet,
  X
} from 'lucide-react';
import { selectIsSidebarOpen, toggleSidebar } from '../../store/slices/uiSlice';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Sidebar = () => {
  const isOpen = useSelector(selectIsSidebarOpen);
  const dispatch = useDispatch();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ArrowLeftRight, label: 'Transactions', path: '/transactions' },
    { icon: PieChart, label: 'Reports', path: '/reports' },
    { icon: TrendingUp, label: 'Budget', path: '/budget' },
    { icon: SettingsIcon, label: 'Settings', path: '/settings' },
  ];

  const sidebarClasses = twMerge(
    clsx(
      "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-dark-card border-r border-slate-200 dark:border-dark-border transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
      !isOpen && "-translate-x-full lg:w-20"
    )
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        ></div>
      )}

      <aside className={sidebarClasses}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className={clsx("font-bold text-xl tracking-tight transition-opacity", !isOpen && "lg:opacity-0")}>
                FinTrack
              </span>
            </div>
            <button 
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => twMerge(
                  clsx(
                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-slate-500 dark:text-dark-muted hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary"
                  )
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={clsx("font-medium transition-opacity", !isOpen && "lg:hidden")}>
                  {item.label}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 mt-auto">
            <div className={clsx(
              "bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 transition-opacity",
              !isOpen && "lg:opacity-0"
            )}>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Upgrade Account</p>
              <p className="text-sm font-medium mb-3">Get advanced analytics and insights.</p>
              <button className="w-full btn-primary text-sm py-2">Go Pro</button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

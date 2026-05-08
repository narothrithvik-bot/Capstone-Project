import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Moon, Sun, Bell, Menu } from 'lucide-react';
import { toggleDarkMode, toggleSidebar, selectDarkMode } from '../../store/slices/uiSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const isDark = useSelector(selectDarkMode);

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 glass dark:bg-dark-card/50 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search transactions..."
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-expense rounded-full"></span>
        </button>
        
        <button 
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

        <div className="flex items-center gap-3 pl-2">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold">Rithvik Naroth</p>
            <p className="text-xs text-slate-500 dark:text-dark-muted">Pro Plan</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
            RN
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

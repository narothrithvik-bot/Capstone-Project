import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  User, 
  Bell, 
  Lock, 
  Eye, 
  Database,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { toggleDarkMode, selectDarkMode } from '../store/slices/uiSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const isDark = useSelector(selectDarkMode);

  const sections = [
    {
      title: 'Account Settings',
      items: [
        { icon: User, label: 'Profile Information', description: 'Update your personal details and photo.' },
        { icon: Lock, label: 'Security', description: 'Change password and manage 2FA settings.' },
        { icon: Bell, label: 'Notifications', description: 'Configure how you receive alerts.' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Eye, label: 'Appearance', description: 'Manage theme and visual settings.', toggle: true, value: isDark, action: () => dispatch(toggleDarkMode()) },
        { icon: Database, label: 'Data Management', description: 'Export or import your transaction data.' },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-slate-500 dark:text-dark-muted">Manage your account preferences and application settings.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2">{section.title}</h3>
            <div className="card glass divide-y divide-slate-100 dark:divide-dark-border p-0 overflow-hidden">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-primary transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.description}</p>
                    </div>
                  </div>
                  
                  {item.toggle ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        item.action();
                      }}
                      className={`w-12 h-6 rounded-full transition-colors relative ${item.value ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${item.value ? 'translate-x-6' : ''}`}></div>
                    </button>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-4">
          <div className="card border-rose-100 dark:border-rose-900/30 bg-rose-50/50 dark:bg-rose-900/10">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-500">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-rose-600 dark:text-rose-400">Danger Zone</h3>
                <p className="text-sm text-rose-500/70 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="px-4 py-2 bg-rose-500 text-white rounded-xl text-sm font-bold hover:bg-rose-600 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

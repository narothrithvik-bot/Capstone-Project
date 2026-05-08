import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../store/slices/uiSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ExpenseChart = () => {
  const isDark = useSelector(selectDarkMode);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#fff',
        titleColor: isDark ? '#f8fafc' : '#0f172a',
        bodyColor: isDark ? '#94a3b8' : '#64748b',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? '#64748b' : '#94a3b8',
        },
      },
      y: {
        grid: {
          color: isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.5)',
          drawBorder: false,
        },
        ticks: {
          color: isDark ? '#64748b' : '#94a3b8',
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Income',
        data: [4000, 4500, 4200, 5000, 4800, 5200, 5000],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
      {
        fill: true,
        label: 'Expenses',
        data: [2500, 2800, 3000, 2200, 3100, 2700, 2900],
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="card glass">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Financial Overview</h3>
          <p className="text-sm text-slate-500 dark:text-dark-muted">Money flow in the last 7 months</p>
        </div>
        <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-3 py-1 font-medium focus:ring-0">
          <option>This Year</option>
          <option>Last Year</option>
        </select>
      </div>
      <div className="h-64">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default ExpenseChart;

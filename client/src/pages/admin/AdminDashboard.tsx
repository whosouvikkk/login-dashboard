import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Users, Zap, Wallet, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalCredits: 0, totalServices: 3 });

  useEffect(() => {
    api.get('/admin/users').then(res => {
      const users = res.data;
      const credits = users.reduce((acc: number, u: any) => acc + (u.credits || 0), 0);
      setStats({ totalUsers: users.length, totalCredits: credits, totalServices: 3 });
    }).catch(() => toast.error('Failed to fetch admin metrics'));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">System Overview</h1>
        <p className="text-text-muted text-sm">Global platform analytics and resource allocation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-6 border-purple-500/20">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm text-text-muted">Total Registered</span>
            <Users className="text-primary" size={20} />
          </div>
          <div className="text-3xl font-black text-white">{stats.totalUsers}</div>
          <span className="text-xs text-emerald-400 mt-2 block">Active User Accounts</span>
        </div>

        <div className="glass-panel p-6 border-purple-500/20">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm text-text-muted">Circulating Credits</span>
            <Wallet className="text-primary" size={20} />
          </div>
          <div className="text-3xl font-black text-primary">{stats.totalCredits}</div>
          <span className="text-xs text-text-muted mt-2 block">Total System Economy</span>
        </div>

        <div className="glass-panel p-6 border-purple-500/20">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm text-text-muted">Active Modules</span>
            <Zap className="text-primary" size={20} />
          </div>
          <div className="text-3xl font-black text-white">{stats.totalServices}</div>
          <span className="text-xs text-emerald-400 mt-2 block">100% Uptime</span>
        </div>

        <div className="glass-panel p-6 border-purple-500/20">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm text-text-muted">API Health</span>
            <Activity className="text-primary" size={20} />
          </div>
          <div className="text-3xl font-black text-emerald-400">Optimal</div>
          <span className="text-xs text-text-muted mt-2 block">Vercel Serverless Ready</span>
        </div>
      </div>
    </div>
  );
}

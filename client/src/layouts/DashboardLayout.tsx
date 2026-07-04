import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Zap, User as UserIcon, LogOut, Shield } from 'lucide-react';

export default function DashboardLayout() {
  const { user, logout, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-medium animate-pulse">Loading Workspace...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Services', path: '/dashboard/services', icon: Zap },
    { label: 'Profile', path: '/dashboard/profile', icon: UserIcon },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 glass-panel m-4 flex flex-col justify-between hidden md:flex border-white/10">
        <div>
          <div className="p-6 text-2xl font-bold tracking-wide text-white flex items-center gap-3 border-b border-white/5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow">
              <span className="text-white text-lg font-black">M</span>
            </div>
            MoonWitch
          </div>
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    active ? 'bg-primary text-white shadow-glow' : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} /> {item.label}
                </Link>
              );
            })}
            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-purple-400 hover:bg-purple-500/10 mt-4 border border-purple-500/20"
              >
                <Shield size={18} /> Admin Portal
              </Link>
            )}
          </nav>
        </div>
        <div className="p-4 border-t border-white/10">
          <button onClick={logout} className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-red-500/10 transition-colors text-red-400 font-medium">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col m-4 md:ml-0 overflow-hidden">
        <header className="glass-panel mb-4 p-4 flex justify-between items-center px-6">
          <h2 className="text-lg font-semibold text-white">Platform Workspace</h2>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-semibold text-sm border border-primary/30 flex items-center gap-2 shadow-glow">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              {user.credits} Moon Credits
            </div>
            <Link to="/dashboard/profile" className="h-10 w-10 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center border border-white/10 text-white font-bold transition-all">
              {user.username.charAt(0).toUpperCase()}
            </Link>
          </div>
        </header>
        <div className="flex-1 glass-panel p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

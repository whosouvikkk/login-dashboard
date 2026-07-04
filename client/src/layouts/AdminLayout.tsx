import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, Zap, LayoutDashboard, ArrowLeft, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const { user, logout, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-medium">Loading Admin Panel...</div>;
  if (!user || user.role !== 'admin') return <Navigate to="/dashboard" replace />;

  const adminNav = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'User Management', path: '/admin/users', icon: Users },
    { label: 'Services Config', path: '/admin/services', icon: Zap },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 glass-panel m-4 flex flex-col justify-between border-purple-500/30">
        <div>
          <div className="p-6 text-xl font-bold tracking-wide text-white flex items-center gap-3 border-b border-white/10">
            <Shield className="text-primary" /> Admin Command
          </div>
          <nav className="p-4 space-y-1.5">
            {adminNav.map((item) => {
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
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:text-white hover:bg-white/5 font-medium mt-8 border border-white/5">
              <ArrowLeft size={18} /> Exit Admin
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-white/10">
          <button onClick={logout} className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-red-500/10 text-red-400 font-medium">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 m-4 ml-0 glass-panel p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

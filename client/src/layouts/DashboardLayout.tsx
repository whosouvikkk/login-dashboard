import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, Zap, LogOut, Settings } from 'lucide-react';

export default function DashboardLayout() {
  const { user, logout, loading } = useAuth();
  const location = useLocation();

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-primary animate-pulse-slow">
      <div className="h-12 w-12 border-t-2 border-primary rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400 font-medium">Initializing Workspace...</p>
    </div>
  );
  
  if (!user) return <Navigate to="/login" replace />;

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Services', path: '/dashboard/services', icon: Zap },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-background/50 p-4 gap-6 animate-fade-in">
      {/* Floating Sidebar */}
      <aside className="w-64 glass-panel flex-col justify-between hidden md:flex sticky top-4 h-[calc(100vh-2rem)]">
        <div>
          <div className="p-8 pb-6 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark shadow-glow flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-wide">
              MoonWitch
            </span>
          </div>
          
          <nav className="px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link key={item.name} to={item.path} 
                  className={`flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_0_20px_rgba(139,92,246,0.05)]' 
                    : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'}`}>
                  <Icon size={20} className={isActive ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300 transition-colors'} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 mt-auto mb-4 mx-4 border-t border-white/5 pt-6">
          <button onClick={logout} className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-red-500/10 transition-colors text-gray-400 hover:text-red-400 group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col h-[calc(100vh-2rem)]">
        {/* Top Header */}
        <header className="glass-panel mb-6 p-4 px-6 flex justify-between items-center z-10 shrink-0">
          <h2 className="text-lg font-medium text-gray-200">
            Welcome back, <span className="text-white font-semibold">{user?.username || 'User'}</span>
          </h2>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 bg-surface/50 border border-white/5 px-4 py-2 rounded-xl backdrop-blur-md">
                <span className="text-gray-400 text-sm">Balance</span>
                <div className="h-1 w-1 bg-primary rounded-full animate-pulse"></div>
                <span className="text-primary font-bold">{user?.credits ?? 0}</span>
             </div>
             
             <div className="h-10 w-10 bg-gradient-to-tr from-surface to-primary/20 rounded-xl flex items-center justify-center border border-white/10 text-white font-bold shadow-lg cursor-pointer hover:border-primary/50 transition-colors">
               {user?.username?.charAt(0)?.toUpperCase() || 'U'}
             </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto pr-2 pb-10 custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

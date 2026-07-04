import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-wider text-white">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow">
            <span className="text-white text-lg font-black">M</span>
          </div>
          MoonWitch
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-text-muted text-sm font-medium">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="btn-primary">
              {user.role === 'admin' && <Shield size={16} />}
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-text-muted hover:text-white px-4 py-2 font-medium transition-colors">Login</Link>
              <Link to="/signup" className="btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', data);
      login(res.data.token, res.data.user);
      toast.success('Welcome back to MoonWitch!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <div className="absolute top-10 left-10">
        <Link to="/" className="text-white font-bold text-xl tracking-wider flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-sm font-black shadow-glow">M</div>
          MoonWitch
        </Link>
      </div>
      <div className="glass-panel p-8 w-full max-w-md border-white/10 shadow-glow">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Sign In to Dashboard</h2>
        <p className="text-text-muted text-sm text-center mb-8">Enter your credentials to access your unified services.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1.5">Email Address</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="input-field"
              placeholder="you@domain.com"
            />
            {errors.email && <span className="text-red-400 text-xs mt-1 block">{String(errors.email.message)}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1.5">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="input-field"
              placeholder="••••••••"
            />
            {errors.password && <span className="text-red-400 text-xs mt-1 block">{String(errors.password.message)}</span>}
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3">
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-text-muted mt-6">
          New to MoonWitch? <Link to="/signup" className="text-primary hover:underline font-medium">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

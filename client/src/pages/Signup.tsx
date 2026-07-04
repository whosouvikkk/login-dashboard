import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', {
        username: data.username,
        email: data.email,
        password: data.password
      });
      login(res.data.token, res.data.user);
      toast.success('Account provisioned successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed.');
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
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Create Shared Account</h2>
        <p className="text-text-muted text-sm text-center mb-8">One identity for all current and future SaaS tools.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Username</label>
            <input
              type="text"
              {...register('username', { required: 'Username is required', minLength: { value: 3, message: 'Minimum 3 characters' } })}
              className="input-field"
              placeholder="johndoe"
            />
            {errors.username && <span className="text-red-400 text-xs mt-1 block">{String(errors.username.message)}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Email Address</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="input-field"
              placeholder="you@domain.com"
            />
            {errors.email && <span className="text-red-400 text-xs mt-1 block">{String(errors.email.message)}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
              className="input-field"
              placeholder="••••••••"
            />
            {errors.password && <span className="text-red-400 text-xs mt-1 block">{String(errors.password.message)}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm password',
                validate: value => value === password || 'Passwords do not match'
              })}
              className="input-field"
              placeholder="••••••••"
            />
            {errors.confirmPassword && <span className="text-red-400 text-xs mt-1 block">{String(errors.confirmPassword.message)}</span>}
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-2">
            {loading ? 'Provisioning Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-text-muted mt-6">
          Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

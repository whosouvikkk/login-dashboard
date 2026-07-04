import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { Zap, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Track toggle state between Login and Sign Up views
  const isSignUp = searchParams.get('mode') === 'signup';
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const passwordValue = watch("password");

  // Redirect if session token is validated automatically
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  // Reset entry inputs whenever shifting viewing forms
  useEffect(() => {
    reset();
  }, [isSignUp, reset]);

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      if (isSignUp) {
        // Run API request context sequence for Registration mapping
        const response = await fetch(import.meta.env.PROD ? '/api/auth/signup' : 'http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password
          })
        });
        const resData = await response.json();
        if (!response.ok) throw new Error(resData.message || 'Signup failed');
        
        toast.success('Registration verified! Secure account established.');
        // Authenticate new payload session token immediately
        await login({ email: data.email, password: data.password });
      } else {
        await login({ email: data.email, password: data.password });
        toast.success('Access configuration verified.');
      }
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Authentication processing exception thrown.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[130px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        {/* Branding Logo header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-purple-800 shadow-glow flex items-center justify-center mb-4 hover:scale-105 transition-transform">
            <Zap size={24} className="text-white" />
          </Link>
          <h2 className="text-2xl font-bold tracking-wide text-white">
            {isSignUp ? 'Initialize Gateway' : 'Access Dashboard'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isSignUp ? 'Create a unified MoonWitch developer wallet' : 'Provide administrative credentials'}
          </p>
        </div>

        {/* Interactive Glassmorphism Form container */}
        <div className="glass-panel p-8 border border-white/5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Username</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-3.5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="dev_operator"
                    className="input-field pl-12"
                    {...register('username', { required: 'Username context string required.' })}
                  />
                </div>
                {errors.username && <p className="text-xs text-red-400 mt-1.5">{errors.username.message as string}</p>}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-3.5 text-gray-500" />
                <input
                  type="email"
                  placeholder="operator@domain.com"
                  className="input-field pl-12"
                  {...register('email', { 
                    required: 'Email routing data required.',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid structured syntax parameters.' }
                  })}
                />
              </div>
              {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email.message as string}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Password Matrix</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-3.5 text-gray-500" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="input-field pl-12"
                  {...register('password', { 
                    required: 'Security string missing key payload.',
                    minLength: { value: 6, message: 'String payload must contain at least 6 tokens.' }
                  })}
                />
              </div>
              {errors.password && <p className="text-xs text-red-400 mt-1.5">{errors.password.message as string}</p>}
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-3.5 text-gray-500" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="input-field pl-12"
                    {...register('confirmPassword', { 
                      required: 'Validation confirmation payload verification required.',
                      validate: value => value === passwordValue || 'Cryptographic entries mismatch detected.'
                    })}
                  />
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-400 mt-1.5">{errors.confirmPassword.message as string}</p>}
              </div>
            )}

            <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5 mt-2 flex items-center justify-center gap-2 font-semibold tracking-wide">
              {submitting ? 'Processing Network State...' : isSignUp ? 'Build Profile Structure' : 'Initialize Session'}
              {!submitting && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-6 text-center text-sm border-t border-white/5 pt-4">
            <span className="text-gray-500">
              {isSignUp ? 'Already registered on node network?' : 'First time running system keys?'}
            </span>{' '}
            <Link 
              to={isSignUp ? '/login' : '/login?mode=signup'} 
              className="text-primary font-medium hover:text-primary-hover hover:underline transition-all"
            >
              {isSignUp ? 'Sign In' : 'Provision New Account'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

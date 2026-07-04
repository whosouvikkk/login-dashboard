import { useEffect, useState } from 'react';
import api from '../services/api';
import { User as UserIcon, Mail, Calendar, Shield, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    api.get('/user/profile').then(res => setProfile(res.data)).catch(() => toast.error('Failed to load profile'));
  }, []);

  if (!profile) return <div className="text-text-muted">Loading profile credentials...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Account Credentials</h1>
        <p className="text-text-muted text-sm">Manage your identity and verify membership status.</p>
      </div>

      <div className="glass-panel p-8 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-white/10">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-black shadow-glow">
            {profile.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{profile.username}</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 uppercase tracking-wider">
              {profile.role} account
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5">
            <div className="text-xs text-text-muted flex items-center gap-1.5 mb-1">
              <UserIcon size={14} className="text-primary" /> Username
            </div>
            <div className="text-white font-medium">{profile.username}</div>
          </div>

          <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5">
            <div className="text-xs text-text-muted flex items-center gap-1.5 mb-1">
              <Mail size={14} className="text-primary" /> Email Address
            </div>
            <div className="text-white font-medium">{profile.email}</div>
          </div>

          <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5">
            <div className="text-xs text-text-muted flex items-center gap-1.5 mb-1">
              <Wallet size={14} className="text-primary" /> Available Balance
            </div>
            <div className="text-primary font-bold text-lg">{profile.credits} Moon Credits</div>
          </div>

          <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5">
            <div className="text-xs text-text-muted flex items-center gap-1.5 mb-1">
              <Calendar size={14} className="text-primary" /> Member Since
            </div>
            <div className="text-white font-medium">{new Date(profile.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

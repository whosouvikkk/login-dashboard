import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Zap, ExternalLink, Activity, ShieldCheck } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  status: string;
  route: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        setServices(res.data);
      } catch (err) {
        toast.error('Failed to load available services');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleLaunch = (serviceName: string) => {
    toast.success(`Initializing sandbox for ${serviceName}...`);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-8 bg-gradient-to-r from-purple-900/20 via-zinc-900/40 to-zinc-900/40 border-purple-500/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.username}</h1>
            <p className="text-text-muted text-sm">Your unified workspace and shared credit wallet are active and ready.</p>
          </div>
          <div className="glass-panel p-6 bg-zinc-950/60 border-primary/40 min-w-48 text-center shadow-glow">
            <span className="text-xs uppercase tracking-widest text-text-muted font-semibold block mb-1">Moon Credits</span>
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-primary">
              {user?.credits}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-primary">
            <Activity size={22} />
          </div>
          <div>
            <div className="text-sm text-text-muted">System Status</div>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> All Systems Operational
            </div>
          </div>
        </div>
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-primary">
            <Zap size={22} />
          </div>
          <div>
            <div className="text-sm text-text-muted">Available Modules</div>
            <div className="text-lg font-bold text-white">{services.length} Connected Services</div>
          </div>
        </div>
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-primary">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="text-sm text-text-muted">Security Tier</div>
            <div className="text-lg font-bold text-white capitalize">{user?.role} Privilege</div>
          </div>
        </div>
      </div>

      {/* Service Cards Section */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="text-primary" size={20} /> Deployable Services
        </h2>
        
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-panel p-6 h-48 animate-pulse bg-white/5"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div key={svc.id} className="glass-panel-interactive p-6 flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Zap size={20} />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {svc.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{svc.name}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">{svc.description}</p>
                </div>
                <button
                  onClick={() => handleLaunch(svc.name)}
                  className="w-full bg-white/5 hover:bg-primary text-white border border-white/10 hover:border-primary py-2.5 rounded-xl transition-all font-medium flex items-center justify-center gap-2 text-sm"
                >
                  Launch Sandbox <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

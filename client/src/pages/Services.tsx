import { useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Zap, ExternalLink } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    api.get('/services').then(res => setServices(res.data)).catch(() => toast.error('Error fetching services'));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Service Ecosystem</h1>
        <p className="text-text-muted text-sm">Select and initialize any connected tool using your shared Moon Credits.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div key={svc.id} className="glass-panel p-6 flex flex-col justify-between border-white/10 hover:border-primary/40 transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  #{svc.id}
                </div>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
                  {svc.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{svc.name}</h3>
              <p className="text-text-muted text-sm mb-6">{svc.description}</p>
            </div>
            <button
              onClick={() => toast.success(`Launching ${svc.name} interface...`)}
              className="btn-primary w-full py-2.5 text-sm"
            >
              Launch Service <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

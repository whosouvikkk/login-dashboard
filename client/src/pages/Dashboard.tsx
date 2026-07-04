import { useAuth } from '../hooks/useAuth';
import {
  Zap,
  Activity,
  Search,
  ArrowRight
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: 'TikTok Views',
      icon: Activity,
      desc: 'Boost TikTok views instantly using your credits.',
      route: "ttservice",
      badge: 'LIVE',
    },
    {
      id: 2,
      title: 'Instagram',
      icon: Zap,
      desc: 'Coming Soon',
      route: '#',
      badge: 'SOON',
    },
    {
  id: 3,
  title: "Osint Bot Lookup",
  icon: Search,
  desc: "Premium Lookup Service",
  route: "ollulu",
  badge: "LIVE",
},
  ];

  return (
    <div className="space-y-8 animate-slide-up max-w-6xl mx-auto">
      
      {/* Hero Stats Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/30 p-8 shadow-2xl backdrop-blur-xl group">
        {/* Animated Gradient Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/30 transition-colors duration-700"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
            <p className="text-gray-400 font-medium text-sm tracking-wider uppercase">Active Credits</p>
          </div>
          
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tight mt-2">
            {user?.credits?.toLocaleString() || '0'}
          </h1>
          
          <p className="text-gray-500 mt-4 max-w-md">
            Credits are consumed when utilizing premium API endpoints or launching automated background tasks.
          </p>
          
          <button className="mt-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 group/btn">
            Top Up Balance 
            <ArrowRight size={16} className="text-gray-400 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Zap size={20} className="text-primary" /> Active Services
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={service.id}
               onClick={() => {
  if (service.route !== "#") {
    navigate(service.route);
  }
}}
                className="glass-panel p-6 border border-white/5 hover:border-primary/40 transition-all duration-500 group cursor-pointer hover:-translate-y-1"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-surface border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary/20 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-500">
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    Ready
                  </span>
                </div>
                
                <h4 className="text-xl font-semibold text-gray-100 group-hover:text-white transition-colors">{service.title}</h4>
                <p className="text-sm text-gray-500 mt-2 mb-6 leading-relaxed">
                  {service.desc}
                </p>
                
                <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent mb-4"></div>
                
                <button className="text-primary font-medium flex items-center gap-2 text-sm hover:text-primary-hover transition-colors">
                  Launch App <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

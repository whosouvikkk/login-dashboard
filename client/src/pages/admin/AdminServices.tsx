import { Zap } from 'lucide-react';

export default function AdminServices() {
  const services = [
    { name: 'Service One', route: '/dashboard/services/1', status: 'Online', enabled: true },
    { name: 'Service Two', route: '/dashboard/services/2', status: 'Online', enabled: true },
    { name: 'Service Three', route: '/dashboard/services/3', status: 'Online', enabled: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Service Configuration</h1>
        <p className="text-text-muted text-sm">Manage microservice routing and system status flags.</p>
      </div>

      <div className="glass-panel overflow-hidden border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-text-muted text-xs uppercase tracking-wider">
              <th className="p-4">Module Name</th>
              <th className="p-4">Route Path</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {services.map((svc, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="p-4 font-semibold text-white flex items-center gap-2">
                  <Zap size={16} className="text-primary" /> {svc.name}
                </td>
                <td className="p-4 text-text-muted font-mono text-xs">{svc.route}</td>
                <td className="p-4">
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    {svc.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-xs bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/10">
                    Configure
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

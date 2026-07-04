export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface/30 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-xl font-bold tracking-wider text-white">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-xs font-black">M</div>
          MoonWitch
        </div>
        <p className="text-text-muted text-sm">© {new Date().getFullYear()} MoonWitch Inc. All rights reserved. Premium SaaS Ecosystem.</p>
        <div className="flex gap-6 text-text-muted text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
}

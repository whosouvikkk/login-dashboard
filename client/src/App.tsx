import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import {
  Zap,
  Shield,
  CreditCard,
  ArrowRight,
  HelpCircle,
  Activity
} from "lucide-react";
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminServices from './pages/admin/AdminServices';
import AdminLogin from './pages/AdminLogin';
import TikTokService from './pages/TikTokService';
import OlluluBot from "./pages/OlluluBot";
import InstagramService from "./pages/InstagramService";

function LandingPage() {
  const faqs = [
    { q: "How do Moon Credits work?", a: "Moon Credits are a unified balance shared across all available tools. Instead of buying individual subscriptions, your credit balance is deducted based on the specific services you launch." },
    { q: "Can I use multiple services at the same time?", a: "Yes. Your single account balance handles execution pipelines concurrently across any active service running on our system." },
    { q: "Are there monthly recurring fees?", a: "No. MoonWitch functions on a pay-as-you-go model. You only expend credits when actively initializing platform tools." }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* ================= Crystal Background ================= */}

<div className="absolute inset-0 overflow-hidden pointer-events-none">

  {/* Purple Glow */}
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/10 blur-[220px]" />

  {/* Top Left Crystal */}
  <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rotate-[22deg] rounded-[80px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl" />

  {/* Top Right Crystal */}
  <div className="absolute top-16 -right-32 w-[420px] h-[420px] -rotate-[18deg] rounded-[100px] border border-primary/20 bg-primary/[0.05] backdrop-blur-3xl" />

  {/* Bottom Left Crystal */}
  <div className="absolute bottom-0 left-10 w-[320px] h-[320px] rotate-45 rounded-[60px] border border-white/5 bg-white/[0.02] backdrop-blur-2xl" />

  {/* Bottom Right Crystal */}
  <div className="absolute -bottom-28 right-10 w-[520px] h-[520px] -rotate-[30deg] rounded-[120px] border border-primary/10 bg-primary/[0.06] backdrop-blur-3xl" />

  {/* Small Floating Crystal */}
  <div className="absolute top-44 left-[18%] w-28 h-28 rotate-45 rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-xl" />

  {/* Small Floating Crystal */}
  <div className="absolute bottom-32 right-[20%] w-20 h-20 rotate-[25deg] rounded-[24px] border border-primary/20 bg-primary/[0.05] backdrop-blur-xl" />

  {/* Grid */}
  <div
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
      backgroundSize: "70px 70px",
    }}
  />

</div>
      <nav className="glass-panel relative z-50 mx-6 mt-6 p-4 px-8 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl overflow-hidden shadow-glow">
  <img
    src="/hi.png"
    alt="MoonWitch"
    className="w-full h-full object-cover"
  />
</div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-wide">
            MoonWitch
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-gray-300 hover:text-white font-medium transition-colors cursor-pointer">
            Sign In
          </Link>
          <Link to="/login?mode=signup" className="btn-primary text-sm cursor-pointer">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="flex-1 max-w-6xl mx-auto px-6 pt-24 pb-16 text-center relative z-10 flex flex-col items-center justify-center animate-slide-up">
        <div className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <span className="text-xs font-semibold px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 tracking-wider uppercase mb-6">
          MoonWitch Services
        </span>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 tracking-tight leading-[1.05] max-w-5xl drop-shadow-[0_0_40px_rgba(139,92,246,0.35)]">
  One Account.
  <br />
  Infinite Possibilities.
</h1>
        
        <p className="text-gray-400 text-lg md:text-xl mt-6 max-w-2xl leading-relaxed">
          Access an expanding suite of premium cloud microservices, monitoring utilities, and data pipelines from a centralized dashboard using one shared credit wallet.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 z-20">
          <Link to="/login?mode=signup" className="btn-primary px-8 py-3.5 flex items-center gap-2 group cursor-pointer hover:scale-105 hover:shadow-[0_0_50px_rgba(139,92,246,0.45)] transition-all duration-300">
            Create an Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/login" className="bg-white/5 hover:bg-white/10 hover:border-primary/30 border border-white/10 text-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 cursor-pointer">
            Dashboard
          </Link>
        </div>
      </section>

      {/* ================= Dashboard Preview ================= */}

<section className="max-w-6xl mx-auto px-6 -mt-6 mb-28 relative z-20">

    <div className="glass-panel border border-white/10 rounded-3xl p-8 hover:scale-[1.01] transition-all duration-500 shadow-[0_0_80px_rgba(139,92,246,.08)]">

        <div className="flex justify-between items-center">

            <div>

                <p className="text-gray-400 uppercase tracking-widest text-xs">

                    Dashboard Preview

                </p>

                <h2 className="text-5xl font-black text-white mt-2">

                    248 Credits

                </h2>

                <p className="text-gray-500 mt-3">

                    Unified Wallet

                </p>

            </div>

            <div className="px-5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-semibold">

                ● ONLINE

            </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="glass-panel p-6 hover:border-primary/30 transition-all">

                <div className="flex justify-between items-center">

                    <h3 className="text-white font-bold">

                        TikTok Views

                    </h3>

                    <Activity
                        className="text-primary"
                        size={24}
                    />

                </div>

                <p className="text-gray-400 text-sm mt-4">

                    High-Speed Delivery

                </p>

                <div className="mt-5 text-green-400">

                    ● READY

                </div>

            </div>

            <div className="glass-panel p-6 hover:border-primary/30 transition-all">

                <div className="flex justify-between items-center">

                    <h3 className="text-white font-bold">

                        Instagram Views

                    </h3>

                    <Zap
                        className="text-primary"
                        size={24}
                    />

                </div>

                <p className="text-gray-400 text-sm mt-4">

                    Instant Processing

                </p>

                <div className="mt-5 text-green-400">

                    ● READY

                </div>

            </div>

            <div className="glass-panel p-6 hover:border-primary/30 transition-all">

                <div className="flex justify-between items-center">

                    <h3 className="text-white font-bold">

                        OSINT Lookup

                    </h3>

                    <Shield
                        className="text-primary"
                        size={24}
                    />

                </div>

                <p className="text-gray-400 text-sm mt-4">

                    Premium Lookup

                </p>

                <div className="mt-5 text-green-400">

                    ● READY

                </div>

            </div>

        </div>

    </div>

</section>

      <section id="features" className="max-w-6xl mx-auto px-6 py-20 w-full relative z-10 animate-fade-in">
        <h3 className="text-2xl font-bold text-white mb-12 text-center tracking-wide">Engineered for Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 border border-white/5 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_0_45px_rgba(139,92,246,0.15)] transition-all duration-500">
            <div className="h-12 w-12 rounded-xl bg-surface border border-white/5 flex items-center justify-center text-primary mb-6 shadow-md">
              <Shield size={22} />
            </div>
            <h4 className="text-lg font-semibold text-white">Secure Account</h4>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Industrial grade JWT sessions paired with cryptographic password hashing keeps your service integrations fully isolated.
            </p>
          </div>
          <div className="glass-panel p-8 border border-white/5 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_0_45px_rgba(139,92,246,0.15)] transition-all duration-500">
            <div className="h-12 w-12 rounded-xl bg-surface border border-white/5 flex items-center justify-center text-primary mb-6 shadow-md">
              <CreditCard size={22} />
            </div>
            <h4 className="text-lg font-semibold text-white">One Shared Credit Wallet</h4>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Eliminate multiple platform subscriptions. Deposit balance once and scale compute consumption fluidly across tools.
            </p>
          </div>
          <div className="glass-panel p-8 border border-white/5 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_0_45px_rgba(139,92,246,0.15)] transition-all duration-500">
            <div className="h-12 w-12 rounded-xl bg-surface border border-white/5 flex items-center justify-center text-primary mb-6 shadow-md">
              <Zap size={22} />
            </div>
            <h4 className="text-lg font-semibold text-white">Premium Services</h4>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Instantly deploy specialized automation tasks, notification webhooks, and raw structural databases on-demand.
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20 w-full relative z-10">
        <h3 className="text-2xl font-bold text-white mb-16 text-center tracking-wide">Simple Pipeline Onboarding</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="text-center relative">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary border border-primary/30 mx-auto flex items-center justify-center font-bold mb-4">1</div>
            <h5 className="text-white font-semibold">Create Account</h5>
            <p className="text-xs text-gray-400 mt-2 px-4">Register your platform credentials securely in under 30 seconds.</p>
          </div>
          <div className="text-center relative">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary border border-primary/30 mx-auto flex items-center justify-center font-bold mb-4">2</div>
            <h5 className="text-white font-semibold">Load Shared Wallet</h5>
            <p className="text-xs text-gray-400 mt-2 px-4">Acquire credit metrics configured automatically inside your developer profile.</p>
          </div>
          <div className="text-center relative">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary border border-primary/30 mx-auto flex items-center justify-center font-bold mb-4">3</div>
            <h5 className="text-white font-semibold">Deploy Infrastructure</h5>
            <p className="text-xs text-gray-400 mt-2 px-4">Initialize any active MoonWitch utility card directly from your dashboard core.</p>
          </div>
        </div>
      </section>

      <section id="faq" className="max-w-3xl mx-auto px-6 py-20 w-full relative z-10">
        <h3 className="text-2xl font-bold text-white mb-12 text-center tracking-wide flex items-center justify-center gap-2">
          <HelpCircle size={24} className="text-primary" /> Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-panel p-6 border border-white/5 hover:border-primary/25 hover:bg-white/[0.02] transition-all duration-300">
              <h5 className="text-white font-medium text-base">{faq.q}</h5>
              <p className="text-sm text-gray-400 mt-2.5 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="relative h-32 overflow-hidden">

  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[300px] bg-primary/10 blur-[180px]" />

</div>

      <footer className="border-t border-white/5 bg-surface/20 backdrop-blur-md p-8 px-12 mt-auto text-center md:flex md:justify-between md:items-center text-sm text-gray-500">
        <p>© 2026 MoonWitch. All rights operational.</p>
        <div className="flex gap-6 justify-center mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
          <a href="https://t.me/moonwitchadminbot" className="hover:text-gray-300 transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          
        <Route path="/dashboard" element={<DashboardLayout />}>

    <Route index element={<Dashboard />} />

    <Route
        path="ttservice"
        element={<TikTokService />}
    />

    <Route
        path="instagram"
        element={<InstagramService />}
    />

    <Route
        path="ollulu"
        element={<OlluluBot />}
    />

    <Route
        path="services"
        element={
            <div className="text-gray-400 p-8 glass-panel border border-white/5 mt-4">
                Services index coming soon.
            </div>
        }
    />

    <Route
        path="settings"
        element={
            <div className="p-8 max-w-2xl mt-4">

                <h3 className="text-2xl font-bold text-white mb-6">
                    Profile Settings
                </h3>

                <div className="glass-panel p-6 border border-white/5 space-y-4">

                    <div>

                        <label className="block text-sm text-gray-400 mb-1">
                            Account Role
                        </label>

                        <div className="text-white font-medium px-4 py-2 bg-surface/50 rounded-lg inline-block border border-white/5">
                            Standard Operator
                        </div>

                    </div>

                    <div>

                        <label className="block text-sm text-gray-400 mb-1">
                            Notification Preferences
                        </label>

                        <p className="text-sm text-gray-500">
                            Discord Webhooks configured globally.
                        </p>

                    </div>

                </div>

            </div>
        }
    />

</Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="services" element={<AdminServices />} />
          </Route>

        </Routes>
      </BrowserRouter>
      
      <Toaster 
        position="bottom-right" 
        toastOptions={{ 
          style: { 
            background: '#0B0914', 
            color: '#fff', 
            border: '1px solid rgba(255,255,255,0.1)' 
          }
        }} 
      />
    </AuthProvider>
  );
}

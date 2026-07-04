import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Wallet, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-36 pb-24 px-6 text-center max-w-5xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <span className="bg-primary/10 text-primary border border-primary/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest inline-block mb-6">
          Next-Gen SaaS Architecture
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
          One Account. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-primary">Multiple Services.</span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 font-normal">
          MoonWitch gives you unified access to an expanding ecosystem of premium AI, cloud, and data services from one minimalist dashboard using a single credit balance.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="btn-primary text-lg px-8 py-3.5">
            Get Started <ChevronRight size={20} />
          </Link>
          <Link to="/login" className="btn-secondary text-lg px-8 py-3.5">
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-16">Architected for Scale & Simplicity</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-panel p-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6 shadow-glow">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Secure Account</h3>
            <p className="text-text-muted leading-relaxed">
              Enterprise-grade JWT authentication with bcrypt password hashing and strict role-based access control to keep your workspace protected.
            </p>
          </div>
          <div className="glass-panel p-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6 shadow-glow">
              <Wallet size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">One Shared Credit Wallet</h3>
            <p className="text-text-muted leading-relaxed">
              Never manage multiple subscriptions. Deposit Moon Credits once and expend them dynamically across any tool or service on the platform.
            </p>
          </div>
          <div className="glass-panel p-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6 shadow-glow">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Premium Services</h3>
            <p className="text-text-muted leading-relaxed">
              Gain immediate access to predictive analytics tools, automated workflow engines, and secure cloud storage vaults—all from one interface.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 max-w-5xl mx-auto border-t border-white/5">
        <h2 className="text-3xl font-bold text-center text-white mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center relative">
          <div className="glass-panel p-8 relative z-10">
            <div className="text-primary font-black text-4xl mb-4">01</div>
            <h4 className="text-lg font-semibold text-white mb-2">Create Account</h4>
            <p className="text-sm text-text-muted">Sign up in seconds with our streamlined, secure onboarding process.</p>
          </div>
          <div className="glass-panel p-8 relative z-10">
            <div className="text-primary font-black text-4xl mb-4">02</div>
            <h4 className="text-lg font-semibold text-white mb-2">Acquire Credits</h4>
            <p className="text-sm text-text-muted">Receive initial credits or top up your shared wallet instantly.</p>
          </div>
          <div className="glass-panel p-8 relative z-10">
            <div className="text-primary font-black text-4xl mb-4">03</div>
            <h4 className="text-lg font-semibold text-white mb-2">Launch Services</h4>
            <p className="text-sm text-text-muted">Deploy any connected MoonWitch service seamlessly from your dashboard.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto border-t border-white/5">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "How does the shared credit system work?", a: "Instead of paying separate subscriptions for every software tool, you hold a single balance of Moon Credits. Each service consumes credits only when you actively use it." },
            { q: "Can I add more services in the future?", a: "Yes. MoonWitch is built on a modular, microservice-ready architecture. New tools automatically appear in your dashboard as they are deployed." },
            { q: "Is my data and credit balance secure?", a: "Absolutely. We utilize industry-standard bcrypt hashing for credentials, JSON Web Tokens for stateless authentication, and MongoDB Atlas for encrypted storage." }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-6">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-primary" /> {item.q}
              </h4>
              <p className="text-text-muted text-sm pl-6">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

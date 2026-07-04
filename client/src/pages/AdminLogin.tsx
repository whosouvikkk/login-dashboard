import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Shield } from "lucide-react";

const ADMIN_PASSWORD = "kaddulele";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("moonwitch_admin", "true");
      toast.success("Admin access granted.");
      navigate("/admin", { replace: true });
    } else {
      toast.error("Invalid admin password.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="glass-panel p-8 w-full max-w-md border border-white/5 relative z-10 animate-slide-up">

        <div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-purple-800 shadow-glow flex items-center justify-center mb-4">
            <Shield className="text-white" size={28} />
          </div>

          <h1 className="text-2xl font-bold text-white">
            Admin Login
          </h1>

          <p className="text-sm text-gray-500 mt-2 text-center">
            Enter your administrator password to continue.
          </p>
        </div>

        <input
          type="password"
          placeholder="Administrator Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#0B0914]/80 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 outline-none focus:border-primary mb-6"
        />

        <button
          onClick={handleLogin}
          className="btn-primary w-full py-3 font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}

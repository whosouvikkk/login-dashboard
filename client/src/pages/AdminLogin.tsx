import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ADMIN_PASSWORD = "CHANGE_ME_TO_YOUR_PASSWORD";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("moonwitch_admin", "true");
      navigate("/admin");
    } else {
      toast.error("Invalid admin password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass-panel p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">
          Admin Login
        </h1>

        <input
          type="password"
          className="w-full bg-surface rounded-xl p-3 mb-5"
          placeholder="Admin Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="btn-primary w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}

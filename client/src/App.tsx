import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

// Simple placeholders for Landing and Login components until you build the real ones
const Landing = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white p-10">
    <h1 className="text-4xl font-bold mb-4">MoonWitch</h1>
    <a href="/login" className="btn-primary mt-4">Go to Login</a>
  </div>
);

const Login = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white p-10">
    <h1 className="text-3xl font-bold mb-4">Login Page</h1>
    <a href="/dashboard" className="btn-primary mt-4">Go to Dashboard</a>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard routes wrapped in the Layout */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="services" element={<div className="text-gray-400 p-8">Services page coming soon.</div>} />
            <Route path="settings" element={<div className="text-gray-400 p-8">Settings page coming soon.</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
      
      {/* Toast notifications configuration */}
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

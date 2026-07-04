import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Profile from './pages/Profile';

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminServices from './pages/admin/AdminServices';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{
          style: { background: '#121212', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
        }}/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User Protected Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="services" element={<Services />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Admin Protected Portal */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="services" element={<AdminServices />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

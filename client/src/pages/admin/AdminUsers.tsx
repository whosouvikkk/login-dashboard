import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Search, Plus, Minus, Trash2 } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [creditAmount, setCreditAmount] = useState<string>('');

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch {
      toast.error('Failed to load user directory');
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreditChange = async (userId: string, action: 'add' | 'remove') => {
    if (!creditAmount || isNaN(Number(creditAmount)) || Number(creditAmount) <= 0) {
      return toast.error('Enter a valid credit amount');
    }
    try {
      await api.put(`/admin/user/${userId}/credits`, { amount: Number(creditAmount), action });
      toast.success(`Credits successfully ${action === 'add' ? 'added' : 'removed'}`);
      setCreditAmount('');
      setSelectedUser(null);
      fetchUsers();
    } catch {
      toast.error('Failed to update credit balance');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action is irreversible.')) return;
    try {
      await api.delete(`/admin/user/${userId}`);
      toast.success('User removed from database');
      fetchUsers();
    } catch {
      toast.error('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">User Directory</h1>
          <p className="text-text-muted text-sm">Manage accounts, roles, and credit balances.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3.5 text-text-muted" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 py-2.5 text-sm"
          />
        </div>
      </div>

      <div className="glass-panel overflow-x-auto border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-text-muted text-xs uppercase tracking-wider">
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Credits</th>
              <th className="p-4">Joined</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {filteredUsers.map((u) => (
              <tr key={u._id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="font-semibold text-white">{u.username}</div>
                  <div className="text-xs text-text-muted">{u.email}</div>
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full uppercase font-semibold ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-zinc-800 text-text-muted'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4 font-bold text-primary">{u.credits}</td>
                <td className="p-4 text-text-muted text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => setSelectedUser(selectedUser?._id === u._id ? null : u)}
                    className="bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-white/10"
                  >
                    Manage Credits
                  </button>
                  {u.role !== 'admin' && (
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors inline-block align-middle"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="glass-panel p-6 border-purple-500/40 bg-zinc-950/90 max-w-md mx-auto shadow-glow animate-fade-in">
          <h3 className="text-lg font-bold text-white mb-1">Modify Credits: <span className="text-primary">{selectedUser.username}</span></h3>
          <p className="text-xs text-text-muted mb-4">Current Balance: {selectedUser.credits} Moon Credits</p>
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              placeholder="Amount..."
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
              className="input-field py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleCreditChange(selectedUser._id, 'add')}
              className="btn-primary flex-1 py-2 text-xs bg-emerald-600 hover:bg-emerald-500 shadow-none flex items-center justify-center gap-1"
            >
              <Plus size={14} /> Add Credits
            </button>
            <button
              onClick={() => handleCreditChange(selectedUser._id, 'remove')}
              className="btn-primary flex-1 py-2 text-xs bg-red-600 hover:bg-red-500 shadow-none flex items-center justify-center gap-1"
            >
              <Minus size={14} /> Remove Credits
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

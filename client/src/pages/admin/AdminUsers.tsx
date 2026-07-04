import { useEffect, useMemo, useState } from "react";
import { Search, Eye, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";
import UserModal from "../../components/admin/UserModal";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  credits: number;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/admin/users");

      setUsers(data);
    } catch {
      toast.error("Unable to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = search.toLowerCase();

      return (
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
      );
    });
  }, [users, search]);

  const deleteUser = async (id: string) => {
    if (!window.confirm("Delete this user permanently?")) return;

    try {
      await api.delete(`/admin/user/${id}`);

      toast.success("User deleted.");

      fetchUsers();
    } catch {
      toast.error("Unable to delete user.");
    }
  };

  if (loading) {
    return (
      <div className="text-white text-lg">
        Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-white">
            User Management
          </h1>

          <p className="text-text-muted mt-1">
            Total Users : {users.length}
          </p>

        </div>

        <div className="relative w-80">

          <Search
            className="absolute left-3 top-3 text-text-muted"
            size={18}
          />

          <input
            className="input-field pl-10"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      <div className="glass-panel overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10">

              <th className="text-left p-4">Username</th>

              <th className="text-left p-4">Email</th>

              <th className="text-left p-4">Role</th>

              <th className="text-left p-4">Credits</th>

              <th className="text-left p-4">
                Mongo ID
              </th>

              <th className="text-left p-4">
                Created
              </th>

              <th className="text-left p-4">
                Updated
              </th>

              <th className="text-left p-4">
                Last Login
              </th>

              <th className="text-right p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
                        {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="p-4 font-semibold text-white">
                  {user.username}
                </td>

                <td className="p-4 text-gray-300">
                  {user.email}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-purple-600/20 text-purple-300"
                        : "bg-white/10 text-gray-300"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4 font-bold text-primary">
                  {user.credits}
                </td>

                <td className="p-4 text-xs text-gray-400 max-w-[220px] break-all">
                  {user._id}
                </td>

                <td className="p-4 text-xs text-gray-400">
                  {new Date(user.createdAt).toLocaleString()}
                </td>

                <td className="p-4 text-xs text-gray-400">
                  {new Date(user.updatedAt).toLocaleString()}
                </td>

                <td className="p-4 text-xs text-gray-400">
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : "Never"}
                </td>

                <td className="p-4">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => setSelectedUser(user)}
                      className="bg-primary hover:bg-primary/80 text-white rounded-lg p-2 transition"
                    >
                      <Eye size={16} />
                    </button>

                    {user.role !== "admin" && (
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-2 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}

                  </div>

                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="p-10 text-center text-gray-400">
            No users found.
          </div>
        )}

      </div>

      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          refreshUsers={fetchUsers}
        />
      )}

    </div>
  );
}

import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

interface Props {
  user: any;
  onClose: () => void;
  refreshUsers: () => void;
}

export default function UserModal({
  user,
  onClose,
  refreshUsers,
}: Props) {
  const [amount, setAmount] = useState("");

  const updateCredits = async (type: "add" | "remove", value?: number) => {
    try {
      const credits = value ?? Number(amount);

      if (!credits || credits <= 0) {
        toast.error("Enter a valid amount");
        return;
      }

      await api.put(`/admin/user/${user._id}/credits`, {
        amount: credits,
        type,
      });

      toast.success("Credits updated.");

      refreshUsers();
      onClose();
    } catch (err) {
      toast.error("Unable to update credits.");
    }
  };

  const deleteUser = async () => {
    if (!confirm("Delete this user permanently?")) return;

    try {
      await api.delete(`/admin/user/${user._id}`);

      toast.success("User deleted.");

      refreshUsers();
      onClose();
    } catch {
      toast.error("Unable to delete user.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6">

      <div className="glass-panel max-w-2xl w-full p-8 relative">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-3xl font-bold text-white mb-8">
          User Management
        </h2>

        <div className="space-y-4 text-sm">

          <Info label="Username" value={user.username} />

          <Info label="Email" value={user.email} />

          <Info label="Role" value={user.role} />

          <Info label="Credits" value={user.credits} />

          <Info label="Mongo ID" value={user._id} />

          <Info
            label="Created"
            value={new Date(user.createdAt).toLocaleString()}
          />

          <Info
            label="Updated"
            value={new Date(user.updatedAt).toLocaleString()}
          />

          <Info
            label="Last Login"
            value={
              user.lastLogin
                ? new Date(user.lastLogin).toLocaleString()
                : "Never"
            }
          />

        </div>

        <hr className="my-8 border-white/10" />

        <h3 className="text-white font-semibold mb-5">
          Quick Credits
        </h3>

        <div className="grid grid-cols-3 gap-3">

          <button
            onClick={() => updateCredits("add", 100)}
            className="btn-primary"
          >
            +100
          </button>

          <button
            onClick={() => updateCredits("add", 500)}
            className="btn-primary"
          >
            +500
          </button>

          <button
            onClick={() => updateCredits("add", 1000)}
            className="btn-primary"
          >
            +1000
          </button>

        </div>

        <div className="mt-8">

          <h3 className="text-white font-semibold mb-4">
            Custom Credits
          </h3>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Credits"
            className="w-full rounded-xl bg-surface border border-white/10 p-3 text-white mb-4"
          />

          <div className="flex gap-3">

            <button
              onClick={() => updateCredits("add")}
              className="btn-primary flex-1"
            >
              ADD
            </button>

            <button
              onClick={() => updateCredits("remove")}
              className="bg-red-500 text-white rounded-xl px-6"
            >
              REMOVE
            </button>

          </div>

        </div>

        <hr className="my-8 border-white/10" />

        <button
          onClick={deleteUser}
          className="w-full bg-red-600 hover:bg-red-700 rounded-xl p-4 font-semibold flex justify-center items-center gap-2"
        >
          <Trash2 size={18} />
          DELETE USER
        </button>

      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="flex justify-between border-b border-white/5 py-2">

      <span className="text-gray-400">
        {label}
      </span>

      <span className="text-white font-medium break-all text-right">
        {String(value)}
      </span>

    </div>
  );
}

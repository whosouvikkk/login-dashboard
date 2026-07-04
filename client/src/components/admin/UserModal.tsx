import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

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

  const updateCredits = async (
    action: "add" | "remove",
    quickAmount?: number
  ) => {
    try {
      const credits = quickAmount ?? Number(amount);

      if (!credits || credits <= 0) {
        toast.error("Enter a valid credit amount");
        return;
      }

      await api.put(`/admin/user/${user._id}/credits`, {
        amount: credits,
        action,
      });

      toast.success(
        action === "add"
          ? "Credits added successfully."
          : "Credits removed successfully."
      );

      refreshUsers();
      onClose();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          "Unable to update credits."
      );
    }
  };

  const deleteUser = async () => {
    if (
      !window.confirm(
        `Delete "${user.username}" permanently?\n\nThis action cannot be undone.`
      )
    )
      return;

    try {
      await api.delete(`/admin/user/${user._id}`);

      toast.success("User deleted successfully.");

      refreshUsers();

      onClose();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          "Unable to delete user."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">

      <div className="glass-panel w-full max-w-2xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-3xl font-bold text-white mb-8">
          User Management
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <Info title="Username" value={user.username} />

          <Info title="Email" value={user.email} />

          <Info title="Role" value={user.role} />

          <Info title="Credits" value={user.credits} />

          <Info title="Mongo ID" value={user._id} />

          <Info
            title="Created"
            value={new Date(user.createdAt).toLocaleString()}
          />

          <Info
            title="Updated"
            value={new Date(user.updatedAt).toLocaleString()}
          />

          <Info
            title="Last Login"
            value={
              user.lastLogin
                ? new Date(user.lastLogin).toLocaleString()
                : "Never"
            }
          />

        </div>

        <div className="mt-8">

          <h3 className="text-white font-semibold mb-4">
            Quick Credits
          </h3>

          <div className="grid grid-cols-3 gap-3">

            <button
              className="btn-primary"
              onClick={() => updateCredits("add", 100)}
            >
              +100
            </button>

            <button
              className="btn-primary"
              onClick={() => updateCredits("add", 500)}
            >
              +500
            </button>

            <button
              className="btn-primary"
              onClick={() => updateCredits("add", 1000)}
            >
              +1000
            </button>

          </div>

        </div>

        <div className="mt-8">

          <h3 className="text-white font-semibold mb-4">
            Custom Credits
          </h3>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-field"
            placeholder="Enter credits..."
          />

          <div className="grid grid-cols-2 gap-4 mt-4">

            <button
              className="btn-primary"
              onClick={() => updateCredits("add")}
            >
              ADD
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 rounded-xl text-white font-semibold"
              onClick={() => updateCredits("remove")}
            >
              REMOVE
            </button>

          </div>

        </div>

        <div className="border-t border-white/10 mt-8 pt-8">

          <button
            onClick={deleteUser}
            className="w-full bg-red-700 hover:bg-red-800 rounded-xl py-4 flex items-center justify-center gap-2 text-white font-semibold"
          >
            <Trash2 size={18} />
            DELETE USER
          </button>

        </div>

      </div>

    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="glass-panel p-4">

      <div className="text-xs text-gray-400 mb-1">
        {title}
      </div>

      <div className="text-white break-all font-medium">
        {String(value)}
      </div>

    </div>
  );
}

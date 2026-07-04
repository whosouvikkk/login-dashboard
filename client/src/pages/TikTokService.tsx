import { useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  ArrowLeft,
  PlayCircle,
  Zap,
  Coins,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TikTokService() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const [amount, setAmount] = useState("");

  const creditsRequired = useMemo(() => {
    const qty = Number(amount);

    if (!qty || qty <= 0) return 0;

    return Math.ceil(qty / 1000);
  }, [amount]);

  const quickOrders = [
    {
      title: "1K TikTok Views",
      amount: 1000,
      credits: 1,
    },
    {
      title: "5K TikTok Views",
      amount: 5000,
      credits: 5,
    },
  ];

  const submitQuickOrder = async (
    quantity: number,
    credits: number
  ) => {
    alert(
      `Backend API will be connected here.\n\nQuantity : ${quantity}\nCredits : ${credits}`
    );
  };

  const submitCustomOrder = async () => {
    alert(
      `Backend API\n\nLink : ${link}\nQuantity : ${amount}\nCredits : ${creditsRequired}`
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-slide-up">

      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="glass-panel p-8">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-black text-white">
              TikTok Views Service
            </h1>

            <p className="text-gray-500 mt-3">
              Purchase TikTok views instantly using your
              credits.
            </p>

          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">

            <div className="flex items-center gap-3">

              <Coins className="text-primary" />

              <div>

                <p className="text-sm text-gray-400">
                  Your Credits
                </p>

                <h2 className="text-3xl font-bold text-white">
                  {user?.credits ?? 0}
                </h2>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {quickOrders.map((order) => (
          <div
            key={order.amount}
            className="glass-panel p-7 border border-white/10 hover:border-primary/40 transition-all"
          >
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">

              <PlayCircle
                className="text-primary"
                size={30}
              />

            </div>

            <h2 className="text-2xl font-bold text-white">

              {order.title}

            </h2>

            <p className="text-gray-500 mt-2">

              Cost : {order.credits} Credit

            </p>

            <button
              onClick={() =>
                submitQuickOrder(
                  order.amount,
                  order.credits
                )
              }
              className="btn-primary w-full mt-8"
            >
              Launch
            </button>

          </div>
        ))}

        <div className="glass-panel p-7 border border-white/10 hover:border-primary/40 transition-all">

          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">

            <Zap
              className="text-primary"
              size={30}
            />

          </div>

          <h2 className="text-2xl font-bold text-white">
            Custom Views
          </h2>

          <p className="text-gray-500 mt-2">

            1000 Views = 1 Credit

          </p>

          <button
            onClick={() => setOpen(true)}
            className="btn-primary w-full mt-8"
          >
            Launch
          </button>
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">

          <div className="glass-panel w-full max-w-xl p-8 relative animate-slide-up">

            <h2 className="text-3xl font-bold text-white mb-8">
              Custom TikTok Views
            </h2>

            <div className="space-y-5">

              <div>

                <label className="text-sm text-gray-400 mb-2 block">
                  TikTok Link
                </label>

                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="input-field"
                  placeholder="https://www.tiktok.com/..."
                />

              </div>

              <div>

                <label className="text-sm text-gray-400 mb-2 block">
                  Amount
                </label>

                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  className="input-field"
                  placeholder="1000"
                />

              </div>

              <div className="glass-panel p-5">

                <div className="flex justify-between">

                  <span className="text-gray-400">

                    Credits Required

                  </span>

                  <span className="text-primary text-xl font-bold">

                    {creditsRequired}

                  </span>

                </div>

                <div className="mt-3 text-xs text-gray-500">

                  Every 1000 views costs 1 credit.

                </div>

              </div>

              <div className="glass-panel p-5">

                <div className="flex justify-between">

                  <span className="text-gray-400">
                    Your Credits
                  </span>

                  <span className="text-white font-bold">

                    {user?.credits ?? 0}

                  </span>

                </div>

                <div className="mt-3">

                  {(user?.credits ?? 0) >= creditsRequired ? (
                    <span className="text-green-400 text-sm">
                      Enough credits available.
                    </span>
                  ) : (
                    <span className="text-red-400 text-sm">
                      Insufficient credits.
                    </span>
                  )}

                </div>

              </div>

              <button
                disabled={
                  !link ||
                  !amount ||
                  creditsRequired <= 0 ||
                  (user?.credits ?? 0) < creditsRequired
                }
                onClick={submitCustomOrder}
                className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit Order
              </button>

              <button
                onClick={() => setOpen(false)}
                className="w-full border border-white/10 rounded-xl py-3 text-gray-300 hover:bg-white/5 transition"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

      <div className="glass-panel p-8">

        <div className="flex items-center gap-3 mb-5">

          <ExternalLink className="text-primary" />

          <h3 className="text-xl font-semibold text-white">
            Pricing
          </h3>

        </div>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="border border-white/10 rounded-2xl p-5">

            <h4 className="text-white font-semibold">
              1,000 Views
            </h4>

            <p className="text-gray-500 mt-2">
              1 Credit
            </p>

          </div>

          <div className="border border-white/10 rounded-2xl p-5">

            <h4 className="text-white font-semibold">
              5,000 Views
            </h4>

            <p className="text-gray-500 mt-2">
              5 Credits
            </p>

          </div>

          <div className="border border-white/10 rounded-2xl p-5">

            <h4 className="text-white font-semibold">
              Custom
            </h4>

            <p className="text-gray-500 mt-2">
              1000 Views = 1 Credit
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
        </div>

      </div>

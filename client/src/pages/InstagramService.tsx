import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  PlayCircle,
  Coins,
  Zap,
  Loader2,
  CheckCircle2,
  Link2,
  Hash,
} from "lucide-react";

export default function InstagramService() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [popup, setPopup] = useState(false);

  const [selectedPackage, setSelectedPackage] =
    useState<{
      title: string;
      quantity: number;
      credits: number;
    } | null>(null);

  const [link, setLink] = useState("");
  const [amount, setAmount] = useState("");

  const credits = useMemo(() => {
    const qty = Number(amount);

    if (!qty || qty <= 0) return 0;

    return Math.ceil(qty / 2500);

  }, [amount]);

  const submit = async (
    qty: number,
    custom = false
  ) => {

    try {

      if (custom) {

        if (!link.trim()) {
          toast.error("Enter Instagram Link");
          return;
        }

        if (!amount) {
          toast.error("Enter amount");
          return;
        }

        qty = Number(amount);

      }

      const requiredCredits =
        Math.ceil(qty / 2500);

      if (
        (user?.credits ?? 0) <
        requiredCredits
      ) {
        toast.error("Insufficient Credits");
        return;
      }

      setLoading(true);

      await api.post(
        "/instagram/views",
        {
          link,
          quantity: qty,
        }
      );

      setSuccess(true);

      toast.success(
        "Order placed successfully."
      );

      setTimeout(() => {

        navigate("/dashboard");

      }, 2000);

    } catch (err: any) {

      toast.error(

        err?.response?.data?.message ||

          "Unable to place order."

      );

    } finally {

      setLoading(false);

    }

  };

  if (success) {

    return (

      <div className="min-h-[80vh] flex items-center justify-center">

        <div className="glass-panel p-10 text-center max-w-lg">

          <CheckCircle2
            size={90}
            className="mx-auto text-green-500"
          />

          <h2 className="text-4xl font-black text-white mt-6">
            Order Submitted
          </h2>

          <p className="text-gray-400 mt-3">
            Redirecting to dashboard...
          </p>

        </div>

      </div>

    );

  }
    return (
    <div className="space-y-8 max-w-7xl mx-auto animate-slide-up">

      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition"
      >
        <ArrowLeft size={18} />
        Dashboard
      </button>

      <div className="glass-panel p-8 flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-black text-white">
            Instagram Views
          </h1>

          <p className="text-gray-500 mt-2">
            Purchase Instagram views using Moon Credits.
          </p>

        </div>

        <div className="glass-panel px-6 py-5">

          <div className="flex items-center gap-3">

            <Coins className="text-primary" />

            <div>

              <p className="text-xs text-gray-400">
                Available Credits
              </p>

              <h3 className="text-3xl font-bold text-white">
                {user?.credits ?? 0}
              </h3>

            </div>

          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <ServiceCard
          title="2,500 Views"
          credits={1}
          quantity={2500}
          onClick={() => {
            setSelectedPackage({
              title: "2,500 Views",
              quantity: 2500,
              credits: 1,
            });
            setPopup(true);
          }}
        />

        <ServiceCard
          title="5K Views"
          credits={2}
          quantity={5000}
          onClick={() => {
            setSelectedPackage({
              title: "5K Views",
              quantity: 5000,
              credits: 2,
            });
            setPopup(true);
          }}
        />

        <div className="glass-panel p-7">

          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">

            <Zap className="text-primary" />

          </div>

          <h2 className="text-2xl font-bold text-white mt-6">
            Custom Amount
          </h2>

          <p className="text-gray-500 mt-2">
            2500 Views = 1 Credit
          </p>

          <button
            onClick={() => {
              setSelectedPackage(null);
              setPopup(true);
            }}
            className="btn-primary w-full mt-8"
          >
            Launch
          </button>

        </div>

      </div>

      {popup && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">

          <div className="glass-panel w-full max-w-xl p-8 animate-slide-up">

            <h2 className="text-3xl font-bold text-white mb-8">

              {selectedPackage
                ? selectedPackage.title
                : "Custom Instagram Views"}

            </h2>

            <div className="space-y-5">

              <div>

                <label className="text-sm text-gray-400 block mb-2">
                  Instagram Link
                </label>

                <div className="relative">

                  <Link2
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                  />

                  <input
                    value={link}
                    onChange={(e) =>
                      setLink(e.target.value)
                    }
                    placeholder="https://www.instagram.com/..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                  />

                </div>

              </div>

              <div>

                <label className="text-sm text-gray-400 block mb-2">
                  Amount
                </label>

                <div className="relative">

                  <Hash
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                  />

                  <input
                    type="number"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                    placeholder="2500"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                  />

                </div>

              </div>
                            <div className="glass-panel p-5">

                <div className="flex justify-between">

                  <span className="text-gray-400">
                    Credits Required
                  </span>

                  <span className="text-primary font-bold text-2xl">
                    {selectedPackage
                      ? selectedPackage.credits
                      : credits}
                  </span>

                </div>

                <div className="mt-3 text-sm">

                  {(user?.credits ?? 0) >=
                  (selectedPackage
                    ? selectedPackage.credits
                    : credits) ? (

                    <span className="text-green-400">
                      You have enough credits.
                    </span>

                  ) : (

                    <span className="text-red-400">
                      Not enough credits.
                    </span>

                  )}

                </div>

              </div>

              <button
                disabled={
                  loading ||
                  !link ||
                  (!selectedPackage && !amount) ||
                  (selectedPackage
                    ? selectedPackage.credits
                    : credits) <= 0 ||
                  (user?.credits ?? 0) <
                    (selectedPackage
                      ? selectedPackage.credits
                      : credits)
                }
                onClick={() =>
                  selectedPackage
                    ? submit(
                        selectedPackage.quantity,
                        false
                      )
                    : submit(
                        Number(amount),
                        true
                      )
                }
                className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >

                {loading ? (

                  <>
                    <Loader2
                      className="animate-spin"
                      size={18}
                    />

                    Processing...

                  </>

                ) : (

                  "Submit Order"

                )}

              </button>

              <button
                onClick={() =>
                  setPopup(false)
                }
                className="w-full border border-white/10 rounded-xl py-3 hover:bg-white/5 text-gray-300 transition"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

      <div className="glass-panel p-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          Pricing
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <PricingCard
            title="2,500 Views"
            credits="1 Credit"
          />

          <PricingCard
            title="5K Views"
            credits="2 Credits"
          />

          <PricingCard
            title="Custom Amount"
            credits="2500 Views = 1 Credit"
          />

        </div>

      </div>

    </div>

  );
}

function ServiceCard({
  title,
  quantity,
  credits,
  onClick,
}: {
  title: string;
  quantity: number;
  credits: number;
  onClick: () => void;
}) {
  return (
    <div className="glass-panel p-7 border border-white/10 hover:border-primary/40 transition-all hover:-translate-y-1">

      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">

        <PlayCircle
          className="text-primary"
          size={30}
        />

      </div>

      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      <div className="mt-5 space-y-2">

        <div className="flex justify-between text-sm">

          <span className="text-gray-400">
            Quantity
          </span>

          <span className="text-white">
            {quantity.toLocaleString()} Views
          </span>

        </div>

        <div className="flex justify-between text-sm">

          <span className="text-gray-400">
            Cost
          </span>

          <span className="text-primary font-semibold">
            {credits} Credit{credits > 1 ? "s" : ""}
          </span>

        </div>

      </div>

      <button
        onClick={onClick}
        className="btn-primary w-full mt-8"
      >
        Launch
      </button>

    </div>
  );
}

function PricingCard({
  title,
  credits,
}: {
  title: string;
  credits: string;
}) {
  return (
    <div className="glass-panel p-6 border border-white/10">

      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>

      <p className="text-gray-400 mt-3">
        {credits}
      </p>

    </div>
  );
}

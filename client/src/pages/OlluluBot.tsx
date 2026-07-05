import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Search,
  Phone,
  CreditCard,
  Car,
  Wallet,
  Bomb,
  Coins,
  Loader2,
  Copy,
  CheckCircle2,
} from "lucide-react";

type LookupType =
  | "number"
  | "aadhar"
  | "vehicle"
  | "upi"
  | "bomber";

const LOOKUPS = [
  {
    value: "number",
    label: "Number",
    icon: Phone,
    placeholder: "Enter Mobile Number",
  },
  {
    value: "aadhar",
    label: "Aadhar",
    icon: CreditCard,
    placeholder: "Enter Aadhaar Number",
  },
  {
    value: "vehicle",
    label: "Vehicle",
    icon: Car,
    placeholder: "Enter Vehicle Number",
  },
  {
    value: "upi",
    label: "UPI",
    icon: Wallet,
    placeholder: "Enter UPI ID",
  },
  {
    value: "bomber",
    label: "Bomber",
    icon: Bomb,
    placeholder: "Enter Mobile Number",
  },
];

export default function OlluluBot() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [type, setType] =
    useState<LookupType>("number");

  const [query, setQuery] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  const [remainingCredits, setRemainingCredits] =
    useState(user?.credits ?? 0);

  const selected =
    LOOKUPS.find(
      (x) => x.value === type
    )!;

  const Icon = selected.icon;
    const search = async () => {
    if (!query.trim()) {
      toast.error("Please enter a query.");
      return;
    }

    if (remainingCredits < 1) {
      toast.error("Insufficient credits.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const res = await api.post("/osint/search", {
        type,
        query,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      setRemainingCredits(res.data.credits);

      setResult(res.data.data);

      toast.success("Lookup completed.");

    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
        "Lookup failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const copy = (value: any) => {
    navigator.clipboard.writeText(String(value));
    toast.success("Copied");
  };

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
            Osint Bot Lookup
          </h1>

          <p className="text-gray-400 mt-2">
            Premium Lookup Service
          </p>

        </div>

        <div className="glass-panel px-6 py-5">

          <div className="flex items-center gap-3">

            <Coins
              className="text-primary"
            />

            <div>

              <p className="text-xs text-gray-400">
                Credits
              </p>

              <h3 className="text-3xl font-bold text-white">
                {remainingCredits}
              </h3>

            </div>

          </div>

        </div>

      </div>

      <div className="glass-panel p-8">

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="text-sm text-gray-400 mb-2 block">
              Lookup Type
            </label>

            <select
              value={type}
              onChange={(e) =>
                setType(
                  e.target.value as LookupType
                )
              }
              className="w-full rounded-2xl bg-white/[0.05] border border-white/10 px-5 py-4 text-white"
            >

              {LOOKUPS.map((item) => (

                <option
                  key={item.value}
                  value={item.value}
                  className="bg-[#0f1118]"
                >
                  {item.label}
                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="text-sm text-gray-400 mb-2 block">
              Query
            </label>

            <div className="relative">

              <Icon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
              />

              <input
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder={
                  selected.placeholder
                }
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/[0.05] border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
              />

            </div>

          </div>

        </div>

        <div className="mt-8 flex justify-between items-center">

          <div>

            <p className="text-gray-400">
              Lookup Cost
            </p>

            <h2 className="text-2xl font-bold text-primary">
              FREE
            </h2>

          </div>

          <button
            onClick={search}
            disabled={loading}
            className="btn-primary px-10 flex items-center gap-3"
          >

            {loading ? (

              <>
                <Loader2
                  className="animate-spin"
                  size={18}
                />

                Searching...

              </>

            ) : (

              <>
                <Search size={18}/>
                Search
              </>

            )}

          </button>

        </div>

      </div>
            {result && (
        <div className="glass-panel p-8 animate-slide-up">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-white">
                Lookup Result
              </h2>

              <p className="text-gray-400 mt-2">
                Every field returned by the API is displayed below.
              </p>

            </div>

            <button
              onClick={() =>
                copy(
                  JSON.stringify(
                    result,
                    null,
                    2
                  )
                )
              }
              className="btn-primary flex items-center gap-2"
            >
              <Copy size={18} />
              Copy All
            </button>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {Object.entries(result).map(
              ([key, value]) => (

                <div
                  key={key}
                  className="glass-panel p-5 border border-white/10 hover:border-primary/30 transition"
                >

                  <div className="flex justify-between items-center">

                    <h3 className="text-sm uppercase tracking-wider text-gray-400">

                      {key
                        .replace(/_/g, " ")
                        .replace(
                          /\b\w/g,
                          (l) => l.toUpperCase()
                        )}

                    </h3>

                    <button
                      onClick={() =>
                        copy(
                          typeof value === "object"
                            ? JSON.stringify(
                                value,
                                null,
                                2
                              )
                            : value
                        )
                      }
                      className="text-primary hover:scale-110 transition"
                    >
                      <Copy size={17} />
                    </button>

                  </div>

                  <div className="mt-4">

                    {Array.isArray(value) ? (

                      <div className="space-y-2">

                        {value.map(
                          (item, index) => (

                            <div
                              key={index}
                              className="rounded-xl bg-white/5 px-4 py-3 text-white break-all"
                            >
                              {typeof item ===
                              "object"
                                ? JSON.stringify(
                                    item,
                                    null,
                                    2
                                  )
                                : String(item)}
                            </div>

                          )
                        )}

                      </div>

                    ) : typeof value === "object" && value !== null ? (

  type === "number" ? (

    <div className="space-y-3">

      {Object.entries(value).map(([field, fieldValue]) => (

        <div
          key={field}
          className="rounded-xl bg-white/5 border border-white/10 p-4"
        >

          <p className="text-xs uppercase tracking-wider text-primary mb-2">
            {field.replace(/_/g, " ")}
          </p>

          <p className="text-white break-all leading-7">
            {fieldValue === null || fieldValue === ""
              ? "N/A"
              : String(fieldValue)}
          </p>

        </div>

      ))}

    </div>

  ) : (

    <pre className="bg-white/5 rounded-xl p-4 overflow-auto text-sm text-white whitespace-pre-wrap break-all">
      {JSON.stringify(value, null, 2)}
    </pre>

  )

) : (

  <p className="text-white text-lg font-medium break-all">
    {String(value)}
  </p>

)}

                  </div>

                </div>

              )
            )}

          </div>

          <div className="mt-8 glass-panel p-6 border border-green-500/20">

            <div className="flex items-center gap-4">

              <CheckCircle2
                size={40}
                className="text-green-500"
              />

              <div>

                <h3 className="text-white text-xl font-bold">
                  Lookup Completed
                </h3>

                <p className="text-gray-400">
                  Remaining Credits:
                  <span className="text-primary font-bold ml-2">
                    {remainingCredits}
                  </span>
                </p>

              </div>

            </div>

          </div>

        </div>
      )}
          </div>
  );
}

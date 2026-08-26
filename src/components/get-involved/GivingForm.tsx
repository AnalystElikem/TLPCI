"use client";

import { useState } from "react";
import { ShieldCheck, Smartphone, CreditCard } from "lucide-react";

const funds = ["Tithe", "Offering", "Missions", "Building"];
const presets = [20, 50, 100, 200, 500];

export default function GivingForm() {
  const [fund, setFund] = useState(funds[0]);
  const [method, setMethod] = useState<"momo" | "card">("momo");
  const [amount, setAmount] = useState<string>("");

  return (
    <form
      className="bg-white p-6 shadow-sm md:p-10"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-xl font-bold uppercase text-foreground">
        Give online
      </h2>

      {/* Method — segmented */}
      <div className="mt-7">
        <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
          Payment method
        </p>
        <div className="mt-2 grid grid-cols-2 border border-border">
          <button
            type="button"
            onClick={() => setMethod("momo")}
            className={`flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-wide transition-colors ${
              method === "momo"
                ? "bg-foreground text-white"
                : "bg-white text-text-muted hover:text-foreground"
            }`}
          >
            <Smartphone className="h-4 w-4" />
            Mobile Money
          </button>
          <button
            type="button"
            onClick={() => setMethod("card")}
            className={`flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-wide transition-colors ${
              method === "card"
                ? "bg-foreground text-white"
                : "bg-white text-text-muted hover:text-foreground"
            }`}
          >
            <CreditCard className="h-4 w-4" />
            Bank Card
          </button>
        </div>
      </div>

      {/* Fund — select */}
      <div className="mt-6">
        <label
          htmlFor="fund"
          className="text-xs font-bold uppercase tracking-wide text-text-muted"
        >
          Fund
        </label>
        <select
          id="fund"
          value={fund}
          onChange={(e) => setFund(e.target.value)}
          className="field mt-2 w-full"
        >
          {funds.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div className="mt-6">
        <label
          htmlFor="amount"
          className="text-xs font-bold uppercase tracking-wide text-text-muted"
        >
          Amount
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {presets.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAmount(String(value))}
              className={`border px-4 py-2 text-sm font-semibold transition-colors ${
                amount === String(value)
                  ? "border-primary bg-primary-subtle text-primary"
                  : "border-border text-text-muted hover:border-foreground hover:text-foreground"
              }`}
            >
₵{value.toLocaleString()}
            </button>
          ))}
        </div>
        <div className="mt-3 flex border border-border">
          <span className="flex items-center border-r border-border bg-muted-surface px-4 text-sm font-bold text-text-muted">
            ₵
          </span>
          <input
            id="amount"
            type="number"
            min="0"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 outline-none"
          />
        </div>
      </div>

      {/* MoMo number */}
      {method === "momo" && (
        <div className="mt-6">
          <label
            htmlFor="momo-number"
            className="text-xs font-bold uppercase tracking-wide text-text-muted"
          >
            Mobile money number
          </label>
          <input
            id="momo-number"
            type="tel"
            placeholder="e.g. 024 000 0000"
            className="field mt-2 w-full"
          />
        </div>
      )}

      <button type="submit" className="btn btn-primary mt-8 w-full">
        Give Now
      </button>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-text-muted">
        <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
        Secure payment — demo form, connect a provider before launch.
      </p>
    </form>
  );
}

"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { subscribeNewsletter } from "@/lib/api/settings";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");
    try {
      await subscribeNewsletter(email);
      setStatus("success");
      setMessage("You're in. Welcome to Bacha Stylo.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto flex max-w-md items-center justify-center gap-3 border border-brand-red/40 bg-brand-red/10 px-6 py-5 text-sm font-semibold text-white">
        <Check className="h-5 w-5 text-brand-red" strokeWidth={2.5} />
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full flex-1 border border-white/20 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand-red"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex shrink-0 items-center justify-center gap-2 bg-brand-red px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-500 hover:bg-white hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Joining…" : "Subscribe Now"}
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:rotate-45"
            strokeWidth={2.5}
          />
        </button>
      </div>
      {status === "error" && (
        <p className="mt-3 text-xs text-brand-red-soft">{message}</p>
      )}
    </form>
  );
}

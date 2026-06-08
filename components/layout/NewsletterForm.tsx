"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Mail } from "lucide-react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="w-full lg:w-[420px]">
        <p className="inline-flex items-center gap-2 border-2 border-brand-red/60 bg-brand-red/10 px-4 py-3.5 text-sm text-white">
          <Check className="h-4 w-4 text-brand-red" strokeWidth={2.5} />
          Shukria. You are on the list.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="w-full lg:w-[420px]"
    >
      <div className="flex border-2 border-white/20 focus-within:border-brand-red transition-colors">
        <div className="pl-3 sm:pl-4 flex items-center">
          <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white/50" strokeWidth={2} />
        </div>
        <input
          type="email"
          required
          placeholder="your@email.com"
          className="flex-1 min-w-0 bg-transparent px-3 sm:px-4 py-3 sm:py-4 text-white placeholder:text-white/40 outline-none text-sm"
        />
        <button
          type="submit"
          className="bg-brand-red hover:bg-white hover:text-brand-black text-white px-4 sm:px-6 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] transition-all whitespace-nowrap"
        >
          Subscribe <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
        </button>
      </div>
      <p className="mt-3 text-[11px] text-white/40">
        We respect your inbox. Unsubscribe anytime.
      </p>
    </form>
  );
}

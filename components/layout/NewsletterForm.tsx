"use client";
import { useState } from "react";
import { Check } from "lucide-react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="inline-flex items-center gap-2 text-sm text-cream/80 bg-white/5 border border-white/15 rounded-md px-3 py-3">
        <Check className="h-4 w-4 text-brand-red" />
        Shukria. You are on the list.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        required
        placeholder="your@email.com"
        className="flex-1 h-11 rounded-md bg-white/5 border border-white/15 px-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand-red"
      />
      <button className="btn-primary h-11 px-4" type="submit">Join</button>
    </form>
  );
}

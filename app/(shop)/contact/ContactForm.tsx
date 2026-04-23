"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="text-center py-8">
        <div className="h-16 w-16 mx-auto mb-6 border-2 border-brand-red text-brand-red flex items-center justify-center">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-brand-red font-bold mb-3">
          Message Sent
        </p>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-black mb-3 tracking-tight">
          Thanks for reaching out!
        </h3>
        <p className="text-ink-70 leading-relaxed max-w-sm mx-auto">
          We&apos;ll get back to you within one working day. For urgent queries, WhatsApp is the
          quickest route.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full Name" id="cf-name" name="name" placeholder="Ahmed Ali" required />
        <Field
          label="Email"
          id="cf-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <Field
        label="Subject"
        id="cf-subject"
        name="subject"
        placeholder="Order #1234 — size question"
        required
      />

      <div>
        <label
          htmlFor="cf-message"
          className="block text-[10px] uppercase tracking-[0.28em] text-brand-red font-bold mb-2"
        >
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          placeholder="Tell us how we can help…"
          className="w-full border-2 border-ink-10 focus:border-brand-red bg-white px-4 py-3 text-sm text-brand-black placeholder:text-ink-30 outline-none transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group relative inline-flex items-center justify-center gap-3 bg-brand-red text-white px-8 py-5 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] transition-all duration-500 hover:bg-brand-black disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
        <ArrowUpRight
          className="h-4 w-4 transition-transform group-hover:rotate-45"
          strokeWidth={2.5}
        />
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] uppercase tracking-[0.28em] text-brand-red font-bold mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full border-2 border-ink-10 focus:border-brand-red bg-white px-4 py-3 text-sm text-brand-black placeholder:text-ink-30 outline-none transition-colors"
      />
    </div>
  );
}

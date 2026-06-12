"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset + focus the field when the overlay opens.
  useEffect(() => {
    if (!open) return;
    setQ("");
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  // Close on Escape, and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    onClose();
    router.push(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-brand-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
    >
      <div
        className="mt-24 w-full max-w-2xl px-4 sm:mt-32"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={submit} className="relative">
          <Search
            className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-30"
            strokeWidth={2}
          />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for products…"
            aria-label="Search for products"
            className="w-full border border-white/10 bg-white py-5 pl-14 pr-14 text-base text-brand-black shadow-deep outline-none placeholder:text-ink-40"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-ink-40 transition-colors hover:text-brand-black"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </form>
        <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
          Press Enter to search
        </p>
      </div>
    </div>
  );
}

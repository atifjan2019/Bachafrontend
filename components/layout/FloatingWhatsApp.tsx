"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function FloatingWhatsApp({ phone }: { phone?: string | null }) {
  const number = phone?.replace(/[^0-9]/g, "");
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Gently reveal the message bubble once, shortly after load.
  useEffect(() => {
    if (dismissed || !number) return;
    const t = setTimeout(() => setOpen(true), 2500);
    return () => clearTimeout(t);
  }, [dismissed, number]);

  if (!number) return null;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    "Hi! I need help finding the perfect product."
  )}`;

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
      {/* Message bubble */}
      <div
        className={`relative max-w-[250px] rounded-2xl rounded-br-sm border border-ink-10 bg-white px-4 py-3.5 pr-9 shadow-[0_12px_40px_-12px_rgba(20,20,20,0.3)] transition-all duration-300 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setDismissed(true);
          }}
          aria-label="Dismiss message"
          className="absolute right-2.5 top-2.5 text-ink-30 transition-colors hover:text-brand-black"
        >
          <X className="h-4 w-4" />
        </button>
        <p className="text-[13px] leading-relaxed text-ink-70">
          Need help finding the perfect product? Chat with our team on WhatsApp.
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-[#25D366]"
        >
          Chat now →
        </a>
      </div>

      {/* Floating button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => !dismissed && setOpen(true)}
        className="flex h-14 w-14  items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-6px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:bg-[#1faa55]"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

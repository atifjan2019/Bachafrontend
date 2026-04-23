"use client";
import { Truck, CreditCard, Sparkles, Zap } from "lucide-react";

export function AnnouncementBar({ threshold }: { threshold?: string | number }) {
  const formattedThreshold = threshold ? Number(threshold).toLocaleString() : "5,000";
  const items = [
    { icon: Truck, text: `Free shipping on orders over Rs. ${formattedThreshold}` },
    { icon: Zap, text: "Nationwide delivery in 2–5 working days" },
    { icon: CreditCard, text: "Cash on Delivery · JazzCash · Easypaisa" },
    { icon: Sparkles, text: "New drops every Thursday" },
  ];

  const strip = [...items, ...items, ...items];

  return (
    <div className="relative bg-brand-black text-white overflow-hidden border-b border-brand-red/40">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        {strip.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 sm:gap-2.5 px-5 sm:px-8 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] font-medium"
          >
            <item.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-red shrink-0" strokeWidth={2.5} />
            <span className="text-white/90">{item.text}</span>
            <span className="text-brand-red ml-1 sm:ml-2">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

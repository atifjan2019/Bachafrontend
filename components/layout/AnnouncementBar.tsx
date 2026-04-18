"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

export function AnnouncementBar({ threshold }: { threshold?: string | number }) {
  const formattedThreshold = threshold ? Number(threshold).toLocaleString() : "5,000";
  const messages = [
    `Free shipping on orders over Rs. ${formattedThreshold}`,
    "Nationwide delivery in 2 to 5 working days",
    "Cash on Delivery, JazzCash and Easypaisa accepted",
  ];
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % messages.length), 3500);
    return () => clearInterval(t);
  }, [messages.length]);

  return (
    <div className="bg-brand-black text-white text-xs">
      <div className="container-shop relative flex items-center justify-center py-2 h-8 overflow-hidden">
        {messages.map((m, idx) => (
          <span
            key={m}
            className={cn(
              "absolute transition-all duration-500",
              idx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
            )}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

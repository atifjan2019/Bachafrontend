"use client";
import Image from "next/image";
import { useCart } from "@/lib/store/cart";
import { CartSummary } from "@/components/cart/CartSummary";
import { formatPKR } from "@/lib/utils/format";

export function OrderSummaryCard() {
  const lines = useCart((s) => s.lines);

  return (
    <aside className="bg-ivory border border-border rounded-lg p-5 lg:sticky lg:top-24">
      <h3 className="font-display text-lg mb-4">Order Summary</h3>
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {lines.map((l) => (
          <div key={l.id} className="flex gap-3">
            <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden rounded-md border border-border bg-cream">
              <Image src={l.image} alt={l.name} fill className="object-cover" sizes="56px" />
              <span className="absolute top-0 right-0 h-5 min-w-5 px-1 rounded-bl-md bg-brand-black text-white text-[10px] flex items-center justify-center">
                {l.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-brand-black line-clamp-1">{l.name}</p>
              <p className="text-xs text-muted">
                {l.size} &middot; {l.color}
              </p>
            </div>
            <p className="text-sm font-medium">{formatPKR(l.unit_price * l.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="h-px bg-border my-4" />
      <CartSummary includeShipping />
    </aside>
  );
}

"use client";
import { formatPKR } from "@/lib/utils/format";
import { useCart } from "@/lib/store/cart";

export function CartSummary({ includeShipping = false }: { includeShipping?: boolean }) {
  const subtotal = useCart((s) => s.subtotal());
  const shipping = subtotal === 0 ? 0 : subtotal >= 5000 ? 0 : 250;
  const total = includeShipping ? subtotal + shipping : subtotal;

  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted">Subtotal</span>
        <span className="font-medium">{formatPKR(subtotal)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted">Shipping</span>
        <span className="font-medium">
          {includeShipping ? (shipping === 0 ? "Free" : formatPKR(shipping)) : "Calculated at checkout"}
        </span>
      </div>
      <div className="h-px bg-border my-2" />
      <div className="flex items-center justify-between">
        <span className="font-display text-base">Total</span>
        <span className="font-display text-lg">{formatPKR(total)}</span>
      </div>
      {subtotal > 0 && subtotal < 5000 && (
        <p className="text-xs text-muted pt-1">
          Add {formatPKR(5000 - subtotal)} more for free shipping.
        </p>
      )}
    </div>
  );
}

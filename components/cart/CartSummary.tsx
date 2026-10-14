"use client";
import { useEffect, useState } from "react";
import { formatPKR } from "@/lib/utils/format";
import { useCart } from "@/lib/store/cart";
import { getSettings, type Settings } from "@/lib/api/settings";
import { remainingForFreeShipping, shippingFor } from "@/lib/shipping";

export function CartSummary({ includeShipping = false }: { includeShipping?: boolean }) {
  const subtotal = useCart((s) => s.subtotal());
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
  }, []);

  const shipping = shippingFor(subtotal, settings);
  const remaining = remainingForFreeShipping(subtotal, settings);
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
      {remaining !== null && (
        <p className="text-xs text-muted pt-1">
          Add {formatPKR(remaining)} more for free shipping.
        </p>
      )}
    </div>
  );
}

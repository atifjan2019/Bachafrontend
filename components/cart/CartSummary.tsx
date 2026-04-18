"use client";
import { useEffect, useState } from "react";
import { formatPKR } from "@/lib/utils/format";
import { useCart } from "@/lib/store/cart";
import { getSettings } from "@/lib/api/settings";

export function CartSummary({ includeShipping = false }: { includeShipping?: boolean }) {
  const subtotal = useCart((s) => s.subtotal());
  const [fee, setFee] = useState(250);
  const [threshold, setThreshold] = useState(5000);

  useEffect(() => {
    getSettings()
      .then((s) => {
        if (s.shipping_fee) setFee(Number(s.shipping_fee));
        if (s.free_shipping_threshold) setThreshold(Number(s.free_shipping_threshold));
      })
      .catch(() => {});
  }, []);

  const shipping = subtotal === 0 ? 0 : subtotal >= threshold ? 0 : fee;
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
      {subtotal > 0 && subtotal < threshold && (
        <p className="text-xs text-muted pt-1">
          Add {formatPKR(threshold - subtotal)} more for free shipping.
        </p>
      )}
    </div>
  );
}

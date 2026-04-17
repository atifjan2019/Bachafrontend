"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { formatPKR } from "@/lib/utils/format";
import { useCart } from "@/lib/store/cart";
import type { CartLine } from "@/types";

export function CartLineItem({ line, compact = false }: { line: CartLine; compact?: boolean }) {
  const updateQty = useCart((s) => s.updateQty);
  const removeLine = useCart((s) => s.removeLine);

  return (
    <div className="flex gap-3 py-3 border-b border-border last:border-0">
      <Link
        href={`/products/${line.slug}`}
        className="relative h-20 w-16 sm:h-24 sm:w-20 flex-shrink-0 overflow-hidden rounded-md border border-border bg-cream"
      >
        <Image src={line.image} alt={line.name} fill className="object-cover" sizes="80px" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/products/${line.slug}`} className="font-display text-sm text-brand-black line-clamp-1">
          {line.name}
        </Link>
        <p className="text-xs text-muted mt-0.5">
          <span>Size {line.size}</span>
          <span className="mx-1">&middot;</span>
          <span className="inline-flex items-center gap-1">
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 rounded-full border border-border"
              style={{ backgroundColor: line.color_hex }}
            />
            {line.color}
          </span>
        </p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <QuantityStepper
            value={line.quantity}
            onChange={(v) => updateQty(line.id, v)}
            max={line.max_stock}
          />
          <div className="text-right">
            <p className="text-sm font-medium text-brand-black">
              {formatPKR(line.unit_price * line.quantity)}
            </p>
            {!compact && (
              <button
                type="button"
                onClick={() => removeLine(line.id)}
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-brand-red mt-1"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

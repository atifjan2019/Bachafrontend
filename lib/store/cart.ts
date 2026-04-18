"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/types";

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addLine: (line: CartLine) => void;
  addItem: (item: { product_id: number; variant_id?: number; name: string; price: number; image: string; size?: string; color?: string }, qty?: number) => void;
  removeLine: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  itemCount: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addLine: (line) => {
        const existing = get().lines.find(
          (l) => l.product_id === line.product_id && l.variant_id === line.variant_id
        );
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.id === existing.id
                ? { ...l, quantity: Math.min(l.quantity + line.quantity, l.max_stock) }
                : l
            ),
          });
        } else {
          set({ lines: [...get().lines, line] });
        }
      },
      addItem: (item, qty = 1) => {
        const line: CartLine = {
          id: `${item.product_id}-${item.variant_id ?? 0}-${item.size ?? ""}-${item.color ?? ""}`,
          product_id: item.product_id,
          variant_id: item.variant_id ?? 0,
          slug: "",
          name: item.name,
          image: item.image,
          size: item.size ?? "",
          color: item.color ?? "",
          color_hex: "",
          unit_price: item.price,
          quantity: qty,
          max_stock: 999,
        };
        get().addLine(line);
      },
      removeLine: (id) => set({ lines: get().lines.filter((l) => l.id !== id) }),
      updateQty: (id, qty) =>
        set({
          lines: get().lines.map((l) =>
            l.id === id ? { ...l, quantity: Math.max(1, Math.min(qty, l.max_stock)) } : l
          ),
        }),
      clear: () => set({ lines: [] }),
      subtotal: () => get().lines.reduce((s, l) => s + l.unit_price * l.quantity, 0),
      itemCount: () => get().lines.reduce((s, l) => s + l.quantity, 0),
    }),
    { name: "bsf_cart" }
  )
);

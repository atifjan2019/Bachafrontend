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

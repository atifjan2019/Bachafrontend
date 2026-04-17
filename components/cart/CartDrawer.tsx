"use client";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/lib/store/cart";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const closeCart = useCart((s) => s.closeCart);
  const lines = useCart((s) => s.lines);

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && closeCart()}>
      <DialogContent side="right" className="p-0 flex flex-col">
        <div className="p-5 border-b border-border">
          <DialogTitle>Your Cart</DialogTitle>
          <p className="text-xs text-muted">
            {lines.length} {lines.length === 1 ? "item" : "items"}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto px-5">
          {lines.length === 0 ? (
            <EmptyCart onContinue={closeCart} />
          ) : (
            <div className="pt-2">
              {lines.map((l) => (
                <CartLineItem key={l.id} line={l} />
              ))}
            </div>
          )}
        </div>
        {lines.length > 0 && (
          <div className="border-t border-border p-5 bg-cream">
            <CartSummary />
            <div className="mt-4 space-y-2">
              <Button asChild className="w-full">
                <Link href="/checkout" onClick={closeCart}>
                  Proceed to Checkout
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/cart" onClick={closeCart}>
                  View Full Cart
                </Link>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

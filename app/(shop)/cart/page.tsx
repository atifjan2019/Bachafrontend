"use client";
import Link from "next/link";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { Button } from "@/components/ui/button";
import { GoldDivider } from "@/components/common/GoldDivider";
import { useCart } from "@/lib/store/cart";

export default function CartPage() {
  const lines = useCart((s) => s.lines);

  return (
    <div className="container-shop py-8 lg:py-12">
      <div className="text-center mb-8">
        <GoldDivider className="mb-4" />
        <h1 className="font-display text-3xl sm:text-4xl">Your Cart</h1>
      </div>

      {lines.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="bg-ivory border border-border rounded-lg p-5">
            {lines.map((l) => (
              <CartLineItem key={l.id} line={l} />
            ))}
          </div>
          <aside className="bg-ivory border border-border rounded-lg p-5 h-fit lg:sticky lg:top-24">
            <h3 className="font-display text-lg mb-4">Summary</h3>
            <CartSummary includeShipping />
            <div className="mt-5 space-y-2">
              <Button asChild className="w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

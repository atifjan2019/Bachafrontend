"use client";
import Link from "next/link";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { useAuth } from "@/lib/store/auth";
import { useState, useEffect } from "react";

export function MobileNav() {
  const openCart = useCart((s) => s.openCart);
  const itemCount = useCart((s) => s.itemCount());
  const user = useAuth((s) => s.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav
      aria-label="Primary"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-ink-10"
    >
      <ul className="grid grid-cols-4">
        <li>
          <Link
            href="/"
            className="flex flex-col items-center gap-1 py-2.5 text-[10px] text-brand-black"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            className="flex flex-col items-center gap-1 py-2.5 text-[10px] text-brand-black"
          >
            <Search className="h-5 w-5" />
            <span>Shop</span>
          </Link>
        </li>
        <li>
          <button
            onClick={openCart}
            className="relative w-full flex flex-col items-center gap-1 py-2.5 text-[10px] text-brand-black"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Cart</span>
            {mounted && itemCount > 0 && (
              <span className="absolute top-1 right-6 h-4 min-w-4 px-1 rounded-full bg-brand-black text-[10px] text-white flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </li>
        <li>
          <Link
            href={mounted && user ? "/account" : "/login"}
            className="flex flex-col items-center gap-1 py-2.5 text-[10px] text-brand-black"
          >
            <User className="h-5 w-5" />
            <span>{mounted && user ? "Account" : "Sign in"}</span>
          </Link>
        </li>
      </ul>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}

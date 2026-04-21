"use client";
import Link from "next/link";
import { BrandMark } from "@/components/common/BrandMark";
import { ShoppingBag, Search, Menu, User } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { useAuth } from "@/lib/store/auth";
import { useState, useEffect } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileMenu } from "./MobileMenu";
import { MegaMenu } from "./MegaMenu";
import type { Category } from "@/types";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop", hasMegaMenu: true },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export function Header({ logoUrl, categories = [] }: { logoUrl?: string; categories?: Category[] }) {
  const openCart = useCart((s) => s.openCart);
  const itemCount = useCart((s) => s.itemCount());
  const user = useAuth((s) => s.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const accountHref = user ? "/account" : "/login";

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-ink-10">
      <div className="container-shop flex items-center justify-between gap-4 h-14 relative">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open menu"
            className="lg:hidden text-brand-black"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <BrandMark size="default" logoUrl={logoUrl} />
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm h-full">
          {NAV.map((n) => (
            <div key={n.href} className="h-full flex items-center group">
              <Link
                href={n.href}
                className="text-ink-70 hover:text-brand-black transition-colors flex items-center h-full"
              >
                {n.label}
              </Link>
              {n.hasMegaMenu && (
                <MegaMenu categories={categories} />
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/products"
            aria-label="Search"
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center text-brand-black hover:text-ink-70"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href={mounted && user ? "/account" : "/login"}
            aria-label={mounted && user ? "Account" : "Sign in"}
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center text-brand-black hover:text-ink-70"
          >
            <User className="h-5 w-5" />
          </Link>
          <button
            aria-label="Open cart"
            onClick={openCart}
            className="relative inline-flex h-10 w-10 items-center justify-center text-brand-black hover:text-ink-70"
          >
            <ShoppingBag className="h-5 w-5" />
            {mounted && itemCount > 0 && (
              <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-brand-black text-[10px] text-white flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} items={NAV} />
      <CartDrawer />
    </header>
  );
}

"use client";
import Link from "next/link";
import { BrandMark } from "@/components/common/BrandMark";
import { ShoppingBag, Search, Menu, User } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { useAuth } from "@/lib/store/auth";
import { useState, useEffect, useRef } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileMenu } from "./MobileMenu";
import { MegaMenu } from "./MegaMenu";
import type { Category } from "@/types";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop", hasMegaMenu: true },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Header({ logoUrl, categories = [] }: { logoUrl?: string; categories?: Category[] }) {
  const openCart = useCart((s) => s.openCart);
  const itemCount = useCart((s) => s.itemCount());
  const user = useAuth((s) => s.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const activeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega menu on click outside
  useEffect(() => {
    if (!shopMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".mega-menu-trigger") && !target.closest(".mega-menu-content")) {
        setShopMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [shopMenuOpen]);

  const handleMouseEnter = () => {
    if (activeTimer.current) clearTimeout(activeTimer.current);
    setShopMenuOpen(true);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setShopMenuOpen(false);
    }, 150);
    activeTimer.current = timer;
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(20,20,20,0.08)]"
          : "bg-white"
      }`}
    >
      {/* Thin red accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-60" />

      <div className="container-shop flex items-center justify-between gap-4 h-16 lg:h-20 relative">
        <div className="flex items-center gap-3 flex-1 lg:flex-initial">
          <button
            aria-label="Open menu"
            className="lg:hidden text-brand-black p-2 -ml-2 hover:text-brand-red transition"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" strokeWidth={2.5} />
          </button>

          <nav className="hidden lg:flex items-center gap-9 text-[13px] font-semibold uppercase tracking-[0.14em]">
            {NAV.map((n) => (
              <div
                key={n.href}
                className="h-full flex items-center relative mega-menu-trigger"
                onMouseEnter={() => n.hasMegaMenu && handleMouseEnter()}
                onMouseLeave={() => n.hasMegaMenu && handleMouseLeave()}
              >
                <Link
                  href={n.href}
                  className={`relative transition-colors py-2 uppercase tracking-[0.14em] ${
                    n.hasMegaMenu && shopMenuOpen
                      ? "text-brand-red"
                      : "text-brand-black hover:text-brand-red"
                  }`}
                >
                  <span className="relative inline-block">
                    {n.label}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-[2px] bg-brand-red transition-all duration-300 ${
                        n.hasMegaMenu && shopMenuOpen ? "w-full" : "w-0"
                      }`}
                    />
                  </span>
                </Link>
                {n.hasMegaMenu && (
                  <MegaMenu
                    categories={categories}
                    isOpen={shopMenuOpen}
                    onClose={() => setShopMenuOpen(false)}
                  />
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Centered logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <BrandMark size="default" logoUrl={logoUrl} />
        </div>

        <div className="flex items-center gap-1 flex-1 lg:flex-initial justify-end">
          <Link
            href="/products"
            aria-label="Search"
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center text-brand-black hover:text-brand-red transition-colors"
          >
            <Search className="h-5 w-5" strokeWidth={2.2} />
          </Link>
          <Link
            href={mounted && user ? "/account" : "/login"}
            aria-label={mounted && user ? "Account" : "Sign in"}
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center text-brand-black hover:text-brand-red transition-colors"
          >
            <User className="h-5 w-5" strokeWidth={2.2} />
          </Link>
          <button
            aria-label="Open cart"
            onClick={openCart}
            className="relative inline-flex h-10 w-10 items-center justify-center text-brand-black hover:text-brand-red transition-colors group"
          >
            <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" strokeWidth={2.2} />
            {mounted && itemCount > 0 && (
              <span className="absolute top-0.5 right-0.5 h-5 min-w-5 px-1 bg-brand-red text-[10px] font-bold text-white flex items-center justify-center rounded-full shadow-red-glow animate-pulse-red">
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

"use client";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BrandMark } from "@/components/common/BrandMark";
import { useAuth } from "@/lib/store/auth";
import { ArrowUpRight } from "lucide-react";

export function MobileMenu({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: { href: string; label: string }[];
}) {
  const user = useAuth((s) => s.user);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent side="right" className="bg-white">
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <div className="flex flex-col gap-6 h-full">
          <div className="flex items-center justify-between pb-4 border-b border-ink-10">
            <BrandMark />
            <span className="text-[10px] uppercase tracking-[0.22em] text-brand-red font-bold">
              Menu
            </span>
          </div>

          <nav className="flex flex-col">
            {items.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={onClose}
                className="group flex items-center justify-between py-4 border-b border-ink-10 text-brand-black font-semibold uppercase tracking-[0.14em] text-[15px] hover:text-brand-red transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="text-[10px] text-brand-red font-bold">
                    0{i + 1}
                  </span>
                  {n.label}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-ink-30 group-hover:text-brand-red group-hover:rotate-45 transition-all"
                  strokeWidth={2.5}
                />
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            {user ? (
              <Link
                href="/account"
                onClick={onClose}
                className="btn-primary w-full text-center"
              >
                My Account
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={onClose}
                  className="btn-primary w-full text-center"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={onClose}
                  className="btn-outline w-full text-center"
                >
                  Create account
                </Link>
              </>
            )}
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-30 mt-3 text-center">
              &copy; {new Date().getFullYear()} · Bacha Stylo
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

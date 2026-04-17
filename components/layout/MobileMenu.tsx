"use client";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BrandMark } from "@/components/common/BrandMark";
import { useAuth } from "@/lib/store/auth";

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
        <div className="flex flex-col gap-8 h-full">
          <BrandMark />
          <nav className="flex flex-col">
            {items.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={onClose}
                className="py-4 border-b border-ink-10 text-brand-black text-lg font-medium hover:text-ink-70"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            {user ? (
              <Link
                href="/account"
                onClick={onClose}
                className="btn-outline w-full text-center"
              >
                Account
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
            <p className="text-xs text-ink-50 mt-2">
              &copy; {new Date().getFullYear()} Bacha Stylo
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

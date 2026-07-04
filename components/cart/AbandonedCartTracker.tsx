"use client";
import { useEffect, useRef } from "react";
import { useCart } from "@/lib/store/cart";
import { useAuth } from "@/lib/store/auth";
import { captureAbandonedCart } from "@/lib/api/abandonedCart";

/**
 * Captures a logged-in customer's cart if they add items and leave without
 * checking out. It sends a debounced snapshot whenever the cart changes, so a
 * record already exists the moment they walk away. The backend removes it once
 * they complete checkout, leaving only genuinely abandoned carts.
 *
 * Guests (not logged in) are captured on the checkout page once they enter an
 * email — this tracker only handles known/registered users site-wide.
 */
export function AbandonedCartTracker() {
  const user = useAuth((s) => s.user);
  const lines = useCart((s) => s.lines);
  const subtotal = useCart((s) => s.subtotal());
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!user?.email || lines.length === 0) return;

    // Debounce so we capture a settled cart, not every keystroke/click.
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      captureAbandonedCart({
        name: user.name,
        email: user.email,
        phone: user.phone,
        lines,
        total: subtotal,
      });
    }, 6000);

    return () => clearTimeout(timer.current);
  }, [user, lines, subtotal]);

  return null;
}

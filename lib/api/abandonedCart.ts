import { apiClient } from "./client";
import type { CartLine } from "@/types";

export interface AbandonedCartInput {
  name?: string;
  email?: string;
  phone?: string;
  lines: CartLine[];
  total: number;
}

const EMAIL_RE = /.+@.+\..+/;

/**
 * Captures the current cart as an "abandoned cart" for later recovery.
 *
 * Best-effort and silent — it must never disrupt the shopping flow. Requires a
 * valid email and at least one item. The backend upserts one row per email
 * (so repeat calls just refresh it) and deletes it once the customer completes
 * checkout, so only genuinely abandoned carts remain.
 */
export async function captureAbandonedCart(input: AbandonedCartInput): Promise<void> {
  const email = input.email?.trim();
  if (!email || !EMAIL_RE.test(email) || input.lines.length === 0) return;

  const cart_data = input.lines.map((l) => ({
    name: l.name,
    quantity: l.quantity,
    price: l.unit_price,
    size: l.size,
    slug: l.slug,
  }));

  try {
    await apiClient.post("/abandoned-carts", {
      name: input.name?.trim() || undefined,
      email,
      phone: input.phone?.trim() || undefined,
      total: input.total,
      cart_data,
    });
  } catch {
    // Silent — recovery capture must never interrupt the shopping experience.
  }
}

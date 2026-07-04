import type { CartLine } from "@/types";
import { formatPKR } from "./format";
import { resolveWhatsApp } from "@/lib/constants/social";

/** Colour is only meaningful when it isn't the placeholder "Default". */
function meaningfulColor(color?: string): string | null {
  const c = color?.trim();
  if (!c || c.toLowerCase() === "default") return null;
  return c;
}

/**
 * Builds the full, pre-filled WhatsApp order message from the cart and returns
 * a `wa.me` link. The message lists each product with its reference/SKU, chosen
 * options, quantity and line total, followed by the order totals.
 */
export function buildWhatsAppOrderHref(opts: {
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  total: number;
  whatsappNumber?: string | null;
  /** Absolute site origin (e.g. https://bachastylo.com) for per-item links. */
  baseUrl?: string;
}): string {
  const { lines, subtotal, shipping, total, whatsappNumber, baseUrl } = opts;

  const parts: string[] = [];
  parts.push("Hello Bacha Stylo! I'd like to place this order:");
  parts.push("");

  lines.forEach((line, i) => {
    const attrs = [
      line.size?.trim() ? `Size: ${line.size.trim()}` : null,
      meaningfulColor(line.color) ? `Colour: ${meaningfulColor(line.color)}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    parts.push(`${i + 1}. ${line.name}`);
    if (attrs) parts.push(`   ${attrs}`);
    parts.push(
      `   ${line.quantity} × ${formatPKR(line.unit_price)} = ${formatPKR(
        line.unit_price * line.quantity
      )}`
    );
    if (baseUrl && line.slug) {
      parts.push(`   Link: ${baseUrl}/products/${line.slug}`);
    }
  });

  parts.push("");
  parts.push(`Subtotal: ${formatPKR(subtotal)}`);
  parts.push(`Shipping: ${shipping === 0 ? "Free" : formatPKR(shipping)}`);
  parts.push(`Total: ${formatPKR(total)}`);
  parts.push("");
  parts.push("Please confirm availability and delivery. Thank you!");

  const { href } = resolveWhatsApp(whatsappNumber);
  return `${href}?text=${encodeURIComponent(parts.join("\n"))}`;
}

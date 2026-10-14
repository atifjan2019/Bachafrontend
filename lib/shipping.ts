import type { Settings } from "@/lib/api/settings";

/**
 * The one delivery-charge rule for the storefront, mirroring the backend's
 * CheckoutController::shippingFor(): the admin's delivery charge, waived at or
 * above the threshold only while the free-shipping switch is ON. The saved
 * order is always priced by the backend; this keeps the cart, checkout and
 * WhatsApp totals showing the same number.
 */
export const DEFAULT_SHIPPING_FEE = 250;
export const DEFAULT_FREE_SHIPPING_THRESHOLD = 5000;

export type ShippingRule = { fee: number; threshold: number; freeEnabled: boolean };

export function shippingRule(settings: Settings | null | undefined): ShippingRule {
  const fee = Number(settings?.shipping_fee);
  const threshold = Number(settings?.free_shipping_threshold);
  return {
    fee: Number.isFinite(fee) && settings?.shipping_fee !== undefined && settings.shipping_fee !== "" ? fee : DEFAULT_SHIPPING_FEE,
    threshold:
      Number.isFinite(threshold) && settings?.free_shipping_threshold !== undefined && settings.free_shipping_threshold !== ""
        ? threshold
        : DEFAULT_FREE_SHIPPING_THRESHOLD,
    freeEnabled: (settings?.free_shipping_enabled ?? "1") !== "0",
  };
}

export function shippingFor(subtotal: number, settings: Settings | null | undefined): number {
  if (subtotal <= 0) return 0;
  const rule = shippingRule(settings);
  return rule.freeEnabled && subtotal >= rule.threshold ? 0 : rule.fee;
}

/** Rupees still needed to unlock free shipping, or null when it doesn't apply. */
export function remainingForFreeShipping(subtotal: number, settings: Settings | null | undefined): number | null {
  const rule = shippingRule(settings);
  if (!rule.freeEnabled || subtotal <= 0 || subtotal >= rule.threshold) return null;
  return rule.threshold - subtotal;
}

/** The admin's delivery policy as trimmed paragraphs (one per line). */
export function deliveryPolicyParagraphs(settings: Settings | null | undefined): string[] {
  return (settings?.delivery_policy ?? "")
    .split(/\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

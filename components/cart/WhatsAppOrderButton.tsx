"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/store/cart";
import { getSettings } from "@/lib/api/settings";
import { WhatsAppIcon } from "@/components/common/SocialIcons";
import { buildWhatsAppOrderHref } from "@/lib/utils/whatsapp";

/**
 * "Order via WhatsApp" — bundles the whole cart into a pre-filled WhatsApp
 * message (products, references/SKUs, quantities and the order total) so a
 * customer can send a complete order to the store in one tap.
 *
 * Shipping is computed with the same rules as the cart summary (admin-set fee
 * and free-shipping threshold) so the total in the message matches the site.
 */
export function WhatsAppOrderButton({ onClick }: { onClick?: () => void }) {
  const lines = useCart((s) => s.lines);
  const subtotal = useCart((s) => s.subtotal());

  const [waNumber, setWaNumber] = useState<string | undefined>(undefined);
  const [fee, setFee] = useState(250);
  const [threshold, setThreshold] = useState(5000);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
    getSettings()
      .then((s) => {
        if (s.whatsapp_number) setWaNumber(s.whatsapp_number);
        if (s.shipping_fee) setFee(Number(s.shipping_fee));
        if (s.free_shipping_threshold) setThreshold(Number(s.free_shipping_threshold));
      })
      .catch(() => {});
  }, []);

  if (lines.length === 0) return null;

  const shipping = subtotal >= threshold ? 0 : fee;
  const total = subtotal + shipping;
  const href = buildWhatsAppOrderHref({
    lines,
    subtotal,
    shipping,
    total,
    whatsappNumber: waNumber,
    baseUrl: origin,
  });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
    >
      <WhatsAppIcon className="h-5 w-5" />
      Order via WhatsApp
    </a>
  );
}

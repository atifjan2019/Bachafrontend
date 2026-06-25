/**
 * Central source of truth for Bacha Stylo's social media presence.
 *
 * Every social icon / link across the site (header, footer, mobile menu,
 * contact, product, checkout, order confirmation, FAQ, journal …) resolves
 * through here so the accounts stay consistent everywhere. Backend Settings
 * values, when present, take precedence over these defaults — see the
 * `overrides` prop on `<SocialLinks>` and `resolveWhatsApp`.
 */

export type SocialKey = "facebook" | "instagram" | "tiktok" | "whatsapp";

export interface SocialAccount {
  key: SocialKey;
  label: string;
  /** Public-facing handle, shown where we display the username. */
  handle: string;
  href: string;
}

/** Raw WhatsApp number as the brand publishes it. */
export const WHATSAPP_NUMBER = "+92 340 9002068";

/** Digits-only form for `wa.me` / `tel:` links. */
export const WHATSAPP_DIGITS = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_DIGITS}`;

export const SOCIAL_ACCOUNTS: Record<SocialKey, SocialAccount> = {
  facebook: {
    key: "facebook",
    label: "Facebook",
    handle: "@BachaStyloFashion",
    href: "https://www.facebook.com/BachaStyloFashion",
  },
  instagram: {
    key: "instagram",
    label: "Instagram",
    handle: "BachaStyloFashion",
    href: "https://www.instagram.com/BachaStyloFashion",
  },
  tiktok: {
    key: "tiktok",
    label: "TikTok",
    handle: "@BachaStylo2",
    href: "https://www.tiktok.com/@BachaStylo2",
  },
  whatsapp: {
    key: "whatsapp",
    label: "WhatsApp",
    handle: WHATSAPP_NUMBER,
    href: WHATSAPP_HREF,
  },
};

/** Default left-to-right display order. */
export const SOCIAL_ORDER: SocialKey[] = ["facebook", "instagram", "tiktok", "whatsapp"];

export const SOCIAL_LIST: SocialAccount[] = SOCIAL_ORDER.map((k) => SOCIAL_ACCOUNTS[k]);

/**
 * Prefer the admin-configured WhatsApp number, falling back to the brand
 * default so the contact channel is never missing.
 */
export function resolveWhatsApp(settingsNumber?: string | null): {
  number: string;
  digits: string;
  href: string;
} {
  const number = settingsNumber?.trim() || WHATSAPP_NUMBER;
  const digits = number.replace(/[^0-9]/g, "");
  return { number, digits, href: `https://wa.me/${digits}` };
}

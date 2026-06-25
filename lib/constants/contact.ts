/**
 * Customer support contact details, used as the canonical fallback wherever
 * the site shows a support email or phone (contact page, legal pages, etc.).
 * Admin Settings (`business_email` / `business_phone`) still override these
 * where a page loads them.
 */
import { WHATSAPP_NUMBER } from "./social";

/** Call & WhatsApp line — same number as the brand's WhatsApp. */
export const SUPPORT_PHONE = WHATSAPP_NUMBER; // +92 340 9002068

export const SUPPORT_EMAIL = "support@bachastylo.com";

/** Business hours shown alongside the support phone on legal/contact pages. */
export const SUPPORT_HOURS = "Mon–Sat, 10 am – 7 pm PKT";

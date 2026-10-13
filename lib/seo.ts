import type { Metadata } from "next";
import type { Settings } from "@/lib/api/settings";

/**
 * The host Vercel serves as primary. The apex 301s here, so every canonical,
 * sitemap entry and robots line must use it or search engines see two origins.
 */
export const PRIMARY_HOST = "www.bachastylo.com";

/**
 * Site origin for absolute URLs. Starts from the admin-set canonical base URL
 * and normalises its host to the primary one, so a bare-apex value in the admin
 * panel cannot split the site across two hosts.
 */
export function siteOrigin(settings: Settings | undefined): string {
  const fallback = `https://${PRIMARY_HOST}`;
  const raw = settings?.canonical_base_url?.trim();
  if (!raw) return fallback;
  try {
    const url = new URL(raw);
    const bare = url.hostname.replace(/^www\./, "");
    if (bare === PRIMARY_HOST.replace(/^www\./, "")) {
      url.hostname = PRIMARY_HOST;
    }
    url.protocol = "https:";
    return url.origin;
  } catch {
    return fallback;
  }
}

/** Parse an admin "index, follow" style value into Next's robots metadata. */
export function robotsFromSetting(value: string | undefined): Metadata["robots"] {
  const v = (value ?? "").toLowerCase();
  if (!v.trim()) return undefined;
  return {
    index: !v.includes("noindex"),
    follow: !v.includes("nofollow"),
  };
}

/** True when the admin has asked for the whole site to stay out of the index. */
export function isNoindex(value: string | undefined): boolean {
  return (value ?? "").toLowerCase().includes("noindex");
}

/** Plain text from an HTML fragment, collapsed and trimmed, for meta descriptions. */
export function stripHtml(html: string | null | undefined, max = 160): string {
  const text = (html ?? "")
    .replace(/<[^>]*>?/gm, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : max).trim()}…`;
}

/** Validate a GA4 measurement ID before it is ever written into a script tag. */
export function validGaId(value: string | undefined): string | null {
  const v = (value ?? "").trim();
  return /^G-[A-Z0-9]+$/.test(v) ? v : null;
}

/** Validate a Meta Pixel ID (numeric) before it is rendered. */
export function validPixelId(value: string | undefined): string | null {
  const v = (value ?? "").trim();
  return /^\d{5,20}$/.test(v) ? v : null;
}

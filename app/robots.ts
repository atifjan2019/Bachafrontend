import type { MetadataRoute } from "next";
import { getSettings, type Settings } from "@/lib/api/settings";
import { siteOrigin, isNoindex } from "@/lib/seo";

export const revalidate = 3600;

// Routes that exist in app/ but carry nothing worth indexing: account,
// auth and transactional pages.
const PRIVATE_PATHS = [
  "/account",
  "/account/",
  "/cart",
  "/checkout",
  "/checkout/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings().catch((): Settings => ({} as Settings));
  const origin = siteOrigin(settings);

  if (isNoindex(settings.robots_meta)) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: `${origin}/sitemap.xml`,
      host: origin,
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: PRIVATE_PATHS }],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}

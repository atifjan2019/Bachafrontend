import type { MetadataRoute } from "next";
import { apiClient } from "@/lib/api/client";
import { getSettings, type Settings } from "@/lib/api/settings";
import { getCategories } from "@/lib/api/categories";
import { siteOrigin } from "@/lib/seo";
import type { Category } from "@/types";

export const revalidate = 3600;

// Public pages under app/(shop). Account, auth and checkout routes are
// deliberately absent; robots.ts disallows them.
const STATIC_PATHS = [
  "/",
  "/products",
  "/about",
  "/blogs",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/refund",
];

type Paged<T> = { data: T[]; current_page: number; last_page: number };
type ProductRow = { slug: string; updated_at?: string; created_at?: string };
type PostRow = { slug: string; updated_at?: string; created_at?: string; status?: boolean };

/** Walk every page of a Laravel paginator, largest page size the API allows. */
async function fetchAll<T>(endpoint: string): Promise<T[]> {
  const out: T[] = [];
  let page = 1;
  let last = 1;
  do {
    const res = await apiClient.get<Paged<T>>(endpoint, { params: { per_page: 100, page } });
    const body = res.data;
    out.push(...(body.data ?? []));
    last = body.last_page ?? 1;
    page = (body.current_page ?? page) + 1;
  } while (page <= last);
  return out;
}

function flattenCategories(list: Category[]): Category[] {
  return list.flatMap((c) => [c, ...flattenCategories(c.children ?? [])]);
}

function when(row: { updated_at?: string; created_at?: string }): Date | undefined {
  const v = row.updated_at ?? row.created_at;
  if (!v) return undefined;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSettings().catch((): Settings => ({} as Settings));
  const origin = siteOrigin(settings);
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((p) => ({
    url: `${origin}${p === "/" ? "" : p}`,
    lastModified: now,
    changeFrequency: p === "/" || p === "/products" ? "daily" : "weekly",
    priority: p === "/" ? 1 : p === "/products" ? 0.9 : 0.5,
  }));

  // Category links resolve to the shop page with the filter applied; that is
  // the only category URL the app serves (see next.config redirects).
  const categories = await getCategories().catch((): Category[] => []);
  for (const c of flattenCategories(categories)) {
    if (!c.slug) continue;
    entries.push({
      url: `${origin}/products?category=${encodeURIComponent(c.slug)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  const products = await fetchAll<ProductRow>("/products").catch((): ProductRow[] => []);
  for (const p of products) {
    if (!p.slug) continue;
    entries.push({
      url: `${origin}/products/${encodeURIComponent(p.slug)}`,
      lastModified: when(p) ?? now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  const posts = await fetchAll<PostRow>("/blog-posts").catch((): PostRow[] => []);
  for (const b of posts) {
    if (!b.slug || b.status === false) continue;
    entries.push({
      url: `${origin}/blogs/${encodeURIComponent(b.slug)}`,
      lastModified: when(b) ?? now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // The catalogue API pages by created_at, which many products share, so a
  // row can straddle two pages and arrive twice. One URL per location.
  const seen = new Set<string>();
  return entries.filter((e) => (seen.has(e.url) ? false : (seen.add(e.url), true)));
}

import { apiClient, USE_MOCKS, delay } from "./client";
import { mockCategories } from "@/lib/mocks/categories";
import type { Category } from "@/types";

/**
 * Adapt a raw category from the Laravel backend
 * into the shape the frontend expects.
 */
function adaptCategory(raw: Record<string, unknown>): Category {
  return {
    id: Number(raw.id) || 0,
    slug: String(raw.slug ?? ""),
    name: String(raw.name ?? ""),
    image: String(raw.image ?? ""),
    product_count: Number(raw.product_count ?? raw.products_count ?? 0),
    children: Array.isArray(raw.children) ? raw.children.map((child: any) => adaptCategory(child)) : undefined,
  };
}

// Short in-memory cache: the layout, homepage and products page all request
// categories. Deduping + a brief TTL turns those repeat round-trips into one.
let categoriesCache: { data: Category[]; at: number } | null = null;
let categoriesInflight: Promise<Category[]> | null = null;
const CATEGORIES_TTL = 0; // Disabled cache to ensure instant updates

export async function getCategories(): Promise<Category[]> {
  if (USE_MOCKS) {
    await delay(60);
    return mockCategories;
  }
  if (categoriesCache && Date.now() - categoriesCache.at < CATEGORIES_TTL) {
    return categoriesCache.data;
  }
  if (categoriesInflight) return categoriesInflight;

  categoriesInflight = apiClient
    .get("/categories")
    .then((res) => {
      const raw: Record<string, unknown>[] = Array.isArray(res.data.data)
        ? res.data.data
        : Array.isArray(res.data)
        ? res.data
        : [];
      const data = raw.map(adaptCategory);
      categoriesCache = { data, at: Date.now() };
      return data;
    })
    .finally(() => {
      categoriesInflight = null;
    });

  return categoriesInflight;
}

export async function getCategory(slug: string): Promise<Category | null> {
  if (USE_MOCKS) {
    await delay(60);
    return mockCategories.find((c) => c.slug === slug) ?? null;
  }
  // Backend doesn't have a single-category endpoint
  // Fetch all and filter client-side
  try {
    const all = await getCategories();
    return all.find((c) => c.slug === slug) ?? null;
  } catch {
    return null;
  }
}

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

export async function getCategories(): Promise<Category[]> {
  if (USE_MOCKS) {
    await delay(60);
    return mockCategories;
  }
  const res = await apiClient.get("/categories");
  const raw: Record<string, unknown>[] = Array.isArray(res.data.data)
    ? res.data.data
    : Array.isArray(res.data)
    ? res.data
    : [];
  return raw.map(adaptCategory);
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

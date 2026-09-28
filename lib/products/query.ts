import { getProducts } from "@/lib/api/products";
import type { Category, Product } from "@/types";

/**
 * Shared product-listing query used by both the server component that renders
 * the first page of /products and the client component that takes over once
 * the visitor touches a filter. Keeping one implementation is what lets the
 * client recognise that the server already fetched exactly this result and skip
 * a duplicate round-trip on mount.
 */

export type Collection = "all" | "featured" | "best_seller" | "new";

export const PER_PAGE = 12;
/** Category selections merge several requests, so they pull a wider page each. */
export const CATEGORY_PER_PAGE = 60;

/** Locate a category anywhere in the (possibly nested) tree by slug. */
export function findCategory(cats: Category[], slug: string): Category | undefined {
  for (const c of cats) {
    if (c.slug === slug) return c;
    const found = c.children ? findCategory(c.children, slug) : undefined;
    if (found) return found;
  }
  return undefined;
}

/** Normalise repeated/comma-joined ?category= values into a unique slug list. */
export function parseCategoryParam(raw: string | string[] | undefined): string[] {
  const parts = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return Array.from(
    new Set(
      parts
        .flatMap((s) => s.split(","))
        .map((s) => s.trim())
        .filter(Boolean)
    )
  );
}

export interface ProductQuery {
  selectedCats: string[];
  search?: string;
  collection: Collection;
  page: number;
}

export interface ProductQueryResult {
  products: Product[];
  total: number;
  lastPage: number;
}

/**
 * Identity of a query's *result*. The client holds the key of the data it
 * currently has; when a filter change produces the same key there is nothing to
 * refetch. Price, size and sort are excluded because they are applied
 * client-side over the loaded set and never hit the network.
 */
export function queryKey(q: ProductQuery): string {
  return JSON.stringify({
    cats: [...q.selectedCats].sort(),
    search: q.search ?? "",
    collection: q.collection,
    page: q.page,
  });
}

export async function fetchProducts({
  selectedCats,
  search,
  collection,
  page,
}: ProductQuery): Promise<ProductQueryResult> {
  const base = {
    search: search || undefined,
    featured: collection === "featured" || undefined,
    best_seller: collection === "best_seller" || undefined,
    is_new: collection === "new" || undefined,
  };

  if (selectedCats.length === 0) {
    const res = await getProducts({ ...base, page, per_page: PER_PAGE });
    return { products: res.data, total: res.meta.total, lastPage: res.meta.last_page };
  }

  // The API expands a category to its own subtree, so a parent slug returns the
  // products filed under its children too. This used to be done here by walking
  // the tree and firing one request per descendant — nine calls to open a single
  // parent category, eight of which the backend can answer in one.
  //
  // Still one request per *explicitly selected* category, because the endpoint
  // filters by a single slug; allSettled (not all) so one slow or failed
  // category doesn't reject the batch and blank the page.
  const all = await Promise.allSettled(
    selectedCats.map((c) =>
      getProducts({ ...base, category: c, page: 1, per_page: CATEGORY_PER_PAGE })
    )
  );

  // A product could match more than one fetched slug — dedupe by id.
  const seen = new Set<number>();
  const merged = all
    .flatMap((r) => (r.status === "fulfilled" ? r.value.data : []))
    .filter((p) => (seen.has(p.id) ? false : seen.add(p.id)));

  return { products: merged, total: merged.length, lastPage: 1 };
}

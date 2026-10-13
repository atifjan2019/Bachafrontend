import type { Metadata } from "next";
import { getCategories } from "@/lib/api/categories";
import { fetchProducts, parseCategoryParam, queryKey } from "@/lib/products/query";
import ProductsClient from "./ProductsClient";
import type { Category } from "@/types";

// The catalog changes from the admin panel, so this page renders per request
// rather than being cached at build time.
export const revalidate = 0;

type SearchParams = Record<string, string | string[] | undefined>;

function findCategory(list: Category[], slug: string): Category | undefined {
  for (const c of list) {
    if (c.slug === slug) return c;
    const hit = c.children ? findCategory(c.children, slug) : undefined;
    if (hit) return hit;
  }
  return undefined;
}

/**
 * A single-category view is a landing page in its own right (it is what the
 * sitemap lists), so it canonicalises to itself and carries the category name.
 * Search results and multi-category filters canonicalise to the bare shop page
 * so they are never indexed as separate URLs.
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const slugs = parseCategoryParam(sp.category);
  const search = typeof sp.search === "string" ? sp.search.trim() : "";

  if (slugs.length !== 1 || search) {
    return { alternates: { canonical: "/products" } };
  }

  const slug = slugs[0] as string;
  const categories = await getCategories().catch((): Category[] => []);
  const category = findCategory(categories, slug);
  const canonical = `/products?category=${encodeURIComponent(slug)}`;

  if (!category) return { alternates: { canonical: "/products" } };

  const title = category.name.trim();
  const description = `Shop ${title} at Bacha Stylo. Nationwide delivery, Cash on Delivery, JazzCash and Easypaisa.`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, type: "website", url: canonical },
  };
}

/**
 * Server half of the shop page: resolves the first result set for this URL so
 * the initial HTML ships real products and a real count instead of an empty
 * grid and "0 pieces". Every category link on the site funnels into
 * /products?category=…, so those URLs are rendered the same way rather than
 * arriving empty and filling in after hydration.
 *
 * Filtering, sorting, search and pagination all stay client-side exactly as
 * before — ProductsClient picks this data up on hydration and takes over.
 */
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const selectedCats = parseCategoryParam(sp.category);
  const search = typeof sp.search === "string" ? sp.search : "";

  // Collection tabs and pagination are client state, so a fresh navigation
  // always starts on the "All" tab at page 1 — exactly the query the client
  // would otherwise have fired on mount.
  const query = { selectedCats, search, collection: "all" as const, page: 1 };

  // A backend hiccup should degrade to the old client-fetch behaviour rather
  // than 500 the whole shop.
  // Independent requests — the product query no longer needs the category tree
  // to expand a parent slug, so these don't have to be sequential.
  const [categories, result] = await Promise.all([
    getCategories().catch(() => []),
    fetchProducts(query).catch(() => ({ products: [], total: 0, lastPage: 1 })),
  ]);

  return (
    <ProductsClient
      initialCategories={categories}
      initialProducts={result.products}
      initialTotal={result.total}
      initialLastPage={result.lastPage}
      initialKey={queryKey(query)}
    />
  );
}

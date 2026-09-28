import { getCategories } from "@/lib/api/categories";
import { fetchProducts, parseCategoryParam, queryKey } from "@/lib/products/query";
import ProductsClient from "./ProductsClient";

// The catalog changes from the admin panel, so this page renders per request
// rather than being cached at build time.
export const revalidate = 0;

type SearchParams = Record<string, string | string[] | undefined>;

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

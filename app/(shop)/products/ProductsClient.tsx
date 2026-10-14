"use client";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  fetchProducts,
  findCategory,
  queryKey,
  parseCollection,
  parsePage,
  parseSort,
  type Collection,
  type Sort,
} from "@/lib/products/query";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryFilter } from "@/components/filters/CategoryFilter";
import { PriceRangeSlider } from "@/components/filters/PriceRangeSlider";
import { SizeFilter } from "@/components/filters/SizeFilter";
import { SortDropdown } from "@/components/filters/SortDropdown";
import { MobileFilterSheet } from "@/components/filters/MobileFilterSheet";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { ProductCardSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHero } from "@/components/common/PageHero";
import type { Category, Product } from "@/types";

const COLLECTIONS: { key: Collection; label: string }[] = [
  { key: "all", label: "All" },
  { key: "featured", label: "Featured" },
  { key: "best_seller", label: "Best Sellers" },
  { key: "new", label: "New Arrivals" },
];

const PRICE_MIN = 0;
const PRICE_MAX = 15000;

export interface ProductsClientProps {
  /** First page of results, already fetched on the server for this URL. */
  initialProducts: Product[];
  initialCategories: Category[];
  initialTotal: number;
  initialLastPage: number;
  /** Identity of the query the server ran, so mount can skip refetching it. */
  initialKey: string;
}

function ProductsPageContent({
  initialProducts,
  initialCategories,
  initialTotal,
  initialLastPage,
  initialKey,
}: ProductsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // The URL is the single source of truth for every filter, the collection
  // tab, the sort and the page number. That is what makes the browser's Back
  // button land on the same page of the same category with the same filters:
  // the product page was entered from /products?category=…&page=2, so Back
  // returns to exactly that URL and the server renders that page again.
  const searchParam = searchParams.get("search") ?? "";
  const categoryKey = searchParams.getAll("category").join(",");
  const sizeKey = searchParams.getAll("size").join(",");
  const page = parsePage(searchParams.get("page"));
  const collection = parseCollection(searchParams.get("tab"));
  const sort = parseSort(searchParams.get("sort"));
  const minParam = Number(searchParams.get("min"));
  const maxParam = Number(searchParams.get("max"));
  const price = useMemo<[number, number]>(
    () => [
      Number.isFinite(minParam) && searchParams.has("min") ? Math.max(PRICE_MIN, minParam) : PRICE_MIN,
      Number.isFinite(maxParam) && searchParams.has("max") ? Math.min(PRICE_MAX, maxParam) : PRICE_MAX,
    ],
    [minParam, maxParam, searchParams]
  );

  const selectedCats = useMemo(
    () => Array.from(new Set(categoryKey.split(",").map((s) => s.trim()).filter(Boolean))),
    [categoryKey]
  );
  const selectedSizes = useMemo(
    () => Array.from(new Set(sizeKey.split(",").map((s) => s.trim()).filter(Boolean))),
    [sizeKey]
  );

  // Seeded from the server render, so the grid paints with the first page of
  // real products instead of a skeleton waiting on a client fetch.
  const [categories] = useState<Category[]>(initialCategories);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(searchParam);
  const [debouncedSearch, setDebouncedSearch] = useState(searchParam);
  const [lastPage, setLastPage] = useState(initialLastPage);
  const [total, setTotal] = useState(initialTotal);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Which query the products in state belong to. Starts as the server's, so the
  // fetch effect below no-ops on mount; every later filter change writes its own
  // key after loading. Also makes the effect idempotent under StrictMode's
  // double-invoke in development.
  const loadedKey = useRef(initialKey);

  /**
   * Rewrite the URL with a set of changes. `null` removes a key; an array
   * writes repeated params. `replace` keeps filter clicks out of the history;
   * page changes `push` so Back steps through pages the visitor actually saw.
   */
  const updateUrl = useCallback(
    (changes: Record<string, string | string[] | null>, mode: "replace" | "push" = "replace") => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(changes)) {
        params.delete(key);
        if (value === null) continue;
        (Array.isArray(value) ? value : [value]).forEach((v) => params.append(key, v));
      }
      const qs = params.toString();
      const href = qs ? `${pathname}?${qs}` : pathname;
      if (mode === "push") router.push(href, { scroll: false });
      else router.replace(href, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  // Changing the category resets the page and any size filter, since the
  // sizes on offer belong to the category being browsed.
  const setSelectedCats = useCallback(
    (next: string[]) => updateUrl({ category: next, size: null, page: null }),
    [updateUrl]
  );
  const setSelectedSizes = useCallback((next: string[]) => updateUrl({ size: next }), [updateUrl]);
  const setPrice = useCallback(
    (next: [number, number]) =>
      updateUrl({
        min: next[0] > PRICE_MIN ? String(next[0]) : null,
        max: next[1] < PRICE_MAX ? String(next[1]) : null,
      }),
    [updateUrl]
  );
  const setSort = useCallback((next: Sort) => updateUrl({ sort: next === "newest" ? null : next }), [updateUrl]);
  const setCollection = useCallback(
    (next: Collection) => updateUrl({ tab: next === "all" ? null : next, page: null }),
    [updateUrl]
  );
  const gridRef = useRef<HTMLDivElement>(null);
  const setPage = useCallback(
    (next: number) => {
      gridRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
      updateUrl({ page: next > 1 ? String(next) : null }, "push");
    },
    [updateUrl]
  );
  const clearAll = useCallback(
    () => updateUrl({ category: null, size: null, min: null, max: null, page: null }),
    [updateUrl]
  );

  // Drive the search box from the ?search= URL param (header search overlay).
  useEffect(() => {
    setSearch(searchParam);
    setDebouncedSearch(searchParam);
  }, [searchParam]);

  // Debounce the search box so we don't fire a request on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  // Typing a new search starts again from page 1.
  useEffect(() => {
    if (debouncedSearch !== searchParam && page !== 1) updateUrl({ page: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Ticking a filter rewrites the URL, which re-runs the server component —
  // so the new result set arrives as props before the fetch effect below gets
  // a chance to request it. Adopt it and mark it loaded, otherwise every filter
  // click costs one server fetch *and* one client fetch for the same rows.
  useEffect(() => {
    const key = queryKey({ selectedCats, search: debouncedSearch, collection, page });
    if (initialKey !== key || loadedKey.current === key) return;
    setProducts(initialProducts);
    setTotal(initialTotal);
    setLastPage(initialLastPage);
    loadedKey.current = key;
    setLoading(false);
  }, [initialKey, initialProducts, initialTotal, initialLastPage, selectedCats, debouncedSearch, collection, page]);

  useEffect(() => {
    // Price, size and sort are applied client-side (the backend ignores them),
    // so they are NOT part of the key — changing them must not trigger a
    // round-trip. Matching key means the products in state are already the
    // answer to this query, which is how the server-rendered first page avoids
    // being refetched the moment it hydrates.
    const key = queryKey({ selectedCats, search: debouncedSearch, collection, page });
    if (loadedKey.current === key) return;

    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const res = await fetchProducts({ selectedCats, search: debouncedSearch, collection, page });
        if (mounted) {
          setProducts(res.products);
          setLastPage(res.lastPage);
          setTotal(res.total);
          loadedKey.current = key;
        }
      } catch (e) {
        console.error("Failed to load products:", e);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [selectedCats, page, debouncedSearch, collection]);

  // The size filter offers only the sizes carried by the products on screen,
  // so a shoe category shows shoe sizes and a cap category shows no size
  // filter at all. "One Size" is the placeholder for products without sizes.
  const sizeOptions = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) for (const v of p.variants) if (v.size && v.size !== "One Size") set.add(v.size);
    return Array.from(set);
  }, [products]);
  const activeSizes = useMemo(() => selectedSizes.filter((s) => sizeOptions.includes(s)), [selectedSizes, sizeOptions]);

  const priceActive = price[0] > PRICE_MIN || price[1] < PRICE_MAX;

  const filters = useMemo(
    () => (
      <div className="space-y-6">
        <div>
          <h4 className="font-display text-base mb-3">Category</h4>
          <CategoryFilter categories={categories} value={selectedCats} onChange={setSelectedCats} />
        </div>
        {sizeOptions.length > 0 && (
          <div>
            <h4 className="font-display text-base mb-3">Size</h4>
            <SizeFilter options={sizeOptions} value={activeSizes} onChange={setSelectedSizes} />
          </div>
        )}
        <div>
          <h4 className="font-display text-base mb-3">Price Range</h4>
          <PriceRangeSlider value={price} onChange={setPrice} />
        </div>
      </div>
    ),
    [categories, selectedCats, setSelectedCats, sizeOptions, activeSizes, setSelectedSizes, price, setPrice]
  );

  // Size, price and sort are all applied client-side over the loaded set (the
  // backend supports none of them), so adjusting them re-filters instantly with
  // no network request.
  const visibleProducts = useMemo(() => {
    let list = products;

    if (activeSizes.length > 0) {
      list = list.filter((p) => p.variants.some((v) => activeSizes.includes(v.size)));
    }

    list = list.filter((p) => {
      const pr = p.sale_price ?? p.price;
      return pr >= price[0] && pr <= price[1];
    });

    if (sort === "price_asc") {
      list = [...list].sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
    } else if (sort === "price_desc") {
      list = [...list].sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
    }

    return list;
  }, [products, activeSizes, price, sort]);

  // Categories don't have their own pages — arriving from a category card just
  // pre-selects the filter here, so a single-category selection takes over the
  // hero to keep that "dedicated collection" feel.
  const activeCategory = selectedCats.length === 1 ? findCategory(categories, selectedCats[0]) : undefined;

  const activeFilterCount = selectedCats.length + activeSizes.length + (priceActive ? 1 : 0);

  const chipClass =
    "inline-flex items-center gap-1 rounded-full border border-ink-10 bg-surface-soft px-3 py-1 text-xs text-brand-black hover:border-ink-30 transition";

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <PageHero
        eyebrow={activeCategory ? "Shop by category" : "Shop"}
        title={activeCategory?.name ?? "All Products"}
        subtitle={
          activeCategory
            ? `${total} ${total === 1 ? "piece" : "pieces"} curated for ${activeCategory.name.toLowerCase()}`
            : `${total} ${total === 1 ? "piece" : "pieces"} stitched with care`
        }
        image={activeCategory?.image || undefined}
        variant="dark"
        align="center"
      />

      {/* Toolbar */}
      <div className="sticky top-14 z-30 bg-white border-b border-ink-10">
        <div className="container-shop py-3 space-y-3">
          {/* Row: search + sort + mobile filter */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden inline-flex items-center gap-2 text-sm text-brand-black hover:text-ink-70 transition shrink-0"
              onClick={() => setMobileOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Filters</span>
              {activeFilterCount > 0 && (
                <span className="h-5 min-w-5 px-1 rounded-full bg-brand-black text-white text-[10px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-30" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                aria-label="Search products"
                className="w-full border border-ink-10 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-brand-black"
              />
            </div>
            <SortDropdown value={sort} onChange={setSort} />
          </div>

          {/* Row: collection tabs */}
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {COLLECTIONS.map((c) => (
              <button
                key={c.key}
                onClick={() => setCollection(c.key)}
                className={`whitespace-nowrap border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors ${
                  collection === c.key
                    ? "border-brand-black bg-brand-black text-white"
                    : "border-ink-10 bg-white text-ink-70 hover:border-brand-black"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center justify-between gap-3">
            {/* Active filter chips (desktop) */}
            <div className="flex flex-wrap items-center gap-2">
              {selectedCats.map((slug) => {
                // Search the whole tree — a child category chip should show its
                // name, not the raw slug.
                const cat = findCategory(categories, slug);
                return (
                  <button key={slug} onClick={() => setSelectedCats(selectedCats.filter((s) => s !== slug))} className={chipClass}>
                    {cat?.name ?? slug}
                    <X className="h-3 w-3" />
                  </button>
                );
              })}
              {activeSizes.map((sz) => (
                <button key={sz} onClick={() => setSelectedSizes(activeSizes.filter((s) => s !== sz))} className={chipClass}>
                  Size {sz}
                  <X className="h-3 w-3" />
                </button>
              ))}
              {priceActive && (
                <button onClick={() => setPrice([PRICE_MIN, PRICE_MAX])} className={chipClass}>
                  Rs. {price[0].toLocaleString()} – Rs. {price[1].toLocaleString()}
                  <X className="h-3 w-3" />
                </button>
              )}
              {activeFilterCount > 0 && (
                <button onClick={clearAll} className="text-xs text-ink-50 hover:text-brand-black underline transition">
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div ref={gridRef} className="container-shop py-8 lg:py-12 scroll-mt-32">
        <div className="flex gap-6 lg:gap-10">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block w-56 xl:w-60 flex-shrink-0">
            <div className="sticky top-32 space-y-0">
              <div className="border-b border-ink-10 pb-6 mb-6">
                <h4 className="text-xs uppercase tracking-[0.18em] text-ink-50 font-medium mb-4">Category</h4>
                <CategoryFilter categories={categories} value={selectedCats} onChange={setSelectedCats} />
              </div>
              {sizeOptions.length > 0 && (
                <div className="border-b border-ink-10 pb-6 mb-6">
                  <h4 className="text-xs uppercase tracking-[0.18em] text-ink-50 font-medium mb-4">Size</h4>
                  <SizeFilter options={sizeOptions} value={activeSizes} onChange={setSelectedSizes} />
                </div>
              )}
              <div>
                <h4 className="text-xs uppercase tracking-[0.18em] text-ink-50 font-medium mb-4">Price range</h4>
                <PriceRangeSlider value={price} onChange={setPrice} />
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : visibleProducts.length === 0 ? (
              <EmptyState
                title="Nothing matches yet"
                description="Try clearing a filter or two. New pieces are added regularly."
                ctaLabel="Clear filters"
                ctaHref="/products"
              />
            ) : (
              <>
                <ProductGrid products={visibleProducts} />
                {lastPage > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-3">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage(Math.max(1, page - 1))}
                      aria-label="Previous page"
                      className="h-10 w-10 rounded-full border border-ink-10 flex items-center justify-center text-brand-black hover:bg-surface-soft disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-ink-50">
                      Page {page} of {lastPage}
                    </span>
                    <button
                      disabled={page >= lastPage}
                      onClick={() => setPage(Math.min(lastPage, page + 1))}
                      aria-label="Next page"
                      className="h-10 w-10 rounded-full border border-ink-10 flex items-center justify-center text-brand-black hover:bg-surface-soft disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <MobileFilterSheet open={mobileOpen} onClose={() => setMobileOpen(false)} onClear={clearAll}>
        {filters}
      </MobileFilterSheet>
    </div>
  );
}

export default function ProductsClient(props: ProductsClientProps) {
  // useSearchParams requires a Suspense boundary in the app router.
  return (
    <Suspense fallback={null}>
      <ProductsPageContent {...props} />
    </Suspense>
  );
}

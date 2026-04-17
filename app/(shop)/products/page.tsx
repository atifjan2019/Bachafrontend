"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryFilter } from "@/components/filters/CategoryFilter";
import { PriceRangeSlider } from "@/components/filters/PriceRangeSlider";
import { SortDropdown } from "@/components/filters/SortDropdown";
import { MobileFilterSheet } from "@/components/filters/MobileFilterSheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCardSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHero } from "@/components/common/PageHero";
import type { Category, Product } from "@/types";

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 15000]);
  const [sort, setSort] = useState<"newest" | "price_asc" | "price_desc">("newest");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    async function run() {
      if (selectedCats.length === 0) {
        const res = await getProducts({
          min_price: price[0],
          max_price: price[1],
          sort,
          page,
          per_page: 12,
        });
        setProducts(res.data);
        setLastPage(res.meta.last_page);
        setTotal(res.meta.total);
      } else {
        const all = await Promise.all(
          selectedCats.map((c) =>
            getProducts({
              category: c,
              min_price: price[0],
              max_price: price[1],
              sort,
              page: 1,
              per_page: 60,
            })
          )
        );
        const merged = all.flatMap((r) => r.data);
        setProducts(merged);
        setLastPage(1);
        setTotal(merged.length);
      }
      setLoading(false);
    }
    run();
  }, [selectedCats, price, sort, page]);

  const filters = useMemo(
    () => (
      <div className="space-y-6">
        <div>
          <h4 className="font-display text-base mb-3">Category</h4>
          <CategoryFilter categories={categories} value={selectedCats} onChange={setSelectedCats} />
        </div>
        <div>
          <h4 className="font-display text-base mb-3">Price Range</h4>
          <PriceRangeSlider value={price} onChange={setPrice} />
        </div>
      </div>
    ),
    [categories, selectedCats, price]
  );

  const activeFilterCount =
    selectedCats.length + (price[0] > 0 || price[1] < 15000 ? 1 : 0);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <PageHero
        eyebrow="Shop"
        title="All Products"
        subtitle={`${total} ${total === 1 ? "piece" : "pieces"} stitched with care`}
        variant="dark"
        align="center"
      />

      {/* Toolbar */}
      <div className="sticky top-14 z-30 bg-white border-b border-ink-10">
        <div className="container-shop flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden inline-flex items-center gap-2 text-sm text-brand-black hover:text-ink-70 transition"
              onClick={() => setMobileOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="h-5 min-w-5 px-1 rounded-full bg-brand-black text-white text-[10px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {/* Active filter chips (desktop) */}
            <div className="hidden lg:flex items-center gap-2">
              {selectedCats.map((slug) => {
                const cat = categories.find((c) => c.slug === slug);
                return (
                  <button
                    key={slug}
                    onClick={() => setSelectedCats((v) => v.filter((s) => s !== slug))}
                    className="inline-flex items-center gap-1 rounded-full border border-ink-10 bg-surface-soft px-3 py-1 text-xs text-brand-black hover:border-ink-30 transition"
                  >
                    {cat?.name ?? slug}
                    <X className="h-3 w-3" />
                  </button>
                );
              })}
              {(price[0] > 0 || price[1] < 15000) && (
                <button
                  onClick={() => setPrice([0, 15000])}
                  className="inline-flex items-center gap-1 rounded-full border border-ink-10 bg-surface-soft px-3 py-1 text-xs text-brand-black hover:border-ink-30 transition"
                >
                  Rs. {price[0].toLocaleString()} – Rs. {price[1].toLocaleString()}
                  <X className="h-3 w-3" />
                </button>
              )}
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedCats([]);
                    setPrice([0, 15000]);
                  }}
                  className="text-xs text-ink-50 hover:text-brand-black underline transition"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      {/* Main content */}
      <div className="container-shop py-8 lg:py-12">
        <div className="flex gap-10">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-32 space-y-0">
              <div className="border-b border-ink-10 pb-6 mb-6">
                <h4 className="text-xs uppercase tracking-[0.18em] text-ink-50 font-medium mb-4">Category</h4>
                <CategoryFilter categories={categories} value={selectedCats} onChange={setSelectedCats} />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.18em] text-ink-50 font-medium mb-4">Price range</h4>
                <PriceRangeSlider value={price} onChange={setPrice} />
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState
                title="Nothing matches yet"
                description="Try clearing a filter or two. New pieces are added regularly."
                ctaLabel="Clear filters"
                ctaHref="/products"
              />
            ) : (
              <>
                <ProductGrid products={products} />
                {lastPage > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-3">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="h-10 w-10 rounded-full border border-ink-10 flex items-center justify-center text-brand-black hover:bg-surface-soft disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-ink-50">
                      Page {page} of {lastPage}
                    </span>
                    <button
                      disabled={page >= lastPage}
                      onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
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

      <MobileFilterSheet
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onClear={() => {
          setSelectedCats([]);
          setPrice([0, 15000]);
        }}
      >
        {filters}
      </MobileFilterSheet>
    </div>
  );
}

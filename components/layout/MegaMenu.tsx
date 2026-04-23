"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import type { Category } from "@/types";

export function MegaMenu({ categories }: { categories: Category[] }) {
  if (!categories || categories.length === 0) return null;

  const featured = categories.find((category) => category.image) ?? categories[0];
  const primaryCategories = categories.slice(0, 6);
  const extraCategories = categories.slice(6);

  return (
    <div className="fixed inset-x-0 top-[calc(var(--header-h,5rem)+2px)] z-50 flex justify-center px-4 pt-0 opacity-0 invisible translate-y-1 pointer-events-none transition-all duration-200 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
      <div className="w-full max-w-[1120px] overflow-hidden border border-ink-10 bg-white shadow-deep">
        {/* Top accent bar */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_300px]">
          {/* Left: categories */}
          <div className="p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-between border-b border-ink-10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-[2px] w-6 bg-brand-red" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-red">
                    Bacha Stylo Edits
                  </p>
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold text-brand-black tracking-tightest">
                  Shop by Category
                </h3>
              </div>
              <Link
                href="/products"
                className="group/all inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-black hover:text-brand-red transition-colors shrink-0"
              >
                View All
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/all:rotate-45" strokeWidth={2.5} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {primaryCategories.map((parent) => (
                <div
                  key={parent.id}
                  className="group/cat border border-transparent p-3 transition-colors hover:border-ink-10 hover:bg-ink-5"
                >
                  <Link
                    href={`/products?category=${parent.slug}`}
                    className="flex items-start justify-between gap-2"
                  >
                    <span className="min-w-0">
                      <span className="block text-[15px] font-bold text-brand-black transition-colors group-hover/cat:text-brand-red truncate">
                        {parent.name}
                      </span>
                      {parent.product_count > 0 && (
                        <span className="mt-0.5 block text-[11px] uppercase tracking-wider text-ink-50">
                          {parent.product_count} pieces
                        </span>
                      )}
                    </span>
                    <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-30 transition-all group-hover/cat:translate-x-0.5 group-hover/cat:text-brand-red" strokeWidth={2.5} />
                  </Link>

                  {parent.children && parent.children.length > 0 && (
                    <ul className="mt-2.5 space-y-1.5 border-l border-brand-red/30 pl-3">
                      {parent.children.slice(0, 4).map((child) => (
                        <li key={child.id}>
                          <Link
                            href={`/products?category=${child.slug}`}
                            className="block text-[13px] text-ink-70 transition-colors hover:text-brand-red truncate"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {extraCategories.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2 border-t border-ink-10 pt-4">
                {extraCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    className="border border-ink-10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-70 transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right: featured */}
          <Link
            href={`/products?category=${featured.slug}`}
            className="group/feat relative hidden md:flex flex-col justify-between overflow-hidden bg-brand-black p-6 text-white min-h-[340px]"
          >
            {featured.image ? (
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                sizes="300px"
                className="absolute inset-0 h-full w-full object-cover opacity-40 transition-all duration-700 group-hover/feat:opacity-60 group-hover/feat:scale-105"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-brand-black/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,29,37,0.35)_0%,transparent_55%)]" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="inline-flex items-center gap-1.5 bg-brand-red px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                Featured
              </span>
            </div>

            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-red mb-2">
                Curated for the season
              </p>
              <h3 className="font-display text-3xl font-bold leading-[1.02] tracking-tightest">
                {featured.name}
              </h3>
              <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white group-hover/feat:text-brand-red transition-colors">
                Explore Now
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/feat:rotate-45" strokeWidth={2.5} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Category } from "@/types";

export function MegaMenu({ categories }: { categories: Category[] }) {
  if (!categories || categories.length === 0) return null;

  const featured = categories.find((category) => category.image) ?? categories[0];
  const primaryCategories = categories.slice(0, 6);
  const extraCategories = categories.slice(6);

  return (
    <div className="absolute left-1/2 top-full z-50 w-[min(1180px,calc(100vw-2rem))] -translate-x-1/2 pt-3 opacity-0 invisible translate-y-2 pointer-events-none transition-all duration-200 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
      <div className="overflow-hidden rounded-lg border border-ink-10 bg-white shadow-[0_28px_80px_-36px_rgba(20,20,20,0.55)]">
        <div className="grid min-h-[330px] grid-cols-[1fr_320px]">
          <div className="p-6">
            <div className="mb-5 flex items-center justify-between border-b border-ink-10 pb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-red">
                  Bacha Stylo edits
                </p>
                <h3 className="mt-1 text-xl font-semibold text-brand-black">
                  Shop by category
                </h3>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-black hover:text-brand-red"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {primaryCategories.map((parent) => (
                <div
                  key={parent.id}
                  className="rounded-md border border-transparent p-3 transition hover:border-ink-10 hover:bg-surface-soft"
                >
                  <Link
                    href={`/products?category=${parent.slug}`}
                    className="group/category flex items-start justify-between gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>
                      <span className="block text-base font-semibold text-brand-black transition group-hover/category:text-brand-red">
                        {parent.name}
                      </span>
                      {parent.product_count > 0 && (
                        <span className="mt-1 block text-xs text-ink-50">
                          {parent.product_count} pieces
                        </span>
                      )}
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-ink-30 transition group-hover/category:translate-x-0.5 group-hover/category:text-brand-red" />
                  </Link>

                  {parent.children && parent.children.length > 0 && (
                    <ul className="mt-3 space-y-2 border-l border-ink-10 pl-3">
                      {parent.children.slice(0, 5).map((child) => (
                        <li key={child.id}>
                          <Link
                            href={`/products?category=${child.slug}`}
                            className="block text-sm text-ink-70 transition hover:translate-x-0.5 hover:text-brand-black"
                            onClick={(e) => e.stopPropagation()}
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
                    className="rounded-full border border-ink-10 px-3 py-1.5 text-xs font-medium text-ink-70 transition hover:border-brand-black hover:text-brand-black"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href={`/products?category=${featured.slug}`}
            className="relative isolate flex min-h-full flex-col justify-end overflow-hidden bg-brand-black p-6 text-white"
          >
            {featured.image ? (
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                sizes="320px"
                className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
              />
            ) : null}
            <span className="absolute inset-0 -z-10 bg-brand-black/45" />
            <span className="mb-auto inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-black">
              <Sparkles className="h-3.5 w-3.5 text-brand-red" />
              Featured edit
            </span>
            <div>
              <p className="text-sm text-white/80">Curated for the season</p>
              <h3 className="mt-2 text-2xl font-semibold leading-tight">
                {featured.name}
              </h3>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                Explore now
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

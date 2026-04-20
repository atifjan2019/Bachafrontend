"use client";
import Link from "next/link";
import type { Category } from "@/types";

export function MegaMenu({ categories }: { categories: Category[] }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-ink-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0 z-50">
      <div className="container-shop py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {categories.map((parent) => (
            <div key={parent.id} className="flex flex-col">
              <Link 
                href={`/products?category=${parent.slug}`}
                className="font-playfair font-bold text-brand-black text-lg mb-4 hover:text-brand-red transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {parent.name}
              </Link>
              {parent.children && parent.children.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {parent.children.map((child) => (
                    <li key={child.id}>
                      <Link
                        href={`/products?category=${child.slug}`}
                        className="text-sm text-ink-70 hover:text-brand-black transition-colors"
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
      </div>
    </div>
  );
}

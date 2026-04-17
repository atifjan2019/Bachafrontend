"use client";
import type { Category } from "@/types";

export function CategoryFilter({
  categories,
  value,
  onChange,
}: {
  categories: Category[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  function toggle(slug: string) {
    if (value.includes(slug)) onChange(value.filter((s) => s !== slug));
    else onChange([...value, slug]);
  }
  return (
    <div className="space-y-2">
      {categories.map((c) => (
        <label
          key={c.slug}
          className="flex items-center gap-3 text-sm text-brand-black cursor-pointer"
        >
          <input
            type="checkbox"
            className="h-4 w-4 accent-brand-red"
            checked={value.includes(c.slug)}
            onChange={() => toggle(c.slug)}
          />
          <span className="flex-1">{c.name}</span>
          <span className="text-xs text-muted">{c.product_count}</span>
        </label>
      ))}
    </div>
  );
}

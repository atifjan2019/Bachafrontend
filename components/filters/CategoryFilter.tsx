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

  function Row({ c, child = false }: { c: Category; child?: boolean }) {
    return (
      <label
        className={`flex cursor-pointer items-center gap-3 ${
          child ? "text-[13px] text-ink-70" : "text-sm text-brand-black"
        }`}
      >
        <input
          type="checkbox"
          className="h-4 w-4 accent-brand-red"
          checked={value.includes(c.slug)}
          onChange={() => toggle(c.slug)}
        />
        <span className="flex-1">{c.name}</span>
        {c.product_count > 0 && <span className="text-xs text-muted">{c.product_count}</span>}
      </label>
    );
  }

  return (
    <div className="space-y-2">
      {categories.map((c) => (
        <div key={c.slug} className="space-y-2">
          <Row c={c} />
          {c.children && c.children.length > 0 && (
            <div className="ml-[26px] space-y-2 border-l border-ink-10 pl-3">
              {c.children.map((child) => (
                <Row key={child.slug} c={child} child />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

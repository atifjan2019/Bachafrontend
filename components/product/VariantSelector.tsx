"use client";
import { cn } from "@/lib/utils/cn";
import type { Variant } from "@/types";

export function SizeSelector({
  sizes,
  value,
  onChange,
}: {
  sizes: string[];
  value: string | null;
  onChange: (s: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((s) => {
        const active = s === value;
        return (
          <button
            type="button"
            key={s}
            onClick={() => onChange(s)}
            className={cn(
              "min-w-12 h-10 px-3 rounded-md text-sm border transition",
              active
                ? "border-brand-black bg-brand-black text-white"
                : "border-border bg-ivory text-brand-black hover:border-brand-black"
            )}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}

export function ColorSelector({
  colors,
  value,
  onChange,
}: {
  colors: { color: string; color_hex: string }[];
  value: string | null;
  onChange: (c: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {colors.map((c) => {
        const active = c.color === value;
        return (
          <button
            key={c.color}
            type="button"
            aria-label={c.color}
            title={c.color}
            onClick={() => onChange(c.color)}
            className={cn(
              "relative h-9 w-9 rounded-full border transition",
              active ? "border-brand-black ring-2 ring-offset-2 ring-brand-black/70" : "border-border"
            )}
            style={{ backgroundColor: c.color_hex }}
          />
        );
      })}
      {value && <span className="text-xs text-muted">{value}</span>}
    </div>
  );
}

export function uniqueSizes(variants: Variant[]) {
  return Array.from(new Set(variants.map((v) => v.size)));
}

export function uniqueColors(variants: Variant[]) {
  const seen = new Set<string>();
  const out: { color: string; color_hex: string }[] = [];
  for (const v of variants) {
    if (!seen.has(v.color)) {
      seen.add(v.color);
      out.push({ color: v.color, color_hex: v.color_hex });
    }
  }
  return out;
}

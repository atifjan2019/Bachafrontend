"use client";
import { cn } from "@/lib/utils/cn";
import { SIZE_BANDS } from "@/lib/constants/sizes";

/**
 * Shop filter for figure sizes, grouped by fit band (Kids / Teens / Gen Z /
 * Plus). Selected sizes are stored as strings to match product variant sizes.
 */
export function SizeFilter({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  function toggle(size: string) {
    if (value.includes(size)) onChange(value.filter((s) => s !== size));
    else onChange([...value, size]);
  }

  return (
    <div className="space-y-4">
      {SIZE_BANDS.map((band) => (
        <div key={band.key}>
          <p className="mb-2 text-[11px] uppercase tracking-wider text-ink-50">{band.label}</p>
          <div className="flex flex-wrap gap-1.5">
            {band.sizes.map((size) => {
              const sv = String(size);
              const active = value.includes(sv);
              return (
                <button
                  key={size}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(sv)}
                  className={cn(
                    "h-8 min-w-9 rounded-md border px-2 text-[13px] transition",
                    active
                      ? "border-brand-black bg-brand-black text-white"
                      : "border-ink-10 bg-white text-brand-black hover:border-brand-black"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

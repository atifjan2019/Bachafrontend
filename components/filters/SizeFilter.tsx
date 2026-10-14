"use client";
import { cn } from "@/lib/utils/cn";
import { SIZE_BANDS, bandForSize } from "@/lib/constants/sizes";

const LETTER_ORDER = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "2XL", "3XL", "4XL", "FREE SIZE", "ONE SIZE"];

/** Numeric sizes ascending, then letter sizes in garment order, then anything else. */
export function sortSizes(sizes: string[]): string[] {
  return [...sizes].sort((a, b) => {
    const na = Number(a);
    const nb = Number(b);
    const aNum = Number.isFinite(na);
    const bNum = Number.isFinite(nb);
    if (aNum && bNum) return na - nb;
    if (aNum) return -1;
    if (bNum) return 1;
    const ia = LETTER_ORDER.indexOf(a.toUpperCase());
    const ib = LETTER_ORDER.indexOf(b.toUpperCase());
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });
}

/**
 * Shop filter over the sizes that actually exist in the products being
 * browsed, so waistcoat figure sizes never appear on shoes or caps. Figure
 * sizes are grouped by fit band (Kids / Teens / Gen Z / Plus); anything else
 * (shoe sizes, S/M/L) is a flat row.
 */
export function SizeFilter({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  function toggle(size: string) {
    if (value.includes(size)) onChange(value.filter((s) => s !== size));
    else onChange([...value, size]);
  }

  const chip = (size: string) => {
    const active = value.includes(size);
    return (
      <button
        key={size}
        type="button"
        aria-pressed={active}
        onClick={() => toggle(size)}
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
  };

  const sorted = sortSizes(options);
  const allBanded = sorted.length > 0 && sorted.every((s) => bandForSize(s));

  if (!allBanded) {
    return <div className="flex flex-wrap gap-1.5">{sorted.map(chip)}</div>;
  }

  return (
    <div className="space-y-4">
      {SIZE_BANDS.map((band) => {
        const inBand = sorted.filter((s) => bandForSize(s)?.key === band.key);
        if (inBand.length === 0) return null;
        return (
          <div key={band.key}>
            <p className="mb-2 text-[11px] uppercase tracking-wider text-ink-50">{band.label}</p>
            <div className="flex flex-wrap gap-1.5">{inBand.map(chip)}</div>
          </div>
        );
      })}
    </div>
  );
}

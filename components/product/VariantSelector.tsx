"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { groupSizesIntoBands, type BandedSizes } from "@/lib/constants/sizes";
import type { Variant } from "@/types";

const sizeButton = (active: boolean) =>
  cn(
    "min-w-12 h-10 px-3 rounded-md text-sm border transition",
    active
      ? "border-brand-black bg-brand-black text-white"
      : "border-border bg-ivory text-brand-black hover:border-brand-black"
  );

export function SizeSelector({
  sizes,
  value,
  onChange,
}: {
  sizes: string[];
  value: string | null;
  onChange: (s: string) => void;
}) {
  const { banded, other } = groupSizesIntoBands(sizes);
  // Use the two-step fit → size flow only when every size is a figure size and
  // they span more than one fit band. Otherwise fall back to a flat row
  // (handles S/M/L, "One Size", or a product within a single band).
  const useBanded = other.length === 0 && banded.length >= 2;

  if (useBanded) {
    return <BandedSizeSelector banded={banded} value={value} onChange={onChange} />;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((s) => (
        <button type="button" key={s} onClick={() => onChange(s)} className={sizeButton(s === value)}>
          {s}
        </button>
      ))}
    </div>
  );
}

/** Two-step selector: pick a fit band, then the figure size within it. */
function BandedSizeSelector({
  banded,
  value,
  onChange,
}: {
  banded: BandedSizes[];
  value: string | null;
  onChange: (s: string) => void;
}) {
  const bandOfValue = banded.find((g) => g.sizes.includes(value ?? ""))?.band.key;
  const [bandKey, setBandKey] = useState(bandOfValue ?? banded[0].band.key);

  // Keep the fit picker in sync if the selected size is changed elsewhere
  // (e.g. reset when the variant changes).
  useEffect(() => {
    if (bandOfValue && bandOfValue !== bandKey) setBandKey(bandOfValue);
  }, [bandOfValue, bandKey]);

  const current = banded.find((g) => g.band.key === bandKey) ?? banded[0];

  function pickBand(group: BandedSizes) {
    setBandKey(group.band.key);
    // Auto-select the first size in the band so a valid variant stays chosen.
    if (!group.sizes.includes(value ?? "")) onChange(group.sizes[0]);
  }

  return (
    <div className="space-y-3">
      {/* Step 1 — fit band */}
      <div>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Fit</p>
        <div className="flex flex-wrap gap-2">
          {banded.map((group) => {
            const active = group.band.key === bandKey;
            const lo = group.sizes[0];
            const hi = group.sizes[group.sizes.length - 1];
            return (
              <button
                key={group.band.key}
                type="button"
                onClick={() => pickBand(group)}
                className={cn(
                  "h-9 px-3.5 rounded-md text-[13px] border transition",
                  active
                    ? "border-brand-black bg-brand-black text-white"
                    : "border-border bg-ivory text-brand-black hover:border-brand-black"
                )}
              >
                {group.band.shortLabel}
                <span className="ml-1.5 text-[11px] opacity-60">
                  {lo === hi ? lo : `${lo}–${hi}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2 — figure size within the chosen band */}
      <div>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Size</p>
        <div className="flex flex-wrap gap-2">
          {current.sizes.map((s) => (
            <button type="button" key={s} onClick={() => onChange(s)} className={sizeButton(s === value)}>
              {s}
            </button>
          ))}
        </div>
      </div>
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

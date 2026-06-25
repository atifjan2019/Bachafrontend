/**
 * Figure-size system used by clothing (e.g. Waistcoats).
 *
 * Sizes are grouped into fit "bands" by age/build. A product carries the raw
 * numeric sizes (as strings, from the backend `sizes` field); the storefront
 * groups them into these bands for the two-step fit → size selector and the
 * shop's Size filter.
 */

export type SizeBandKey = "kids" | "teens" | "genz" | "plus";

export interface SizeBand {
  key: SizeBandKey;
  /** Full label, e.g. for filter headings. */
  label: string;
  /** Compact label for the fit picker chips. */
  shortLabel: string;
  /** Canonical numeric sizes in this band. */
  sizes: number[];
}

export const SIZE_BANDS: SizeBand[] = [
  { key: "kids", label: "Kids (Gen Alpha)", shortLabel: "Kids", sizes: [14, 16, 18, 20, 22, 24, 26] },
  { key: "teens", label: "Boys / Teens", shortLabel: "Teens", sizes: [28, 30, 32] },
  { key: "genz", label: "Gen Z", shortLabel: "Gen Z", sizes: [34, 36, 38, 40, 42] },
  { key: "plus", label: "Plus Size", shortLabel: "Plus", sizes: [44, 46, 48, 50] },
];

/** Every figure size across all bands, ascending. */
export const ALL_FIGURE_SIZES: number[] = SIZE_BANDS.flatMap((b) => b.sizes);

/** The band a numeric figure size belongs to, or `undefined` (e.g. "S", "One Size"). */
export function bandForSize(size: string | number): SizeBand | undefined {
  const n = typeof size === "number" ? size : Number(String(size).trim());
  if (!Number.isFinite(n)) return undefined;
  return SIZE_BANDS.find((b) => b.sizes.includes(n));
}

export interface BandedSizes {
  band: SizeBand;
  /** Available size strings for this band (as they appear on the product), ascending. */
  sizes: string[];
}

/**
 * Group a product's raw size strings into fit bands. Sizes that don't map to a
 * figure band (e.g. "S", "M", "One Size") are returned separately in `other`,
 * so callers can decide whether the banded UI applies.
 */
export function groupSizesIntoBands(sizes: string[]): {
  banded: BandedSizes[];
  other: string[];
} {
  const buckets = new Map<SizeBandKey, string[]>();
  const other: string[] = [];

  for (const raw of sizes) {
    const band = bandForSize(raw);
    if (!band) {
      other.push(raw);
      continue;
    }
    const list = buckets.get(band.key) ?? [];
    list.push(raw);
    buckets.set(band.key, list);
  }

  const banded: BandedSizes[] = SIZE_BANDS.filter((b) => buckets.has(b.key)).map((band) => ({
    band,
    sizes: (buckets.get(band.key) ?? []).slice().sort((a, b) => Number(a) - Number(b)),
  }));

  return { banded, other };
}

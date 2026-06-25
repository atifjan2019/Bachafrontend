import { groupSizesIntoBands } from "@/lib/constants/sizes";

/**
 * Product-aware size guide. Figure-size products (e.g. waistcoats, sizes
 * 14–50) get a fit-band guide that mirrors the two-step size selector;
 * everything else falls back to the standard S–XXL chest/waist/length chart.
 */
export function SizeGuide({ sizes }: { sizes: string[] }) {
  const { banded, other } = groupSizesIntoBands(sizes);
  const isFigure = sizes.length > 0 && other.length === 0 && banded.length >= 1;

  if (isFigure) {
    return <FigureSizeGuide bands={banded} />;
  }
  return <StandardSizeGuide />;
}

function FigureSizeGuide({
  bands,
}: {
  bands: { band: { key: string; label: string }; sizes: string[] }[];
}) {
  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-muted">
        Waistcoat sizes follow your chest measurement. Measure around the fullest part of your chest
        in inches and pick the matching figure size.
      </p>
      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <table className="w-full text-left text-xs min-w-[340px]">
          <thead className="text-brand-black">
            <tr>
              <th className="py-2 pr-3">Fit</th>
              <th className="py-2 pr-3">Sizes</th>
              <th className="py-2">Fits Chest (in)</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            {bands.map(({ band, sizes }) => {
              const lo = sizes[0];
              const hi = sizes[sizes.length - 1];
              return (
                <tr key={band.key} className="border-t border-border">
                  <td className="py-1.5 pr-3 font-medium text-brand-black">{band.label}</td>
                  <td className="pr-3">{sizes.join(", ")}</td>
                  <td>{lo === hi ? `${lo}"` : `${lo}"–${hi}"`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StandardSizeGuide() {
  const rows = [
    { size: "S", chest: "36–38", waist: "30–32", length: "27" },
    { size: "M", chest: "38–40", waist: "32–34", length: "28" },
    { size: "L", chest: "40–42", waist: "34–36", length: "29" },
    { size: "XL", chest: "42–44", waist: "36–38", length: "30" },
    { size: "XXL", chest: "44–46", waist: "38–40", length: "31" },
  ];

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
      <table className="w-full text-left text-xs min-w-[340px]">
        <thead className="text-brand-black">
          <tr>
            <th className="py-2 pr-3">Size</th>
            <th className="py-2 pr-3">Chest (in)</th>
            <th className="py-2 pr-3">Waist (in)</th>
            <th className="py-2">Length (in)</th>
          </tr>
        </thead>
        <tbody className="text-muted">
          {rows.map((r) => (
            <tr key={r.size} className="border-t border-border">
              <td className="py-1.5 pr-3">{r.size}</td>
              <td className="pr-3">{r.chest}</td>
              <td className="pr-3">{r.waist}</td>
              <td>{r.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

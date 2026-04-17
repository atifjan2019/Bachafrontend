"use client";
import { Slider } from "@/components/ui/slider";
import { formatPKR } from "@/lib/utils/format";

export function PriceRangeSlider({
  value,
  onChange,
  min = 0,
  max = 15000,
  step = 500,
}: {
  value: [number, number];
  onChange: (v: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="space-y-3">
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(v) => onChange([v[0] ?? min, v[1] ?? max] as [number, number])}
      />
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{formatPKR(value[0])}</span>
        <span>{formatPKR(value[1])}</span>
      </div>
    </div>
  );
}

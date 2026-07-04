"use client";
import { useEffect, useState } from "react";
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
  // Track the drag locally for live labels/thumbs, but only commit the change
  // (which triggers filtering) when the handle is released — not on every tick.
  const [local, setLocal] = useState<[number, number]>(value);
  useEffect(() => {
    setLocal(value);
  }, [value[0], value[1]]);

  return (
    <div className="space-y-3">
      <Slider
        min={min}
        max={max}
        step={step}
        value={local}
        onValueChange={(v) => setLocal([v[0] ?? min, v[1] ?? max] as [number, number])}
        onValueCommit={(v) => onChange([v[0] ?? min, v[1] ?? max] as [number, number])}
      />
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{formatPKR(local[0])}</span>
        <span>{formatPKR(local[1])}</span>
      </div>
    </div>
  );
}

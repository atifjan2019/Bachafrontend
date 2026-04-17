"use client";
import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center border border-border rounded-md bg-ivory">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="h-10 w-10 flex items-center justify-center text-brand-black disabled:opacity-40"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-10 text-center text-sm font-medium">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="h-10 w-10 flex items-center justify-center text-brand-black disabled:opacity-40"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

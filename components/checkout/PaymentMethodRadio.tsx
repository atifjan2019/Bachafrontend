"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/cn";
import type { PaymentMethod } from "@/types";

export function PaymentMethodRadio({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (v: PaymentMethod) => void;
}) {
  return (
    <RadioGroup value={value} onValueChange={(v) => onChange(v as PaymentMethod)}>
      <Option value="cod" current={value} title="Cash on Delivery" subtitle="Pay when it reaches your door.">
        <p className="text-xs text-muted mt-2">
          Our rider will collect the exact amount. Please keep change ready.
        </p>
      </Option>
      <Option value="jazzcash" current={value} title="JazzCash" subtitle="Pay via JazzCash mobile account.">
        <div className="text-xs text-muted mt-2 space-y-1">
          <p>Send payment to JazzCash number <span className="font-medium text-brand-black">0300-1234567</span> (Bacha Stylo).</p>
          <p>Share the TrxID on WhatsApp at the same number to confirm.</p>
        </div>
      </Option>
      <Option value="easypaisa" current={value} title="Easypaisa" subtitle="Pay via Easypaisa mobile account.">
        <div className="text-xs text-muted mt-2 space-y-1">
          <p>Send payment to Easypaisa number <span className="font-medium text-brand-black">0345-1234567</span> (Bacha Stylo).</p>
          <p>Share the TrxID on WhatsApp at the same number to confirm.</p>
        </div>
      </Option>
    </RadioGroup>
  );
}

function Option({
  value,
  current,
  title,
  subtitle,
  children,
}: {
  value: PaymentMethod;
  current: PaymentMethod;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  const active = value === current;
  return (
    <label
      htmlFor={`pm-${value}`}
      className={cn(
        "flex gap-3 p-4 rounded-md border bg-ivory cursor-pointer transition",
        active ? "border-brand-red" : "border-border hover:border-brand-black"
      )}
    >
      <RadioGroupItem value={value} id={`pm-${value}`} className="mt-1" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <Label htmlFor={`pm-${value}`} className="cursor-pointer">
            {title}
          </Label>
        </div>
        <p className="text-xs text-muted mt-0.5">{subtitle}</p>
        {active && children}
      </div>
    </label>
  );
}

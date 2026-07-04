"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/cn";
import type { PaymentMethod } from "@/types";
import type { Settings } from "@/lib/api/settings";
import { paymentMethodRows, PaymentDetailsRows } from "./paymentDetails";

export function PaymentMethodRadio({
  value,
  onChange,
  settings,
  methods,
}: {
  value: PaymentMethod;
  onChange: (v: PaymentMethod) => void;
  settings?: Settings;
  /** Which methods to show; defaults to all. Disabled ones are omitted. */
  methods?: PaymentMethod[];
}) {
  const enabled = methods ?? ["cod", "bank_transfer", "easypaisa", "jazzcash"];
  const bankRows = paymentMethodRows("bank_transfer", settings);
  const easypaisaRows = paymentMethodRows("easypaisa", settings);
  const jazzcashRows = paymentMethodRows("jazzcash", settings);

  return (
    <RadioGroup value={value} onValueChange={(v) => onChange(v as PaymentMethod)}>
      {enabled.includes("cod") && (
        <Option value="cod" current={value} title="Cash on Delivery" subtitle="Pay when it reaches your door.">
          <p className="text-xs text-muted">
            Our rider will collect the exact amount at delivery. No payment proof needed — just place your order.
          </p>
        </Option>
      )}
      {enabled.includes("bank_transfer") && (
        <Option value="bank_transfer" current={value} title="Bank Transfer" subtitle="Transfer to our bank account.">
          <PaymentDetails rows={bankRows} />
        </Option>
      )}
      {enabled.includes("easypaisa") && (
        <Option value="easypaisa" current={value} title="EasyPaisa" subtitle="Pay via EasyPaisa mobile account.">
          <PaymentDetails rows={easypaisaRows} />
        </Option>
      )}
      {enabled.includes("jazzcash") && (
        <Option value="jazzcash" current={value} title="JazzCash" subtitle="Pay via JazzCash mobile account.">
          <PaymentDetails rows={jazzcashRows} />
        </Option>
      )}
    </RadioGroup>
  );
}

/** Renders the admin-configured account details for a payment method. */
function PaymentDetails({ rows }: { rows: { label: string; value?: string }[] }) {
  const filled = rows.filter((r) => r.value && r.value.trim());
  return (
    <div className="space-y-2">
      {filled.length > 0 ? (
        <PaymentDetailsRows rows={rows} />
      ) : (
        <p className="text-xs text-muted">Payment details will be shared after you place the order.</p>
      )}
      <p className="text-xs font-medium text-brand-red">
        After paying, upload your payment receipt/screenshot below before placing the order.
      </p>
    </div>
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
        "flex gap-4 p-3 lg:p-5 border transition-all cursor-pointer group",
        active ? "border-brand-red bg-brand-red/[0.02]" : "border-ink-10 bg-white hover:border-ink-30"
      )}
    >
      <div className="pt-0.5">
        <RadioGroupItem value={value} id={`pm-${value}`} />
      </div>
      <div className="flex-1">
        <Label htmlFor={`pm-${value}`} className="cursor-pointer font-bold text-[13px] lg:text-sm uppercase tracking-wider block mb-1">
          {title}
        </Label>
        <p className="text-xs text-ink-50 leading-relaxed">{subtitle}</p>
        {active && <div className="mt-4 pt-4 border-t border-brand-red/10 animate-fade-in">{children}</div>}
      </div>
    </label>
  );
}

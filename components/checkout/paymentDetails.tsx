"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Settings } from "@/lib/api/settings";

export type PaymentRow = { label: string; value?: string; copy?: boolean };

/** Account detail rows for a payment method, sourced from admin settings. */
export function paymentMethodRows(methodKey: string, settings?: Settings): PaymentRow[] {
  switch (methodKey) {
    case "bank_transfer":
      return [
        { label: "Bank", value: settings?.bank_name },
        { label: "Account Title", value: settings?.bank_account_title },
        { label: "Account Number", value: settings?.bank_account_number, copy: true },
        { label: "IBAN", value: settings?.bank_iban, copy: true },
      ];
    case "easypaisa":
      return [
        { label: "Account Name", value: settings?.easypaisa_account_name },
        { label: "EasyPaisa Number", value: settings?.easypaisa_number, copy: true },
      ];
    case "jazzcash":
      return [
        { label: "Account Name", value: settings?.jazzcash_account_name },
        { label: "JazzCash Number", value: settings?.jazzcash_number, copy: true },
      ];
    default:
      return [];
  }
}

export type PaymentMethodKey = "cod" | "bank_transfer" | "easypaisa" | "jazzcash";

/**
 * The payment methods enabled by the admin, in display order. A method is
 * enabled unless its flag is explicitly "0". Falls back to COD if an admin
 * accidentally disables everything, so checkout is never left with no option.
 */
export function availablePaymentMethods(settings?: Settings): PaymentMethodKey[] {
  const all: { key: PaymentMethodKey; on: boolean }[] = [
    { key: "cod", on: settings?.cod_enabled !== "0" },
    { key: "bank_transfer", on: settings?.bank_transfer_enabled !== "0" },
    { key: "easypaisa", on: settings?.easypaisa_enabled !== "0" },
    { key: "jazzcash", on: settings?.jazzcash_enabled !== "0" },
  ];
  const enabled = all.filter((m) => m.on).map((m) => m.key);
  return enabled.length > 0 ? enabled : ["cod"];
}

/**
 * Normalise a stored method label ("EasyPaisa", "Cash on Delivery") or a key
 * ("easypaisa", "cod") to the canonical key used across the checkout.
 */
export function normalizePaymentMethod(
  method?: string
): "cod" | "bank_transfer" | "easypaisa" | "jazzcash" {
  const m = (method ?? "").toLowerCase();
  if (m.includes("bank")) return "bank_transfer";
  if (m.includes("easypaisa") || m.includes("easy paisa")) return "easypaisa";
  if (m.includes("jazz")) return "jazzcash";
  return "cod";
}

/** A value with a one-tap copy-to-clipboard button. */
function CopyableValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent) => {
    // Prevent the surrounding <label> from toggling its radio when copying.
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable (e.g. insecure context) — ignore
    }
  };

  return (
    <span className="inline-flex items-center gap-2">
      <span className="select-all font-semibold text-brand-black">{value}</span>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : `Copy ${value}`}
        title={copied ? "Copied!" : "Copy"}
        className={cn(
          "inline-flex h-6 shrink-0 items-center gap-1 rounded border px-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors",
          copied
            ? "border-emerald-200 bg-emerald-50 text-emerald-600"
            : "border-ink-10 bg-white text-ink-50 hover:border-brand-red hover:text-brand-red"
        )}
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </span>
  );
}

/** Renders the non-empty account detail rows as a compact definition list. */
export function PaymentDetailsRows({ rows }: { rows: PaymentRow[] }) {
  const filled = rows.filter((r) => r.value && r.value.trim());
  if (filled.length === 0) return null;
  return (
    <dl className="rounded-md bg-ink-5 p-3 text-xs">
      {filled.map((r) => (
        <div key={r.label} className="flex items-center justify-between gap-4 py-1">
          <dt className="text-muted">{r.label}</dt>
          <dd className="text-right">
            {r.copy ? (
              <CopyableValue value={(r.value as string).trim()} />
            ) : (
              <span className="select-all font-semibold text-brand-black">
                {(r.value as string).trim()}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

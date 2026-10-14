"use client";
import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import { getSettings, type Settings } from "@/lib/api/settings";
import { deliveryPolicyParagraphs, shippingRule } from "@/lib/shipping";
import { formatPKR } from "@/lib/utils/format";

/**
 * The admin's delivery policy (charges, timing, advance payment) plus the
 * current delivery charge rule, shown wherever a customer decides to order.
 */
export function DeliveryPolicy({ className = "" }: { className?: string }) {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
  }, []);

  if (!settings) return null;

  const rule = shippingRule(settings);
  const paragraphs = deliveryPolicyParagraphs(settings);

  return (
    <div className={`bg-white border border-ink-10 p-4 sm:p-5 text-sm ${className}`}>
      <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-50 mb-3">
        <Truck className="h-3.5 w-3.5 text-brand-red" strokeWidth={2.5} />
        Delivery
      </h4>
      <p className="text-brand-black">
        {rule.freeEnabled ? (
          <>
            Delivery charge {formatPKR(rule.fee)}. Free on orders of {formatPKR(rule.threshold)} or more.
          </>
        ) : (
          <>Delivery charge {formatPKR(rule.fee)} on every order.</>
        )}
      </p>
      {paragraphs.length > 0 && (
        <div className="mt-2 space-y-1.5 text-xs text-muted leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}

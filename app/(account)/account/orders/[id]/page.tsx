"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrder } from "@/lib/api/orders";
import { useAuth } from "@/lib/store/auth";
import { GoldDivider } from "@/components/common/GoldDivider";
import { Skeleton } from "@/components/common/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatPKR } from "@/lib/utils/format";
import { Check, Package, Truck, Home } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Order, OrderStatus } from "@/types";

const STEPS: { key: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { key: "placed", label: "Placed", icon: <Check className="h-4 w-4" /> },
  { key: "confirmed", label: "Confirmed", icon: <Check className="h-4 w-4" /> },
  { key: "shipped", label: "Shipped", icon: <Truck className="h-4 w-4" /> },
  { key: "delivered", label: "Delivered", icon: <Home className="h-4 w-4" /> },
];

function statusIndex(s: OrderStatus) {
  const i = STEPS.findIndex((x) => x.key === s);
  return i === -1 ? 0 : i;
}

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const hydrated = useAuth((s) => s.hydrated);
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    if (hydrated && !user) router.replace("/login");
  }, [hydrated, user, router]);

  useEffect(() => {
    if (params?.id) getOrder(params.id).then(setOrder);
  }, [params?.id]);

  if (order === undefined) {
    return (
      <div className="container-shop py-12">
        <Skeleton className="h-8 w-64 mb-6" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }
  if (!order) {
    return (
      <div className="container-shop py-20 text-center">
        <h1 className="font-display text-3xl">Order not found</h1>
        <Button asChild className="mt-4">
          <Link href="/account/orders">Back to orders</Link>
        </Button>
      </div>
    );
  }

  const active = statusIndex(order.status);

  return (
    <div className="container-shop py-10 lg:py-14">
      <div className="mb-8">
        <GoldDivider className="mb-3 mx-0" />
        <h1 className="font-display text-3xl sm:text-4xl">Order {order.id}</h1>
        <p className="text-sm text-muted mt-1">Placed on {formatDate(order.placed_at)}</p>
      </div>

      {order.status !== "cancelled" && (
        <div className="bg-ivory border border-border rounded-lg p-5 lg:p-6 mb-6">
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            {STEPS.map((step, i) => {
              const done = i <= active;
              const current = i === active;
              return (
                <div key={step.key} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center text-center flex-shrink-0 min-w-[70px]">
                    <div
                      className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center border",
                        done ? "bg-brand-red border-brand-red text-white" : "border-border text-muted",
                        current && "ring-2 ring-brand-red/30"
                      )}
                    >
                      {step.icon}
                    </div>
                    <span className={cn("text-xs mt-2", done ? "text-brand-black" : "text-muted")}>
                      {step.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={cn("h-px flex-1 mx-1", i < active ? "bg-brand-red" : "bg-border")} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {order.status === "cancelled" && (
        <div className="bg-[#fdecec] border border-[#f4c7ca] text-brand-red rounded-lg p-4 mb-6 text-sm">
          This order was cancelled.
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        <section className="bg-ivory border border-border rounded-lg p-5 lg:p-6">
          <h3 className="font-display text-lg mb-4">Items</h3>
          <div className="divide-y divide-border">
            {order.items.map((i, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-12 w-12 rounded-full bg-cream border border-border flex items-center justify-center text-gold">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-brand-black truncate">{i.name}</p>
                    <p className="text-xs text-muted">
                      {i.size && <span>{i.size}</span>}
                      {i.color && (
                        <>
                          <span className="mx-1">&middot;</span>
                          <span>{i.color}</span>
                        </>
                      )}
                      <span className="mx-1">&middot;</span>
                      <span>Qty {i.quantity}</span>
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium">{formatPKR(i.line_total)}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-ivory border border-border rounded-lg p-5">
            <h3 className="font-display text-lg mb-3">Summary</h3>
            <div className="space-y-2 text-sm">
              <Row label="Subtotal" value={formatPKR(order.subtotal)} />
              <Row label="Shipping" value={order.shipping_fee === 0 ? "Free" : formatPKR(order.shipping_fee)} />
              <div className="h-px bg-border my-2" />
              <Row label="Total" value={formatPKR(order.total)} bold />
            </div>
          </div>
          <div className="bg-ivory border border-border rounded-lg p-5">
            <h3 className="font-display text-lg mb-3">Shipping to</h3>
            <p className="text-sm text-brand-black">{order.customer.name}</p>
            <p className="text-sm text-muted">{order.customer.phone}</p>
            <p className="text-sm text-muted mt-2">{order.shipping_address.full_address}</p>
            <p className="text-sm text-muted">
              {order.shipping_address.city}, {order.shipping_address.province} {order.shipping_address.postal_code}
            </p>
          </div>
          <div className="bg-ivory border border-border rounded-lg p-5">
            <h3 className="font-display text-lg mb-2">Payment</h3>
            <Badge tone="gold">
              {order.payment_method === "cod"
                ? "Cash on Delivery"
                : order.payment_method === "jazzcash"
                  ? "JazzCash"
                  : "Easypaisa"}
            </Badge>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className={bold ? "font-display text-lg" : "font-medium"}>{value}</span>
    </div>
  );
}

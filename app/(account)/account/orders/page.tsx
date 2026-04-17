"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOrders } from "@/lib/api/orders";
import { useAuth } from "@/lib/store/auth";
import { GoldDivider } from "@/components/common/GoldDivider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";
import { Skeleton } from "@/components/common/LoadingSkeleton";
import { formatDate, formatPKR } from "@/lib/utils/format";
import { Package } from "lucide-react";
import type { Order, OrderStatus } from "@/types";

const STATUS_TONE: Record<OrderStatus, "green" | "amber" | "gray" | "red" | "gold"> = {
  placed: "gold",
  confirmed: "amber",
  shipped: "amber",
  delivered: "green",
  cancelled: "red",
};

export default function OrdersPage() {
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const hydrated = useAuth((s) => s.hydrated);
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    if (hydrated && !user) router.replace("/login");
  }, [hydrated, user, router]);

  useEffect(() => {
    if (user) getOrders().then(setOrders);
  }, [user]);

  if (!user) return null;

  return (
    <div className="container-shop py-10 lg:py-14">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
        <div>
          <GoldDivider className="mb-3 mx-0" />
          <h1 className="font-display text-3xl sm:text-4xl">Your Orders</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/account">Back to account</Link>
        </Button>
      </div>

      {orders === null ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={<Package className="h-10 w-10" />}
          title="No orders yet"
          description="Once you place your first order, you'll be able to track it here."
          ctaHref="/products"
          ctaLabel="Start Shopping"
        />
      ) : (
        <>
          <div className="hidden lg:block bg-ivory border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-cream text-brand-black">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Order</th>
                  <th className="text-left px-5 py-3 font-medium">Date</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                  <th className="text-left px-5 py-3 font-medium">Total</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="px-5 py-4 font-medium">{o.id}</td>
                    <td className="px-5 py-4 text-muted">{formatDate(o.placed_at)}</td>
                    <td className="px-5 py-4">
                      <Badge tone={STATUS_TONE[o.status]}>{o.status}</Badge>
                    </td>
                    <td className="px-5 py-4">{formatPKR(o.total)}</td>
                    <td className="px-5 py-4 text-right">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/account/orders/${o.id}`}>View</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="bg-ivory border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-brand-black">{o.id}</p>
                  <Badge tone={STATUS_TONE[o.status]}>{o.status}</Badge>
                </div>
                <p className="text-xs text-muted mt-1">{formatDate(o.placed_at)}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-display text-base">{formatPKR(o.total)}</span>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/account/orders/${o.id}`}>View</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

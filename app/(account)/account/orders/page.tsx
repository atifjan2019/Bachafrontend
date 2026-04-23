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
  pending: "gold",
  paid: "green",
  processing: "amber",
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
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-ink-10 bg-ink-5/30">
          <Package className="h-12 w-12 text-ink-10 mx-auto mb-4" />
          <h3 className="font-display text-xl mb-2">No orders found</h3>
          <p className="text-ink-50 mb-8 max-w-xs mx-auto">Once you place your first order, you'll be able to track it here.</p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="hidden lg:block bg-white border border-ink-10 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ink-5 text-ink-50 border-b border-ink-10">
                  <th className="text-left px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Order</th>
                  <th className="text-left px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Date</th>
                  <th className="text-left px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Items</th>
                  <th className="text-left px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Status</th>
                  <th className="text-left px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Total</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-10">
                {orders.map((o) => (
                  <tr key={o.id} className="group hover:bg-ink-5/50 transition-colors">
                    <td className="px-6 py-6 font-bold text-brand-black">#{o.id}</td>
                    <td className="px-6 py-6 text-ink-50">{formatDate(o.placed_at)}</td>
                    <td className="px-6 py-6">
                      <div className="max-w-[240px]">
                        <p className="font-bold text-brand-black truncate">
                          {o.items.map((i) => i.name).join(", ")}
                        </p>
                        <p className="text-[10px] text-ink-30 uppercase mt-0.5 tracking-wider">
                          {o.items.length} {o.items.length === 1 ? "item" : "items"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <Badge tone={STATUS_TONE[o.status] || "neutral"} className="uppercase tracking-widest text-[9px] px-2 py-1 font-bold">
                        {o.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-6 font-display text-xl font-black">{formatPKR(o.total)}</td>
                    <td className="px-6 py-6 text-right">
                      <Button asChild size="sm" variant="outline" className="h-10 px-6 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all duration-300 font-bold uppercase tracking-widest text-[10px]">
                        <Link href={`/account/orders/${o.id}`}>Details</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="bg-white border border-ink-10 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-brand-black">#{o.id}</span>
                  <Badge tone={STATUS_TONE[o.status] || "neutral"} className="uppercase tracking-widest text-[9px] font-bold">
                    {o.status}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <p className="text-[10px] text-ink-30 uppercase tracking-widest mb-1">Items</p>
                  <p className="text-sm font-bold text-brand-black line-clamp-1">
                    {o.items.map((i) => i.name).join(", ")}
                  </p>
                  <p className="text-[10px] text-ink-30 uppercase mt-0.5">
                    {o.items.length} {o.items.length === 1 ? "item" : "items"}
                  </p>
                </div>

                <div className="flex items-end justify-between border-t border-ink-5 pt-4">
                  <div>
                    <p className="text-[10px] text-ink-30 uppercase tracking-widest mb-1">Placed on</p>
                    <p className="text-xs text-brand-black font-medium">{formatDate(o.placed_at)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-ink-30 uppercase tracking-widest mb-0.5">Total</p>
                    <p className="font-display text-lg font-black leading-none">{formatPKR(o.total)}</p>
                  </div>
                </div>

                <Button asChild className="w-full mt-5 h-12 uppercase tracking-widest text-[10px] font-bold" variant="outline">
                  <Link href={`/account/orders/${o.id}`}>View Full Details</Link>
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getOrder } from "@/lib/api/orders";
import { GoldDivider } from "@/components/common/GoldDivider";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/utils/format";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/common/LoadingSkeleton";
import type { Order } from "@/types";

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessFallback />}>
      <SuccessInner />
    </Suspense>
  );
}

function SuccessFallback() {
  return (
    <div className="container-shop py-14 lg:py-20">
      <div className="max-w-xl mx-auto text-center space-y-4">
        <Skeleton className="mx-auto h-14 w-14 rounded-full" />
        <Skeleton className="mx-auto h-8 w-72" />
        <Skeleton className="mx-auto h-4 w-96 max-w-full" />
      </div>
    </div>
  );
}

function SuccessInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) getOrder(id).then(setOrder);
  }, [id]);

  return (
    <div className="container-shop py-14 lg:py-20">
      <div className="max-w-xl mx-auto text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <GoldDivider className="my-4" />
        <h1 className="font-display text-3xl sm:text-4xl text-brand-black">
          Order placed, shukria!
        </h1>
        <p className="mt-3 text-muted">
          {id ? (
            <>
              Your order <span className="font-medium text-brand-black">{id}</span> has been
              received. Our team will call to confirm within the next few hours.
            </>
          ) : (
            "Your order has been received."
          )}
        </p>

        {!order ? (
          <div className="mt-10 space-y-6 max-w-2xl mx-auto">
            <div className="bg-white border border-ink-10 p-6 lg:p-8 shadow-sm space-y-6">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="pt-6 border-t border-ink-5 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-12 w-full mt-4" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        ) : (
          <div className="mt-10 space-y-6 text-left max-w-2xl mx-auto">
            <div className="bg-white border border-ink-10 p-6 lg:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg uppercase tracking-widest text-[11px] font-bold text-ink-30">Order Details</h3>
                <Badge tone="gold" className="uppercase tracking-widest text-[9px] font-bold px-3 py-1">
                  {order.status}
                </Badge>
              </div>
              
              <div className="space-y-5 mb-8">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm lg:text-base font-bold text-brand-black">{item.name}</p>
                      <p className="text-[10px] lg:text-[11px] text-ink-30 uppercase tracking-widest mt-0.5">
                        Qty {item.quantity} {item.size && <>&middot; Size {item.size}</>}
                      </p>
                    </div>
                    <p className="text-sm lg:text-base font-bold text-brand-black">{formatPKR(item.line_total)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-ink-5 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-50 uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                  <span className="font-medium text-brand-black">{formatPKR(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-50 uppercase tracking-widest text-[10px] font-bold">Shipping</span>
                  <span className="font-medium text-brand-black">
                    {order.shipping_fee === 0 ? "Free" : formatPKR(order.shipping_fee)}
                  </span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-ink-10">
                  <span className="font-black text-brand-black uppercase tracking-widest text-[12px]">Total Amount</span>
                  <span className="font-display text-2xl lg:text-3xl font-black leading-none">{formatPKR(order.total)}</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white border border-ink-10 p-6">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink-30 mb-3">Delivery Address</h4>
                <p className="text-sm font-bold text-brand-black mb-1">{order.customer.name}</p>
                <p className="text-xs text-ink-50 leading-relaxed">
                  {order.shipping_address.full_address}<br />
                  {order.shipping_address.city}, {order.shipping_address.province}
                </p>
              </div>
              <div className="bg-white border border-ink-10 p-6">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink-30 mb-3">Payment Info</h4>
                <p className="text-sm font-bold text-brand-black uppercase tracking-widest mb-1">
                  {order.payment_method === "cod" ? "Cash on Delivery" : order.payment_method}
                </p>
                <p className="text-[11px] text-ink-50 italic leading-relaxed">
                  Confirmation call expected within 2-3 hours.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

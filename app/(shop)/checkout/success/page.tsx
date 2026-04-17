"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getOrder } from "@/lib/api/orders";
import { GoldDivider } from "@/components/common/GoldDivider";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/utils/format";
import { CheckCircle2 } from "lucide-react";
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

        {order && (
          <div className="mt-8 bg-ivory border border-border rounded-lg p-5 text-left">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Total</span>
              <span className="font-display text-lg">{formatPKR(order.total)}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted">Payment</span>
              <span>
                {order.payment_method === "cod"
                  ? "Cash on Delivery"
                  : order.payment_method === "jazzcash"
                    ? "JazzCash"
                    : "Easypaisa"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted">Delivery to</span>
              <span className="text-right">
                {order.shipping_address.city}, {order.shipping_address.province}
              </span>
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

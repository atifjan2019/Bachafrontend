import { ShoppingBag } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";

export function EmptyCart({ onContinue }: { onContinue?: () => void }) {
  return (
    <div onClick={onContinue}>
      <EmptyState
        icon={<ShoppingBag className="h-10 w-10" />}
        title="Your cart is waiting"
        description="Kuch pyara sa choose karein. Your little one's next favourite outfit is only a click away."
        ctaHref="/products"
        ctaLabel="Continue Shopping"
      />
    </div>
  );
}

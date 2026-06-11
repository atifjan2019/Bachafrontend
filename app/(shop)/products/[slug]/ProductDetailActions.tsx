"use client";
import { useEffect, useMemo, useState } from "react";
import { ShoppingBag, Truck, Banknote, RefreshCw, ShieldCheck } from "lucide-react";
import { SizeSelector, ColorSelector, uniqueSizes, uniqueColors } from "@/components/product/VariantSelector";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPKR, stockStatus } from "@/lib/utils/format";
import { useCart } from "@/lib/store/cart";
import { useToast } from "@/components/ui/toast";
import type { Product } from "@/types";

export function ProductDetailActions({
  product,
  whatsappNumber,
}: {
  product: Product;
  whatsappNumber?: string;
}) {
  const sizes = useMemo(() => uniqueSizes(product.variants), [product]);
  const colors = useMemo(() => uniqueColors(product.variants), [product]);
  const [size, setSize] = useState<string | null>(sizes[0] ?? null);
  const [color, setColor] = useState<string | null>(colors[0]?.color ?? null);
  const [qty, setQty] = useState(1);

  const variant = useMemo(
    () => product.variants.find((v) => v.size === size && v.color === color) ?? null,
    [product.variants, size, color]
  );

  // Reset quantity when the selected variant changes so a stale qty can't
  // exceed the newly selected variant's stock.
  useEffect(() => {
    setQty(1);
  }, [size, color]);

  const onSale = product.sale_price !== null && product.sale_price < product.price;
  const displayPrice = product.sale_price ?? product.price;
  const stock = variant?.stock ?? 0;
  const status = stockStatus(stock, product.low_stock_threshold);

  // Pre-filled WhatsApp order message (only when an admin number is configured).
  const waNumber = whatsappNumber?.replace(/[^0-9]/g, "");
  const waMessage = `Hi! I'd like to order:\n${product.name}${size ? ` (Size: ${size})` : ""}\nPrice: ${formatPKR(displayPrice)}`;
  const waHref = waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}` : null;

  const addLine = useCart((s) => s.addLine);
  const openCart = useCart((s) => s.openCart);
  const { show } = useToast();

  function handleAdd() {
    if (!variant) return;
    addLine({
      id: `${product.id}-${variant.id}`,
      product_id: product.id,
      variant_id: variant.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]?.url ?? "",
      size: variant.size,
      color: variant.color,
      color_hex: variant.color_hex,
      unit_price: displayPrice,
      quantity: qty,
      max_stock: variant.stock,
    });
    show({ title: "Added to cart", description: `${product.name} (${variant.size})`, tone: "success" });
    openCart();
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-gold">{product.category.name}</p>
      <h1 className="mt-1 font-display text-3xl lg:text-4xl text-brand-black">{product.name}</h1>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="font-display text-2xl text-brand-red">{formatPKR(displayPrice)}</span>
        {onSale && (
          <span className="text-sm text-muted line-through">{formatPKR(product.price)}</span>
        )}
        {onSale && (
          <Badge tone="red">Save {formatPKR(product.price - (product.sale_price as number))}</Badge>
        )}
      </div>
      <p className="mt-4 text-sm text-muted max-w-md">{product.description.replace(/<[^>]*>/g, '').slice(0, 140)}&hellip;</p>

      <div className="h-px bg-border my-6" />

      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Size</span>
            {size && <span className="text-xs text-muted">Selected: {size}</span>}
          </div>
          <SizeSelector sizes={sizes} value={size} onChange={setSize} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Colour</span>
          </div>
          <ColorSelector colors={colors} value={color} onChange={setColor} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Quantity</span>
            <Badge tone={status.tone}>{status.label}</Badge>
          </div>
          <QuantityStepper value={qty} onChange={setQty} max={Math.max(1, stock)} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          className="w-full sm:flex-1"
          onClick={handleAdd}
          disabled={!variant || stock <= 0}
        >
          <ShoppingBag className="h-4 w-4" />
          {stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
        {waHref && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 bg-[#25D366] px-6 text-sm font-bold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Order on WhatsApp
          </a>
        )}
      </div>

      {/* Delivery & trust badges */}
      <div className="mt-7 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
        {[
          { icon: Truck, label: "Nationwide Delivery" },
          { icon: Banknote, label: "Cash on Delivery" },
          { icon: RefreshCw, label: "Easy Returns" },
          { icon: ShieldCheck, label: "Secure Checkout" },
        ].map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-2 text-center">
            <b.icon className="h-5 w-5 text-brand-red" strokeWidth={1.5} />
            <span className="text-[11px] font-medium leading-tight text-ink-70">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.08 2.89 1.23 3.09c.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.71.64.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.78 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z" />
    </svg>
  );
}

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
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

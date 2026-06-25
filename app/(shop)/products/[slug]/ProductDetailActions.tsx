"use client";
import { useEffect, useMemo, useState } from "react";
import { ShoppingBag, Truck, Banknote, RefreshCw, ShieldCheck } from "lucide-react";
import { SizeSelector, ColorSelector, uniqueSizes, uniqueColors } from "@/components/product/VariantSelector";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/common/SocialLinks";
import { WhatsAppIcon } from "@/components/common/SocialIcons";
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
  // Only show the colour picker when there's a real colour to choose —
  // products without colour variants carry a "Default" placeholder.
  const showColors = useMemo(
    () => colors.some((c) => c.color.trim().toLowerCase() !== "default"),
    [colors]
  );
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

        {showColors && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Colour</span>
            </div>
            <ColorSelector colors={colors} value={color} onChange={setColor} />
          </div>
        )}

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

      {/* Share / follow */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-6">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-50">
          Follow us
        </span>
        <SocialLinks tone="onLight" bordered={false} size="sm" />
      </div>
    </div>
  );
}

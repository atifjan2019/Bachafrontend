"use client";
import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { SizeSelector, ColorSelector, uniqueSizes, uniqueColors } from "@/components/product/VariantSelector";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPKR, stockStatus } from "@/lib/utils/format";
import { useCart } from "@/lib/store/cart";
import { useToast } from "@/components/ui/toast";
import type { Product } from "@/types";

export function ProductDetailActions({ product }: { product: Product }) {
  const sizes = useMemo(() => uniqueSizes(product.variants), [product]);
  const colors = useMemo(() => uniqueColors(product.variants), [product]);
  const [size, setSize] = useState<string | null>(sizes[0] ?? null);
  const [color, setColor] = useState<string | null>(colors[0]?.color ?? null);
  const [qty, setQty] = useState(1);

  const variant = useMemo(
    () => product.variants.find((v) => v.size === size && v.color === color) ?? null,
    [product.variants, size, color]
  );

  const onSale = product.sale_price !== null && product.sale_price < product.price;
  const displayPrice = product.sale_price ?? product.price;
  const stock = variant?.stock ?? 0;
  const status = stockStatus(stock, product.low_stock_threshold);

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

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button
          size="lg"
          className="w-full sm:flex-1"
          onClick={handleAdd}
          disabled={!variant || stock <= 0}
        >
          <ShoppingBag className="h-4 w-4" />
          {stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>

      <ul className="mt-6 space-y-1.5 text-xs text-muted">
        <li>&middot; Nationwide delivery in 2 to 5 working days</li>
        <li>&middot; Free shipping on orders above Rs. 5,000</li>
        <li>&middot; 7-day size exchange, easy returns</li>
      </ul>
    </div>
  );
}

"use client";
import { useMemo, useState } from "react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductDetailActions } from "./ProductDetailActions";
import type { Product, ProductImage } from "@/types";

/**
 * Gallery and purchase panel share one piece of state: the chosen colour.
 * When a colour has its own photo it is shown first in the gallery, so the
 * customer sees exactly the item that will go on the order.
 */
export function ProductDetailClient({
  product,
  whatsappNumber,
}: {
  product: Product;
  whatsappNumber?: string;
}) {
  const [color, setColor] = useState<string | null>(null);

  const images = useMemo<ProductImage[]>(() => {
    const chosen = product.colors.find((c) => c.name === color);
    if (!chosen?.image) return product.images;
    const rest = product.images.filter((img) => img.url !== chosen.image);
    return [{ id: -1, url: chosen.image, alt: `${product.name} in ${chosen.name}` }, ...rest];
  }, [product, color]);

  return (
    <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
      {/* Remount the gallery when the colour photo changes so it opens on it. */}
      <ProductGallery key={images[0]?.url ?? "none"} images={images} name={product.name} />
      <div>
        <ProductDetailActions product={product} whatsappNumber={whatsappNumber} onColorChange={setColor} />
      </div>
    </div>
  );
}

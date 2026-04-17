import Link from "next/link";
import Image from "next/image";
import { formatPKR } from "@/lib/utils/format";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.sale_price !== null && product.sale_price < product.price;
  const displayPrice = product.sale_price ?? product.price;
  const discount = onSale
    ? Math.round(((product.price - (product.sale_price as number)) / product.price) * 100)
    : 0;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] bg-surface-sunken overflow-hidden rounded-lg">
        <Image
          src={product.images[0]?.url ?? "/images/placeholder.svg"}
          alt={product.images[0]?.alt ?? product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        {onSale && (
          <div className="absolute left-3 top-3 bg-brand-black text-white text-[10px] uppercase tracking-wider font-medium px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}
        {!product.in_stock && (
          <div className="absolute right-3 top-3 bg-white text-ink-70 text-[10px] uppercase tracking-wider font-medium px-2 py-1 rounded-full">
            Sold out
          </div>
        )}
      </div>
      <div className="pt-4 pb-2">
        <h3 className="text-sm font-medium text-brand-black line-clamp-1 group-hover:text-ink-70 transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-ink-50">{product.category.name}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-medium text-brand-black">{formatPKR(displayPrice)}</span>
          {onSale && (
            <span className="text-xs text-ink-30 line-through">{formatPKR(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

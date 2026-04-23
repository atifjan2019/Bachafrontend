import Link from "next/link";
import Image from "next/image";
import { formatPKR } from "@/lib/utils/format";
import type { Product } from "@/types";
import { ArrowUpRight } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.sale_price !== null && product.sale_price < product.price;
  const displayPrice = product.sale_price ?? product.price;
  const discount = onSale
    ? Math.round(((product.price - (product.sale_price as number)) / product.price) * 100)
    : 0;

  return (
    <Link href={`/products/${product.slug}`} className="group relative block">
      {/* Image */}
      <div className="relative aspect-[4/5] bg-surface-sunken overflow-hidden">
        <Image
          src={product.images[0]?.url ?? "/images/placeholder.svg"}
          alt={product.images[0]?.alt ?? product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* Red overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tags */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {onSale && (
            <span className="tag-red shadow-red-glow">
              −{discount}%
            </span>
          )}
          {!product.in_stock && (
            <span className="tag-dark">Sold out</span>
          )}
        </div>

        {/* Hover CTA */}
        <div className="absolute right-3 top-3 h-10 w-10 bg-brand-red text-white flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-red-glow">
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
        </div>

        {/* Quick view bar */}
        <div className="absolute left-0 right-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="bg-brand-red text-white text-[11px] font-bold uppercase tracking-[0.22em] py-3 text-center">
            View Details →
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.22em] text-brand-red font-bold mb-1.5">
            {product.category.name}
          </p>
          <h3 className="text-[15px] font-semibold text-brand-black line-clamp-1 group-hover:text-brand-red transition-colors">
            {product.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-[15px] font-bold ${onSale ? "text-brand-red" : "text-brand-black"}`}>
              {formatPKR(displayPrice)}
            </span>
            {onSale && (
              <span className="text-xs text-ink-30 line-through">{formatPKR(product.price)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

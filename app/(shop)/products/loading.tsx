import { ProductCardSkeleton } from "@/components/common/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="flex flex-col">
      <section className="bg-surface-soft">
        <div className="container-shop py-16 lg:py-20">
          <div className="h-3 w-16 bg-ink-10 rounded animate-pulse" />
          <div className="mt-4 h-10 w-64 bg-ink-10 rounded animate-pulse" />
          <div className="mt-4 h-4 w-40 bg-ink-10 rounded animate-pulse" />
        </div>
      </section>
      <div className="container-shop py-8 lg:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

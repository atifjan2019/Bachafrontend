import { ProductCardSkeleton, Skeleton } from "@/components/common/LoadingSkeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-64 sm:h-80 w-full rounded-none" />
      <div className="container-shop py-10 lg:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

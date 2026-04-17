import { Skeleton } from "@/components/common/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="container-shop py-6 lg:py-12">
      <Skeleton className="h-4 w-64 mb-6" />
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <Skeleton className="aspect-[4/5] w-full" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

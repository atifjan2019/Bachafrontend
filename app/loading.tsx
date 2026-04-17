import { Skeleton } from "@/components/common/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="container-shop py-12 space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-[360px] w-full" />
    </div>
  );
}

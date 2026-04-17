import Link from "next/link";
import { GoldDivider } from "@/components/common/GoldDivider";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-shop py-20 lg:py-28 text-center">
      <GoldDivider className="mb-5" />
      <p className="font-display text-6xl text-brand-red">404</p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl">This page is out of stock</h1>
      <p className="mt-3 text-muted max-w-md mx-auto">
        The page you are looking for could not be found. Perhaps it moved, or never existed.
      </p>
      <div className="mt-6 flex gap-3 justify-center">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/products">Browse Shop</Link>
        </Button>
      </div>
    </div>
  );
}

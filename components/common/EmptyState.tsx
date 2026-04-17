import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyState({
  icon,
  title,
  description,
  ctaHref,
  ctaLabel,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4">
      {icon && <div className="mb-4 text-gold">{icon}</div>}
      <h3 className="font-display text-2xl text-brand-black">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted max-w-md">{description}</p>}
      {ctaHref && ctaLabel && (
        <Button asChild className="mt-6">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      )}
    </div>
  );
}

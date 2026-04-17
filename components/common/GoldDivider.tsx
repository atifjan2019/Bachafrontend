// Kept as a no-op spacer for backwards compatibility.
// The modern design does not use decorative dividers.
export function GoldDivider({ className = "" }: { className?: string }) {
  return <span aria-hidden className={className} />;
}

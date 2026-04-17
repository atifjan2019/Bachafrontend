export function formatPKR(amount: number): string {
  if (typeof amount !== "number" || Number.isNaN(amount)) return "Rs. 0";
  return `Rs. ${Math.round(amount).toLocaleString("en-PK")}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function stockStatus(stock: number, lowThreshold: number) {
  if (stock <= 0) return { label: "Out of Stock", tone: "gray" as const };
  if (stock <= lowThreshold) return { label: `Only ${stock} left`, tone: "amber" as const };
  return { label: "In Stock", tone: "green" as const };
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

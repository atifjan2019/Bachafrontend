import { apiClient, USE_MOCKS, delay } from "./client";
import { mockCategories } from "@/lib/mocks/categories";
import type { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  if (USE_MOCKS) {
    await delay(60);
    return mockCategories;
  }
  const res = await apiClient.get<{ data: Category[] }>("/categories");
  return res.data.data;
}

export async function getCategory(slug: string): Promise<Category | null> {
  if (USE_MOCKS) {
    await delay(60);
    return mockCategories.find((c) => c.slug === slug) ?? null;
  }
  const res = await apiClient.get<{ data: Category }>(`/categories/${slug}`);
  return res.data.data;
}

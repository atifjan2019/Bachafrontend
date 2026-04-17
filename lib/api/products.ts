import { apiClient, USE_MOCKS, delay } from "./client";
import { mockProducts } from "@/lib/mocks/products";
import type { Product, ProductListParams, ProductListResponse } from "@/types";

export async function getProducts(params: ProductListParams = {}): Promise<ProductListResponse> {
  if (USE_MOCKS) {
    await delay(150);
    let list = [...mockProducts];
    if (params.category) list = list.filter((p) => p.category.slug === params.category);
    if (typeof params.min_price === "number")
      list = list.filter((p) => (p.sale_price ?? p.price) >= params.min_price!);
    if (typeof params.max_price === "number")
      list = list.filter((p) => (p.sale_price ?? p.price) <= params.max_price!);
    if (params.sort === "price_asc")
      list.sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
    else if (params.sort === "price_desc")
      list.sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
    else list.sort((a, b) => (a.created_at && b.created_at ? b.created_at.localeCompare(a.created_at) : 0));

    const perPage = params.per_page ?? 12;
    const page = params.page ?? 1;
    const start = (page - 1) * perPage;
    const data = list.slice(start, start + perPage);
    return {
      data,
      meta: {
        current_page: page,
        last_page: Math.max(1, Math.ceil(list.length / perPage)),
        total: list.length,
      },
    };
  }
  const res = await apiClient.get<ProductListResponse>("/products", { params });
  return res.data;
}

export async function getProduct(slug: string): Promise<Product | null> {
  if (USE_MOCKS) {
    await delay(120);
    return mockProducts.find((p) => p.slug === slug) ?? null;
  }
  const res = await apiClient.get<{ data: Product }>(`/products/${slug}`);
  return res.data.data;
}

export async function getRelated(slug: string, categorySlug: string, limit = 4): Promise<Product[]> {
  if (USE_MOCKS) {
    await delay(80);
    return mockProducts
      .filter((p) => p.category.slug === categorySlug && p.slug !== slug)
      .slice(0, limit);
  }
  const res = await apiClient.get<{ data: Product[] }>(`/products/${slug}/related`, { params: { limit } });
  return res.data.data;
}

export async function getFeatured(limit = 8): Promise<Product[]> {
  if (USE_MOCKS) {
    await delay(80);
    return [...mockProducts].sort((a, b) => (a.sale_price ? -1 : 1)).slice(0, limit);
  }
  const res = await apiClient.get<{ data: Product[] }>("/products/featured", { params: { limit } });
  return res.data.data;
}

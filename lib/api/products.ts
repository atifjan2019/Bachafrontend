import { apiClient, USE_MOCKS, delay } from "./client";
import { mockProducts } from "@/lib/mocks/products";
import type { Product, ProductListParams, ProductListResponse } from "@/types";

/**
 * Adapt a raw product object from the Laravel backend
 * into the shape the frontend expects.
 */
function adaptProduct(raw: Record<string, unknown>): Product {
  const price = Number(raw.price) || 0;
  const originalPrice = raw.original_price != null ? Number(raw.original_price) : null;

  // Backend stores `category` as a slug string – normalise to object
  const categorySlug = typeof raw.category === "string" ? raw.category : "";
  const categoryObj =
    typeof raw.category === "object" && raw.category !== null
      ? (raw.category as { id: number; slug: string; name: string })
      : { id: 0, slug: categorySlug, name: categorySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) };

  // Backend: `image` (single URL), `gallery` (comma-sep or JSON array)
  const mainImage = typeof raw.image === "string" ? raw.image : "";
  const galleryRaw = raw.gallery;
  let galleryUrls: string[] = [];
  if (Array.isArray(galleryRaw)) {
    galleryUrls = galleryRaw.map(String);
  } else if (typeof galleryRaw === "string" && galleryRaw.length > 0) {
    try {
      const parsed = JSON.parse(galleryRaw);
      galleryUrls = Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      galleryUrls = galleryRaw.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }
  const allImageUrls = [mainImage, ...galleryUrls].filter(Boolean);
  const images = allImageUrls.map((url, i) => ({
    id: i + 1,
    url,
    alt: `${raw.name ?? "Product"} image ${i + 1}`,
  }));

  // Backend: `sizes` may be comma-separated or JSON array
  const sizesRaw = raw.sizes;
  let sizeList: string[] = [];
  if (Array.isArray(sizesRaw)) {
    sizeList = sizesRaw.map(String);
  } else if (typeof sizesRaw === "string" && sizesRaw.length > 0) {
    try {
      const parsed = JSON.parse(sizesRaw);
      sizeList = Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      sizeList = sizesRaw.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  // Synthesise variants from sizes (backend doesn't have variant model)
  const variants = sizeList.map((size, i) => ({
    id: Number(raw.id) * 100 + i,
    size,
    color: "Default",
    color_hex: "#333333",
    stock: 10, // assume in-stock since backend doesn't track per-variant stock
    sku: `BSF-${raw.id}-${size}`,
  }));

  // If no sizes, create a single "One Size" variant so the cart can still work
  if (variants.length === 0) {
    variants.push({
      id: Number(raw.id) * 100,
      size: "One Size",
      color: "Default",
      color_hex: "#333333",
      stock: 10,
      sku: `BSF-${raw.id}-OS`,
    });
  }

  return {
    id: Number(raw.id) || 0,
    slug: String(raw.slug ?? ""),
    name: String(raw.name ?? ""),
    description: String(raw.description ?? ""),
    price: originalPrice != null && originalPrice > price ? originalPrice : price,
    sale_price: originalPrice != null && originalPrice > price ? price : null,
    category: categoryObj,
    images,
    variants,
    in_stock: true,
    low_stock_threshold: 3,
    created_at: String(raw.created_at ?? ""),
  };
}

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

  // Build query params matching backend expectations
  const apiParams: Record<string, string | number> = {};
  if (params.category) apiParams.category = params.category;
  if (params.per_page) apiParams.per_page = params.per_page;
  if (params.page) apiParams.page = params.page;
  // Backend doesn't support min_price/max_price/sort natively — pass what it accepts

  const res = await apiClient.get("/products", { params: apiParams });
  const raw = res.data;

  // Laravel paginator returns { data: [...], current_page, last_page, total, ... }
  const rawProducts: Record<string, unknown>[] = Array.isArray(raw.data) ? raw.data : Array.isArray(raw) ? raw : [];
  let products = rawProducts.map(adaptProduct);

  // Client-side price filtering (backend doesn't support these params)
  if (typeof params.min_price === "number") {
    products = products.filter((p) => (p.sale_price ?? p.price) >= params.min_price!);
  }
  if (typeof params.max_price === "number") {
    products = products.filter((p) => (p.sale_price ?? p.price) <= params.max_price!);
  }

  // Client-side sorting
  if (params.sort === "price_asc") {
    products.sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
  } else if (params.sort === "price_desc") {
    products.sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
  }

  return {
    data: products,
    meta: {
      current_page: raw.current_page ?? 1,
      last_page: raw.last_page ?? 1,
      total: raw.total ?? products.length,
    },
  };
}

export async function getProduct(slug: string): Promise<Product | null> {
  if (USE_MOCKS) {
    await delay(120);
    return mockProducts.find((p) => p.slug === slug) ?? null;
  }
  try {
    const res = await apiClient.get(`/products/${slug}`);
    const raw = res.data.data ?? res.data;
    return adaptProduct(raw);
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "response" in e) {
      const err = e as { response?: { status?: number } };
      if (err.response?.status === 404) return null;
    }
    throw e;
  }
}

export async function getRelated(slug: string, categorySlug: string, limit = 4): Promise<Product[]> {
  if (USE_MOCKS) {
    await delay(80);
    return mockProducts
      .filter((p) => p.category.slug === categorySlug && p.slug !== slug)
      .slice(0, limit);
  }
  // Backend doesn't have a /related endpoint – fetch products from same category
  try {
    const res = await apiClient.get("/products", {
      params: { category: categorySlug, per_page: limit + 1 },
    });
    const rawProducts: Record<string, unknown>[] = Array.isArray(res.data.data) ? res.data.data : [];
    return rawProducts
      .map(adaptProduct)
      .filter((p) => p.slug !== slug)
      .slice(0, limit);
  } catch {
    return [];
  }
}

export async function getFeatured(limit = 8): Promise<Product[]> {
  if (USE_MOCKS) {
    await delay(80);
    return [...mockProducts].sort((a, b) => (a.sale_price ? -1 : 1)).slice(0, limit);
  }
  // Backend doesn't have a /featured endpoint – return latest products
  try {
    const res = await apiClient.get("/products", { params: { per_page: limit } });
    const rawProducts: Record<string, unknown>[] = Array.isArray(res.data.data) ? res.data.data : [];
    return rawProducts.map(adaptProduct);
  } catch {
    return [];
  }
}

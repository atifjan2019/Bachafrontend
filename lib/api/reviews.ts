import { apiClient } from "./client";
import type { Review, ReviewsResponse } from "@/types";

export async function getReviews(slug: string): Promise<ReviewsResponse> {
  try {
    const { data } = await apiClient.get<ReviewsResponse>(`/products/${slug}/reviews`);
    return {
      data: Array.isArray(data.data) ? data.data : [],
      meta: data.meta ?? { count: 0, average: 0 },
    };
  } catch {
    return { data: [], meta: { count: 0, average: 0 } };
  }
}

export async function createReview(
  slug: string,
  payload: { author_name: string; rating: number; comment: string }
): Promise<Review> {
  const { data } = await apiClient.post<{ data: Review }>(
    `/products/${slug}/reviews`,
    payload
  );
  return data.data;
}

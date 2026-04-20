import { apiClient } from "./client";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  content: string | null;
  image: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export async function getBlogPosts(params?: { per_page?: number }): Promise<{
  data: BlogPost[];
  meta?: any;
}> {
  const searchParams = new URLSearchParams();
  if (params?.per_page) searchParams.set("per_page", params.per_page.toString());

  const query = searchParams.toString();
  const endpoint = `/blog-posts${query ? `?${query}` : ""}`;

  const response = await apiClient.get(endpoint);
  return response.data;
}

export async function getBlogPost(slug: string): Promise<{ data: BlogPost }> {
  const response = await apiClient.get(`/blog-posts/${slug}`);
  return response.data;
}

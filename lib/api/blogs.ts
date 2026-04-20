import { fetchApi } from "./client";

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

  return fetchApi(endpoint);
}

export async function getBlogPost(slug: string): Promise<{ data: BlogPost }> {
  return fetchApi(`/blog-posts/${slug}`);
}

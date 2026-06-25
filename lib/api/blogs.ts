import { apiClient, USE_MOCKS, delay } from "./client";
import { mockBlogPosts } from "@/lib/mocks/blogs";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  category: string | null;
  image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image: string | null;
  canonical_url: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export async function getBlogPosts(params?: { per_page?: number }): Promise<{
  data: BlogPost[];
  meta?: any;
}> {
  if (USE_MOCKS) {
    await delay(60);
    return { data: mockBlogPosts };
  }

  const searchParams = new URLSearchParams();
  if (params?.per_page) searchParams.set("per_page", params.per_page.toString());

  const query = searchParams.toString();
  const endpoint = `/blog-posts${query ? `?${query}` : ""}`;

  try {
    const response = await apiClient.get(endpoint);
    const data = response.data?.data ?? response.data;
    // Fall back to placeholder articles while the backend has no posts yet,
    // so the Journal is never empty.
    if (!Array.isArray(data) || data.length === 0) {
      return { data: mockBlogPosts };
    }
    return response.data;
  } catch {
    return { data: mockBlogPosts };
  }
}

export async function getBlogPost(slug: string): Promise<{ data: BlogPost }> {
  const mockPost = mockBlogPosts.find((p) => p.slug === slug);

  if (USE_MOCKS) {
    await delay(60);
    if (mockPost) return { data: mockPost };
    throw new Error(`Blog post not found: ${slug}`);
  }

  try {
    const response = await apiClient.get(`/blog-posts/${slug}`);
    return response.data;
  } catch (e) {
    // Serve a placeholder article if it matches a known slug; otherwise
    // surface the error so the route can render its 404.
    if (mockPost) return { data: mockPost };
    throw e;
  }
}

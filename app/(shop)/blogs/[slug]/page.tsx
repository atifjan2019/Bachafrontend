import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/api/blogs";
import { SocialLinks } from "@/components/common/SocialLinks";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function plain(html: string) {
  return html.replace(/<[^>]*>?/gm, "");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data: post } = await getBlogPost(slug);
    const title = post.meta_title?.trim() || post.title;
    const description =
      post.meta_description?.trim() ||
      post.excerpt?.trim() ||
      (post.content ? plain(post.content).slice(0, 160) : "Read the latest from the Bacha Stylo Journal.");
    const ogImage = post.og_image || post.image || undefined;

    return {
      title,
      description,
      keywords: post.meta_keywords?.trim() || undefined,
      openGraph: {
        title,
        description,
        type: "article",
        images: ogImage ? [{ url: ogImage }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ogImage ? [ogImage] : undefined,
      },
      ...(post.canonical_url?.trim()
        ? { alternates: { canonical: post.canonical_url.trim() } }
        : {}),
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post;
  try {
    const response = await getBlogPost(slug);
    post = response.data;
  } catch {
    return notFound();
  }

  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = post.category?.trim() || "Journal";

  return (
    <article className="min-h-screen bg-white">
      <div className="container-shop py-10 lg:py-16">
        <Link
          href="/blogs"
          className="mb-10 inline-flex items-center text-sm font-medium text-ink-50 transition-colors hover:text-brand-black"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to the Journal
        </Link>

        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="mb-5 inline-block bg-brand-red px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
            {category}
          </span>
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tightest text-brand-black lg:text-5xl">
            {post.title}
          </h1>
          <div className="text-ink-50">{date}</div>
        </div>

        {post.image && (
          <div className="relative mb-16 aspect-[21/9] w-full overflow-hidden bg-surface-sunken shadow-sm">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}

        <div className="prose prose-brand prose-lg mx-auto max-w-3xl">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p>Content is still being written for this story. Check back soon.</p>
          )}
        </div>

        {/* Share / follow */}
        <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-4 border-t border-ink-10 pt-10 sm:flex-row sm:justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red">
            Enjoyed this? Follow us
          </p>
          <SocialLinks tone="onLight" size="md" />
        </div>
      </div>
    </article>
  );
}

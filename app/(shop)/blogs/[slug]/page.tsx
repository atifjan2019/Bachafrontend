import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/api/blogs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const { data: post } = await getBlogPost(params.slug);
    return {
      title: post.title,
      description: post.content ? post.content.replace(/<[^>]*>?/gm, '').substring(0, 160) : "Read our latest blog post at Bacha Stylo.",
    };
  } catch (error) {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    const response = await getBlogPost(params.slug);
    post = response.data;
  } catch (error) {
    return notFound();
  }

  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="min-h-screen bg-brand-white">
      <div className="container-shop py-10 lg:py-16">
        <Link href="/blogs" className="inline-flex items-center text-sm font-medium text-ink-50 hover:text-brand-black transition-colors mb-10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all posts
        </Link>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-block rounded-full bg-surface-soft px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ink-50 font-medium mb-5">
            News
          </span>
          <h1 className="font-display text-4xl lg:text-5xl text-brand-black tracking-tightest leading-tight mb-6">
            {post.title}
          </h1>
          <div className="text-ink-50">
            {date}
          </div>
        </div>

        {post.image && (
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-surface-sunken mb-16 shadow-sm">
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

        <div className="max-w-3xl mx-auto prose prose-brand prose-lg">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p>Content is still being written for this post. Check back soon!</p>
          )}
        </div>
      </div>
    </article>
  );
}

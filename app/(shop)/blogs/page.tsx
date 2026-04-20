import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Style tips, parenting hacks, and behind-the-scenes stories from Bacha Stylo.",
};

import { getBlogPosts, BlogPost as ApiBlogPost } from "@/lib/api/blogs";

function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, '');
}

function calculateReadTime(text: string) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
};

export default async function BlogsPage() {
  const { data: realPosts } = await getBlogPosts({ per_page: 50 });

  const POSTS: BlogPost[] = realPosts.map((post: ApiBlogPost) => {
    const rawText = post.content ? stripHtml(post.content) : "No content available.";
    const excerpt = rawText.length > 120 ? rawText.substring(0, 120) + "..." : rawText;
    
    return {
      slug: post.slug,
      title: post.title,
      excerpt,
      image: post.image || "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&auto=format&fit=crop&q=70",
      date: new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: "News",
      readTime: calculateReadTime(rawText),
    };
  });

  const [featured, ...rest] = POSTS;

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Blog"
        title="Stories, tips & behind the scenes."
        subtitle="Style guides, parenting hacks, and a peek into how we design and make kids' clothing in Pakistan."
        variant="dark"
        align="center"
      />

      {/* Featured post */}
      {featured ? (
        <section className="container-shop py-16 lg:py-20">
          <Link href={`/blogs/${featured.slug}`} className="group grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-surface-sunken">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block rounded-full bg-surface-soft px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ink-50 font-medium">
                  {featured.category}
                </span>
                <span className="text-xs text-ink-50">{featured.date}</span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-brand-black tracking-tightest leading-tight group-hover:text-ink-70 transition-colors">
                {featured.title}
              </h2>
              <p className="mt-4 text-base text-ink-50 leading-relaxed max-w-lg">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand-black group-hover:gap-2 transition-all">
                Read article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </section>
      ) : (
        <div className="container-shop py-16 lg:py-20 text-center">
            <h2 className="text-2xl font-display text-brand-black">No posts published yet.</h2>
            <p className="text-ink-50 mt-2">Check back later for updates!</p>
        </div>
      )}

      {/* All posts grid */}
      <section className="bg-surface-soft">
        <div className="container-shop py-16 lg:py-20">
          <div className="mb-10">
            <span className="eyebrow">All posts</span>
            <h2 className="mt-3 font-display text-2xl lg:text-3xl text-brand-black tracking-tightest">
              Latest from the blog
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-surface-sunken">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-ink-50 font-medium">
            {post.category}
          </span>
          <span className="text-xs text-ink-30">·</span>
          <span className="text-xs text-ink-50">{post.readTime}</span>
        </div>
        <h3 className="font-display text-lg text-brand-black tracking-tight leading-snug group-hover:text-ink-70 transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-ink-50 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <span className="mt-3 text-xs text-ink-50">{post.date}</span>
      </div>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { ArrowUpRight } from "lucide-react";
import { getBlogPosts, type BlogPost as ApiBlogPost } from "@/lib/api/blogs";

export const metadata: Metadata = {
  title: "The Journal — Bacha Stylo",
  description:
    "Stories of tradition & style — fashion insights, heritage stories, seasonal collections, styling inspiration, and brand storytelling from Bacha Stylo.",
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, "");
}

function readTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  image: string | null;
  date: string;
  category: string;
  readTime: string;
};

function toPost(p: ApiBlogPost): Post {
  const text = p.content ? stripHtml(p.content) : "";
  const excerpt =
    p.excerpt?.trim() ||
    (text.length > 140 ? `${text.slice(0, 140)}…` : text) ||
    "Read the full story.";
  return {
    slug: p.slug,
    title: p.title,
    excerpt,
    image: p.image,
    date: new Date(p.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    category: p.category?.trim() || "Journal",
    readTime: readTime(text || p.title),
  };
}

export default async function JournalPage() {
  const { data: realPosts } = await getBlogPosts({ per_page: 50 });
  const posts = realPosts.map(toPost);
  const [featured, ...rest] = posts;

  return (
    <div className="flex flex-col bg-white">
      <PageHero
        eyebrow="The Journal"
        title="Stories of Tradition & Style"
        subtitle="Fashion insights, heritage stories, seasonal collections, styling inspiration, and brand storytelling."
        variant="dark"
        align="center"
      />

      {!featured ? (
        <div className="container-shop py-24 text-center">
          <h2 className="font-display text-2xl text-brand-black">No stories published yet.</h2>
          <p className="mt-2 text-ink-50">
            New journal entries are coming soon — check back shortly.
          </p>
        </div>
      ) : (
        <>
          {/* Featured story */}
          <section className="container-shop py-16 lg:py-24">
            <Link
              href={`/blogs/${featured.slug}`}
              className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-black">
                <BlogImage
                  src={featured.image}
                  alt={featured.title}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  fallback={featured.title}
                />
                <span className="absolute left-5 top-5 inline-flex items-center bg-brand-red px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                  Featured
                </span>
              </div>
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em]">
                  <span className="text-brand-red">{featured.category}</span>
                  <span className="h-1 w-1 rounded-full bg-ink-30" />
                  <span className="text-ink-50">{featured.date}</span>
                  <span className="h-1 w-1 rounded-full bg-ink-30" />
                  <span className="text-ink-50">{featured.readTime}</span>
                </div>
                <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tightest text-brand-black transition-colors group-hover:text-brand-red sm:text-4xl lg:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-70 sm:text-lg">
                  {featured.excerpt}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-black transition-all group-hover:gap-3">
                  Read story
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:rotate-45"
                    strokeWidth={2.5}
                  />
                </span>
              </div>
            </Link>
          </section>

          {/* Grid of stories */}
          {rest.length > 0 && (
            <section className="bg-ink-5">
              <div className="container-shop py-16 lg:py-24">
                <div className="mb-10 sm:mb-14">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-[2px] w-8 bg-brand-red" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                      Latest Stories
                    </span>
                  </div>
                  <h2 className="font-display text-3xl font-bold tracking-tightest text-brand-black sm:text-4xl">
                    From the Journal
                  </h2>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                  {rest.map((post) => (
                    <ArticleCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function ArticleCard({ post }: { post: Post }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-black">
        <BlogImage
          src={post.image}
          alt={post.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          fallback={post.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="mt-5">
        <div className="mb-2.5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em]">
          <span className="text-brand-red">{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-ink-30" />
          <span className="text-ink-50">{post.readTime}</span>
        </div>
        <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-brand-black transition-colors group-hover:text-brand-red">
          {post.title}
        </h3>
        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink-70">{post.excerpt}</p>
        <span className="mt-4 inline-block text-xs text-ink-50">{post.date}</span>
      </div>
    </Link>
  );
}

function BlogImage({
  src,
  alt,
  sizes,
  fallback,
}: {
  src: string | null;
  alt: string;
  sizes: string;
  fallback: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    );
  }
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black-soft to-[#2a1116]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(232,29,37,0.2)_0%,transparent_60%)]" />
      <span className="absolute inset-0 flex items-center justify-center font-display text-6xl font-bold text-white/10">
        {fallback.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

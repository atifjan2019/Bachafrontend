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

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
};

const POSTS: BlogPost[] = [
  {
    slug: "how-to-pick-the-right-size",
    title: "How to Pick the Right Size for Growing Kids",
    excerpt:
      "A practical guide to measuring your child and choosing sizes that last more than one season.",
    image:
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&auto=format&fit=crop&q=70",
    date: "Apr 10, 2026",
    category: "Style Guide",
    readTime: "4 min read",
  },
  {
    slug: "summer-wardrobe-essentials",
    title: "5 Summer Wardrobe Essentials Every Kid Needs",
    excerpt:
      "From breathable cottons to lightweight layers — the building blocks of a heat-proof wardrobe.",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=70",
    date: "Mar 28, 2026",
    category: "Seasonal",
    readTime: "3 min read",
  },
  {
    slug: "behind-the-stitch",
    title: "Behind the Stitch: How We Make Our Clothes",
    excerpt:
      "A look inside our Lahore studio — from fabric sourcing to final quality check.",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&auto=format&fit=crop&q=70",
    date: "Mar 15, 2026",
    category: "Behind the Scenes",
    readTime: "5 min read",
  },
  {
    slug: "mixing-and-matching-kids-outfits",
    title: "Mix & Match: Building Outfits from 5 Basics",
    excerpt:
      "How to create a week's worth of looks with just five versatile pieces from our collection.",
    image:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&auto=format&fit=crop&q=70",
    date: "Feb 22, 2026",
    category: "Style Guide",
    readTime: "3 min read",
  },
  {
    slug: "caring-for-kids-clothes",
    title: "How to Make Kids' Clothes Last Longer",
    excerpt:
      "Simple washing and storage tips to keep colours bright and fabrics soft — even after dozens of wears.",
    image:
      "https://images.unsplash.com/photo-1604467707321-70d009801bf9?w=800&auto=format&fit=crop&q=70",
    date: "Feb 10, 2026",
    category: "Care Tips",
    readTime: "4 min read",
  },
  {
    slug: "festive-dressing-guide",
    title: "Eid Dressing: Comfort Meets Celebration",
    excerpt:
      "Special-occasion outfits that let kids be kids — festive enough for family gatherings, comfy enough to play in.",
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format&fit=crop&q=70",
    date: "Jan 30, 2026",
    category: "Seasonal",
    readTime: "3 min read",
  },
];

export default function BlogsPage() {
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

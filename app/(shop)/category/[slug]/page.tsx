import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { GoldDivider } from "@/components/common/GoldDivider";
import { EmptyState } from "@/components/common/EmptyState";

export async function generateStaticParams() {
  const cats = await getCategories();
  return cats.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [category, res] = await Promise.all([
    getCategory(slug),
    getProducts({ category: slug, per_page: 40 }),
  ]);
  if (!category) return notFound();

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={category.image} alt={category.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container-shop py-16 lg:py-20 text-center">
          <span className="inline-block text-[11px] uppercase tracking-[0.22em] text-white/60 font-medium">
            Shop by category
          </span>
          <h1 className="mt-4 font-display text-4xl lg:text-5xl text-white tracking-tightest">{category.name}</h1>
          <p className="mt-4 text-base text-white/70">
            {res.meta.total} pieces curated for {category.name.toLowerCase()}
          </p>
        </div>
      </section>

      <div className="container-shop py-10 lg:py-14">
        <div className="text-sm text-muted mb-6">
          <Link href="/" className="hover:text-brand-red">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-brand-red">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-black">{category.name}</span>
        </div>
        {res.data.length === 0 ? (
          <EmptyState
            title="New pieces arriving soon"
            description="This collection is being restocked. Browse our other occasions in the meantime."
            ctaHref="/products"
            ctaLabel="Browse All"
          />
        ) : (
          <ProductGrid products={res.data} />
        )}
      </div>
    </div>
  );
}

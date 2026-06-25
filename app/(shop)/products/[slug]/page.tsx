import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getRelated } from "@/lib/api/products";
import { getSettings } from "@/lib/api/settings";
import { resolveWhatsApp } from "@/lib/constants/social";
import { getReviews } from "@/lib/api/reviews";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductReviews } from "@/components/product/ProductReviews";
import { SizeGuide } from "@/components/product/SizeGuide";
import { GoldDivider } from "@/components/common/GoldDivider";
import { ProductDetailActions } from "./ProductDetailActions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return notFound();
  const [related, settings, reviews] = await Promise.all([
    getRelated(product.slug, product.category.slug, 4),
    getSettings().catch(() => null),
    getReviews(product.slug),
  ]);

  return (
    <div className="container-shop py-6 lg:py-12">
      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand-red">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category.slug}`} className="hover:text-brand-red">
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brand-black">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
        <ProductGallery images={product.images} name={product.name} />
        <div>
          <ProductDetailActions
            product={product}
            whatsappNumber={resolveWhatsApp(settings?.whatsapp_number).number}
          />

          <div className="mt-8">
            <Accordion type="single" collapsible defaultValue="desc">
              <AccordionItem value="desc">
                <AccordionTrigger>Full Description</AccordionTrigger>
                <AccordionContent><div dangerouslySetInnerHTML={{ __html: product.description }} className="prose prose-sm max-w-none" /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="size">
                <AccordionTrigger>Size Guide</AccordionTrigger>
                <AccordionContent>
                  <SizeGuide sizes={Array.from(new Set(product.variants.map((v) => v.size)))} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care">
                <AccordionTrigger>Care Instructions</AccordionTrigger>
                <AccordionContent>
                  Gentle machine wash in cold water. Turn inside out before washing embroidered pieces.
                  Do not bleach. Dry in shade. Warm iron on reverse.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="delivery">
                <AccordionTrigger>Delivery &amp; Returns</AccordionTrigger>
                <AccordionContent>
                  Delivery in 2 to 5 working days across Pakistan. Free shipping on orders above Rs. 5,000.
                  Size exchanges accepted within 7 days of delivery, item must be unused with tags intact.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <ProductReviews
        slug={product.slug}
        initialReviews={reviews.data}
        initialAverage={reviews.meta.average}
        initialCount={reviews.meta.count}
      />

      {related.length > 0 && (
        <section className="mt-16 lg:mt-24">
          <div className="text-center mb-8">
            <GoldDivider className="mb-4" />
            <h2 className="font-display text-2xl sm:text-3xl">You may also love</h2>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}

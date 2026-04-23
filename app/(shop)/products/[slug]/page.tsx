import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getRelated } from "@/lib/api/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { GoldDivider } from "@/components/common/GoldDivider";
import { ProductDetailActions } from "./ProductDetailActions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return notFound();
  const related = await getRelated(product.slug, product.category.slug, 4);

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
          <ProductDetailActions product={product} />

          <div className="mt-8">
            <Accordion type="single" collapsible defaultValue="desc">
              <AccordionItem value="desc">
                <AccordionTrigger>Full Description</AccordionTrigger>
                <AccordionContent><div dangerouslySetInnerHTML={{ __html: product.description }} className="prose prose-sm max-w-none" /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="size">
                <AccordionTrigger>Size Guide</AccordionTrigger>
                <AccordionContent>
                  <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                    <table className="w-full text-left text-xs min-w-[340px]">
                      <thead className="text-brand-black">
                        <tr>
                          <th className="py-2 pr-3">Size</th>
                          <th className="py-2 pr-3">Age</th>
                          <th className="py-2 pr-3">Chest (in)</th>
                          <th className="py-2">Length (in)</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted">
                        <tr className="border-t border-border"><td className="py-1.5 pr-3">2-3Y</td><td className="pr-3">2-3 years</td><td className="pr-3">22</td><td>18</td></tr>
                        <tr className="border-t border-border"><td className="py-1.5 pr-3">4-5Y</td><td className="pr-3">4-5 years</td><td className="pr-3">24</td><td>20</td></tr>
                        <tr className="border-t border-border"><td className="py-1.5 pr-3">6-7Y</td><td className="pr-3">6-7 years</td><td className="pr-3">26</td><td>23</td></tr>
                        <tr className="border-t border-border"><td className="py-1.5 pr-3">8-9Y</td><td className="pr-3">8-9 years</td><td className="pr-3">28</td><td>26</td></tr>
                        <tr className="border-t border-border"><td className="py-1.5 pr-3">10-11Y</td><td className="pr-3">10-11 years</td><td className="pr-3">30</td><td>28</td></tr>
                      </tbody>
                    </table>
                  </div>
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

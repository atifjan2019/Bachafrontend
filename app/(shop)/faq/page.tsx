import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { getSettings } from "@/lib/api/settings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Info,
  ShoppingBag,
  Truck,
  RefreshCw,
  ShieldCheck,
  Headphones,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Bacha Stylo",
  description:
    "Answers to common questions about Bacha Stylo Fashion — products, orders, delivery, returns, payment, and customer support.",
};

const FAQ_CATEGORIES = [
  {
    id: "general",
    icon: Info,
    title: "General Information",
    items: [
      {
        q: "What is Bacha Stylo Fashion?",
        a: "Bacha Stylo Fashion is a fashion and lifestyle brand offering modern, seasonal, and traditional clothing along with premium accessories at affordable prices.",
      },
      {
        q: "Where is your store located?",
        a: "Our physical store is located in Ouch, Tehsil Adenzai, District Lower Dir, KPK, Pakistan.",
      },
      {
        q: "Do you have an online store?",
        a: "Yes, we operate through our official website and also take orders via WhatsApp and social media platforms.",
      },
    ],
  },
  {
    id: "products",
    icon: ShoppingBag,
    title: "Products & Categories",
    items: [
      {
        q: "What products do you sell?",
        a: "We offer a wide range of fashion products including coats, waistcoats, Chitrali pakol, Swati shawls, footwear, perfumes, watches, caps, beauty & personal care, and other accessories.",
      },
      {
        q: "Do you offer seasonal collections?",
        a: "Yes, we regularly launch seasonal collections according to weather and fashion trends.",
      },
      {
        q: "Are your products local or imported?",
        a: "We offer a mix of carefully selected local and quality-based imported fashion items.",
      },
    ],
  },
  {
    id: "orders",
    icon: Truck,
    title: "Orders & Delivery",
    items: [
      {
        q: "How can I place an order?",
        a: "You can place orders through our website, WhatsApp, or official social media pages.",
      },
      {
        q: "Do you offer Cash on Delivery?",
        a: "Yes, Cash on Delivery (COD) is available for most locations in Pakistan.",
      },
      {
        q: "How long does delivery take?",
        a: "Delivery usually takes 3 to 7 working days depending on your location.",
      },
    ],
  },
  {
    id: "returns",
    icon: RefreshCw,
    title: "Returns & Exchanges",
    items: [
      {
        q: "Do you offer returns or exchanges?",
        a: "Yes, we offer exchange in case of size issues, wrong item delivery, or damaged products.",
      },
      {
        q: "What is the time limit for exchange?",
        a: "Exchange requests must be made within a limited time after receiving the order.",
      },
      {
        q: "Are all products eligible for return?",
        a: "Only eligible items under our policy can be exchanged; used or damaged items by the customer are not accepted.",
      },
    ],
  },
  {
    id: "payment",
    icon: ShieldCheck,
    title: "Payment & Trust",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Cash on Delivery (COD) and other available online payment methods when required.",
      },
      {
        q: "Is online shopping safe with Bacha Stylo Fashion?",
        a: "Yes, we ensure safe and reliable transactions with proper order verification before dispatch.",
      },
    ],
  },
  {
    id: "support",
    icon: Headphones,
    title: "Customer Support",
    items: [
      {
        q: "How can I contact you?",
        a: "You can contact us via WhatsApp, social media pages, or our website support section.",
      },
      {
        q: "Do you respond quickly to queries?",
        a: "Yes, we aim to respond as quickly as possible during business hours to assist customers efficiently.",
      },
    ],
  },
];

export default async function FaqPage() {
  const settings = await getSettings().catch(() => null);
  const waNumber = settings?.whatsapp_number?.replace(/[^0-9]/g, "");
  const waHref = waNumber ? `https://wa.me/${waNumber}` : "/contact";

  return (
    <div className="flex flex-col bg-white">
      <PageHero
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about shopping with Bacha Stylo — products, orders, delivery, returns, payment, and support."
        variant="dark"
        align="center"
      />

      <div className="container-shop py-16 lg:py-24">
        <div className="flex gap-10 lg:gap-16">
          {/* Category index (desktop) */}
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-28">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                Categories
              </p>
              <nav className="space-y-1">
                {FAQ_CATEGORIES.map((cat) => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-ink-70 transition-colors hover:bg-ink-5 hover:text-brand-black"
                  >
                    <cat.icon className="h-4 w-4 shrink-0 text-brand-red" strokeWidth={1.75} />
                    {cat.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Accordion sections */}
          <div className="min-w-0 flex-1 space-y-14 lg:space-y-20">
            {/* Category chips (mobile) */}
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
              {FAQ_CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="whitespace-nowrap border border-ink-10 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-70 transition-colors hover:border-brand-red hover:text-brand-red"
                >
                  {cat.title}
                </a>
              ))}
            </div>

            {FAQ_CATEGORIES.map((cat) => (
              <section key={cat.id} id={cat.id} className="scroll-mt-28">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-brand-red/50 text-brand-red">
                    <cat.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-brand-black sm:text-3xl">
                    {cat.title}
                  </h2>
                </div>

                <Accordion type="multiple" className="border-t border-ink-10">
                  {cat.items.map((item, i) => (
                    <AccordionItem key={i} value={`${cat.id}-${i}`} className="border-ink-10">
                      <AccordionTrigger className="py-5 text-base font-semibold sm:text-[17px]">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="max-w-2xl pb-5 text-[15px] leading-relaxed text-ink-70">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Still need help CTA */}
      <section className="relative overflow-hidden bg-brand-black py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,29,37,0.2)_0%,transparent_60%)]" />
        <div className="container-shop relative mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tightest sm:text-4xl">
            Still have <span className="italic text-brand-red">questions?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/70">
            Our team is here to help. Reach out and we&apos;ll get back to you as quickly as we can.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={waHref}
              {...(waNumber ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex w-full items-center justify-center gap-2 bg-[#25D366] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 border-2 border-white/40 px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-brand-red hover:text-brand-red sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

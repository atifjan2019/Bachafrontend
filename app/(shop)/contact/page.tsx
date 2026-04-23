import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle, Clock, ArrowUpRight, Plus } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { getSettings, type Settings } from "@/lib/api/settings";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Contact — Bacha Stylo",
  description: "Get in touch with the Bacha Stylo team. We're here to help.",
};

export default async function ContactPage() {
  const settings = await getSettings().catch((): Settings => ({} as Settings));

  const email = settings.business_email || "hello@bachastylo.pk";
  const whatsapp = settings.whatsapp_number || "+92 300 1234 567";
  const phone = settings.business_phone || "+92 300 1234 567";
  const address = settings.business_address || "Gulberg III, Lahore";

  return (
    <div className="flex flex-col bg-white">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] sm:min-h-[60vh] lg:min-h-[70vh] overflow-hidden bg-brand-black text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,29,37,0.35)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(232,29,37,0.2)_0%,transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-red via-brand-red/50 to-transparent" />

        <div className="relative h-full flex flex-col justify-center container-shop py-20 sm:py-24 lg:py-32 min-h-[55vh] sm:min-h-[60vh] lg:min-h-[70vh]">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-10 bg-brand-red" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-brand-red font-bold">
              Contact Us
            </span>
          </div>
          <h1 className="font-display font-bold tracking-tightest leading-[0.94] text-[clamp(2.5rem,9vw,8rem)] text-white">
            Let&apos;s
            <br />
            <span className="italic text-brand-red">talk.</span>
          </h1>
          <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl leading-relaxed">
            Have a question about sizing, an order, or a wholesale enquiry? We&apos;re here to help
            — usually within a few hours.
          </p>
        </div>
      </section>

      {/* ─── QUICK CONTACT CARDS ─── */}
      <section className="relative -mt-12 sm:-mt-16 lg:-mt-20 z-10">
        <div className="container-shop">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 bg-white border border-ink-10 shadow-deep">
            <ContactCard
              icon={<Mail className="h-5 w-5" strokeWidth={2} />}
              title="Email"
              info={email}
              sub="For general enquiries"
              href={`mailto:${email}`}
              index={1}
            />
            <ContactCard
              icon={<MessageCircle className="h-5 w-5" strokeWidth={2} />}
              title="WhatsApp"
              info={whatsapp}
              sub="Fastest way to reach us"
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
              index={2}
            />
            <ContactCard
              icon={<Phone className="h-5 w-5" strokeWidth={2} />}
              title="Call Us"
              info={phone}
              sub="Mon–Sat, 10am – 7pm"
              href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
              index={3}
            />
            <ContactCard
              icon={<MapPin className="h-5 w-5" strokeWidth={2} />}
              title="Visit Us"
              info={address}
              sub="By appointment only"
              index={4}
            />
          </div>
        </div>
      </section>

      {/* ─── FORM SECTION ─── */}
      <section className="py-20 sm:py-24 lg:py-36 bg-white">
        <div className="container-shop grid lg:grid-cols-5 gap-12 lg:gap-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="h-[2px] w-8 sm:w-10 bg-brand-red" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-brand-red font-bold">
                Send a Message
              </span>
            </div>
            <h2 className="font-display font-bold tracking-tightest leading-[0.98] text-4xl sm:text-5xl lg:text-6xl text-brand-black">
              Drop us
              <br />
              <span className="italic text-brand-red">a note.</span>
            </h2>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-ink-70 leading-relaxed max-w-lg">
              Fill out the form and our team will get back to you within one working day. For
              urgent queries, WhatsApp is the quickest route.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4 group">
                <div className="h-11 w-11 border-2 border-brand-red text-brand-red group-hover:bg-brand-red group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                  <Clock className="h-4 w-4" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-brand-red font-bold mb-0.5">
                    Response Time
                  </p>
                  <p className="text-sm text-ink-70">Under 24 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="h-11 w-11 border-2 border-brand-red text-brand-red group-hover:bg-brand-red group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                  <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-brand-red font-bold mb-0.5">
                    WhatsApp
                  </p>
                  <p className="text-sm text-ink-70">Usually within minutes</p>
                </div>
              </div>
            </div>

            {/* Dark framed image accent */}
            <div className="hidden lg:block mt-14 relative">
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-brand-red" />
              <div className="bg-brand-black p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(232,29,37,0.25)_0%,transparent_55%)]" />
                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-brand-red font-bold mb-3">
                    For Wholesale
                  </p>
                  <p className="font-display text-xl font-bold text-white leading-tight mb-2">
                    Stocking Bacha Stylo?
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Email <a href={`mailto:${email}`} className="text-brand-red hover:underline">{email}</a> with
                    subject &ldquo;Wholesale&rdquo; for our line sheet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="relative">
              <div className="absolute -top-3 -right-3 hidden sm:block">
                <div className="bg-brand-red text-white px-4 py-2 text-[10px] uppercase tracking-[0.22em] font-bold shadow-red-glow">
                  We reply fast
                </div>
              </div>
              <div className="border-2 border-brand-black bg-white p-6 sm:p-8 lg:p-12 shadow-deep">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="relative bg-brand-black text-white overflow-hidden py-20 sm:py-24 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,29,37,0.18)_0%,transparent_55%)]" />

        <div className="container-shop relative">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-[2px] w-8 bg-brand-red" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-brand-red font-bold">
                FAQ
              </span>
              <span className="h-[2px] w-8 bg-brand-red" />
            </div>
            <h2 className="font-display font-bold tracking-tightest leading-[1.02] text-4xl sm:text-5xl lg:text-6xl text-white">
              Frequently asked
              <br />
              <span className="italic text-brand-red">questions.</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-white/10 border-y border-white/10">
            <Faq
              q="How long does shipping take?"
              a="We deliver nationwide in 2–5 working days. Orders placed before 2 pm are dispatched the same day."
              index={1}
            />
            <Faq
              q="What's your return policy?"
              a="Unworn, tagged items can be returned within 14 days. We'll arrange a free reverse pickup."
              index={2}
            />
            <Faq
              q="Do you accept cash on delivery?"
              a="Yes — COD, JazzCash, Easypaisa, and all major debit and credit cards."
              index={3}
            />
            <Faq
              q="Can I request a specific size?"
              a="If a size is out of stock, email us. We restock regularly and can often stitch to order."
              index={4}
            />
            <Faq
              q="Do you ship internationally?"
              a="Not yet, but we're working on it. Subscribe to our newsletter for updates when international shipping launches."
              index={5}
            />
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <Link
              href="/refund"
              className="group inline-flex items-center gap-2 text-brand-red font-bold text-[11px] sm:text-[13px] uppercase tracking-[0.22em] hover:gap-3 transition-all"
            >
              View full refund policy
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  info,
  sub,
  href,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  info: string;
  sub: string;
  href?: string;
  index: number;
}) {
  const content = (
    <div className="group relative h-full p-6 sm:p-8 bg-white hover:bg-brand-black transition-all duration-500 overflow-hidden">
      <div className="absolute top-0 left-0 h-1 w-0 bg-brand-red group-hover:w-full transition-all duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5 sm:mb-6">
          <div className="h-12 w-12 sm:h-14 sm:w-14 border-2 border-brand-red text-brand-red group-hover:bg-brand-red group-hover:text-white flex items-center justify-center transition-colors">
            {icon}
          </div>
          <span className="text-[10px] uppercase tracking-[0.22em] text-ink-30 font-bold group-hover:text-brand-red transition-colors">
            0{index}
          </span>
        </div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-brand-red font-bold mb-2">
          {title}
        </p>
        <p className="text-sm sm:text-base font-bold text-brand-black group-hover:text-white transition-colors break-words">
          {info}
        </p>
        <p className="mt-1.5 text-xs text-ink-50 group-hover:text-white/60 transition-colors">
          {sub}
        </p>
        {href && (
          <div className="mt-4 sm:mt-6 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-black group-hover:text-brand-red transition-colors">
            Connect
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:rotate-45"
              strokeWidth={2.5}
            />
          </div>
        )}
      </div>
    </div>
  );

  const wrapperClass =
    "h-full border-ink-10 border-b sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(n+3)]:border-t lg:[&:nth-child(2n)]:border-l-0 lg:[&:not(:first-child)]:border-l lg:border-b-0 sm:last:border-b-0";

  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`block ${wrapperClass}`}
    >
      {content}
    </a>
  ) : (
    <div className={wrapperClass}>{content}</div>
  );
}

function Faq({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <details className="group py-6 sm:py-8">
      <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
        <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
          <span className="text-[10px] uppercase tracking-[0.22em] text-brand-red font-bold pt-1 shrink-0">
            0{index}
          </span>
          <h3 className="font-display text-lg sm:text-2xl font-bold text-white group-hover:text-brand-red transition-colors tracking-tight">
            {q}
          </h3>
        </div>
        <div className="h-8 w-8 shrink-0 border border-white/20 flex items-center justify-center group-hover:border-brand-red group-hover:bg-brand-red transition-colors mt-0.5">
          <Plus className="h-4 w-4 text-white transition-transform duration-300 group-open:rotate-45" strokeWidth={2.5} />
        </div>
      </summary>
      <div className="mt-4 sm:mt-5 pl-0 sm:pl-12 text-base sm:text-lg text-white/70 leading-relaxed">
        {a}
      </div>
    </details>
  );
}

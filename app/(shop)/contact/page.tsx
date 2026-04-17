import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle, Clock, ArrowRight } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { PageHero } from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "Contact — Bacha Stylo",
  description: "Get in touch with the Bacha Stylo team. We're here to help.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Contact us"
        title="Let's talk."
        subtitle="Have a question about sizing, an order, or a wholesale enquiry? We're here to help and usually reply within a few hours."
        variant="dark"
        align="center"
      />

      {/* Quick-contact cards */}
      <section className="container-shop -mt-10 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ContactCard
            icon={<Mail className="h-5 w-5" />}
            title="Email us"
            info="hello@bachastylo.pk"
            sub="For general enquiries"
          />
          <ContactCard
            icon={<MessageCircle className="h-5 w-5" />}
            title="WhatsApp"
            info="+92 300 1234 567"
            sub="Fastest way to reach us"
          />
          <ContactCard
            icon={<Phone className="h-5 w-5" />}
            title="Call us"
            info="+92 300 1234 567"
            sub="Mon–Sat, 10 am – 7 pm"
          />
          <ContactCard
            icon={<MapPin className="h-5 w-5" />}
            title="Visit us"
            info="Gulberg III, Lahore"
            sub="By appointment only"
          />
        </div>
      </section>

      {/* Form section */}
      <section className="container-shop py-20 lg:py-28">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          <div className="lg:col-span-2">
            <span className="eyebrow">Send a message</span>
            <h2 className="mt-4 font-display text-3xl lg:text-4xl text-brand-black tracking-tightest">
              Drop us a note.
            </h2>
            <p className="mt-4 text-sm text-ink-50 leading-relaxed">
              Fill out the form and our team will get back to you within one working day. For urgent
              queries, WhatsApp is the quickest route.
            </p>
            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-3 text-sm text-ink-70">
                <Clock className="h-4 w-4 text-ink-30" />
                <span>Response time: under 24 hours</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-ink-70">
                <MessageCircle className="h-4 w-4 text-ink-30" />
                <span>WhatsApp replies: usually within minutes</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-ink-10 bg-white p-6 sm:p-10 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink-10 bg-surface-soft">
        <div className="container-shop py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 font-display text-3xl lg:text-4xl text-brand-black tracking-tightest">
              Frequently asked questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto grid gap-0 divide-y divide-ink-10">
            <Faq
              q="How long does shipping take?"
              a="We deliver nationwide in 2–5 working days. Orders placed before 2 pm are dispatched the same day."
            />
            <Faq
              q="What's your return policy?"
              a="Unworn, tagged items can be returned within 14 days. We'll arrange a free reverse pickup."
            />
            <Faq
              q="Do you accept cash on delivery?"
              a="Yes — COD, JazzCash, Easypaisa, and all major debit/credit cards."
            />
            <Faq
              q="Can I request a specific size?"
              a="If a size is out of stock, email us. We restock regularly and can often stitch to order."
            />
            <Faq
              q="Do you ship internationally?"
              a="Not yet, but we're working on it. Sign up for updates and we'll let you know when international shipping launches."
            />
          </div>
          <div className="text-center mt-12">
            <Link
              href="/refund"
              className="inline-flex items-center gap-1 text-sm text-ink-70 hover:text-brand-black"
            >
              View full refund policy <ArrowRight className="h-4 w-4" />
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
}: {
  icon: React.ReactNode;
  title: string;
  info: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-ink-10 bg-white p-6 shadow-sm">
      <div className="h-10 w-10 rounded-full bg-surface-soft flex items-center justify-center text-brand-black mb-4">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-brand-black">{title}</h3>
      <p className="mt-1 text-sm text-ink-70 font-medium">{info}</p>
      <p className="mt-0.5 text-xs text-ink-50">{sub}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="py-6">
      <h3 className="font-medium text-brand-black">{q}</h3>
      <p className="mt-2 text-sm text-ink-50 leading-relaxed">{a}</p>
    </div>
  );
}

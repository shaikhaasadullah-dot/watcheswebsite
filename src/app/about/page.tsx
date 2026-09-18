import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Watches World is a small house of watchmakers and designers making great watches accessible to everyone.",
};

const stats = [
  { n: "2014", l: "Founded" },
  { n: "12k+", l: "Happy customers" },
  { n: "5", l: "Partner brands" },
  { n: "4.8", l: "Average rating" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-ink py-28 text-ivory">
        <Image
          src="https://images.pexels.com/photos/8327880/pexels-photo-8327880.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Watchmaker at the bench"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-ink" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="animate-fade-up text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-light">Our story</p>
          <h1 className="animate-fade-up mt-4 font-display text-5xl font-medium leading-tight sm:text-7xl [animation-delay:150ms]">
            A good watch shouldn&apos;t require a trust fund.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="font-display text-3xl leading-snug sm:text-4xl">
              Watches World started in a one-room workshop with a simple frustration: the watches we wanted to wear
              were either overpriced or under-built.
            </p>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-base leading-relaxed text-stone">
            <p>
              So we did what watchmakers do. We took things apart. We learned which movements really keep time, which
              crystals really resist scratches and which straps really last. Then we partnered with five independent
              houses — Aurelle, Halvorsen, Kestrel, Nord &amp; Co and Vektor — whose values matched ours.
            </p>
            <p>
              Today, every watch we sell passes through our own bench. We regulate it, pressure-test it and photograph
              it in our studio, so what you see online is what lands on your wrist. Whether you&apos;re fifteen and
              buying your first, or sixty and choosing the one you&apos;ll pass on, we&apos;ll treat it with the same
              care.
            </p>
          </Reveal>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-6 border-y border-sand/70 py-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 80} className="text-center">
              <p className="font-display text-5xl text-gold-dark">{s.n}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-stone">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="craft" className="bg-cream/60 py-20 scroll-mt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">Craftsmanship</p>
            <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">Six checks before it ships</h2>
            <ol className="mt-8 space-y-4">
              {[
                ["Timing", "Regulated on a timegrapher to within brand tolerance."],
                ["Pressure", "Every water-resistant case is wet-tested to its rating."],
                ["Crystal", "Inspected under magnification for inclusions or scratches."],
                ["Strap & clasp", "Fitted, cycled and checked for alignment."],
                ["Movement", "Hand-wound, set and observed for 24 hours."],
                ["Presentation", "Polished, boxed and signed by the technician."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="font-display text-2xl text-gold-dark">0{i + 1}</span>
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="text-sm text-stone">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={120} className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="https://images.pexels.com/photos/8327876/pexels-photo-8327876.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Fixing a watch movement"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="service" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 scroll-mt-24">
        <Reveal className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">Service</p>
          <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">Shipping, returns &amp; warranty</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["Shipping", "Complimentary tracked shipping on orders over $200. Express and white-glove courier options at checkout. We ship to 40+ countries, duties included."],
            ["Returns", "30 days to change your mind, no questions asked. Return label included in the box. Refunds processed within 3 business days of receipt."],
            ["Warranty", "Two years on movement and case, covering manufacturing defects. Our bench also offers lifetime servicing at preferential rates."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 100} className="rounded-sm border border-sand/70 p-8">
              <h3 className="font-display text-3xl">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">{d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <p className="text-sm text-stone">Questions? Write to us at hello@watchesworld.example — a real watchmaker replies.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-sm bg-ink px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition hover:bg-gold hover:text-ink"
          >
            Explore the collection <ArrowRight />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

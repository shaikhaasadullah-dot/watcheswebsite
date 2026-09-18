import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, GemIcon, RefreshIcon, ShieldIcon, TruckIcon } from "@/components/ui/icons";
import { StarRating } from "@/components/ui/star-rating";
import { getCollections, getFeaturedProducts, getNewArrivals } from "@/lib/queries";

export const dynamic = "force-dynamic";

const chapters = [
  {
    label: "Ages 15–25",
    title: "The First Watch",
    copy: "Light, affordable and impossible to outgrow. Minimalist quartz and smart pieces that survive school, sport and first jobs.",
    href: "/shop?maxPrice=350&sort=price-asc",
    image: "https://images.pexels.com/photos/6612230/pexels-photo-6612230.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    label: "Ages 25–40",
    title: "The Everyday Watch",
    copy: "One watch for the office, the gym and the weekend. Automatic sports models and versatile steel that handle all of it.",
    href: "/shop?collection=sport",
    image: "https://images.pexels.com/photos/30509139/pexels-photo-30509139.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    label: "Ages 40–60",
    title: "The Signature Watch",
    copy: "Mechanical chronographs and hand-finished dress watches. The piece you'll be known for, and eventually pass on.",
    href: "/shop?collection=heritage",
    image: "https://images.pexels.com/photos/20818925/pexels-photo-20818925.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];

const testimonials = [
  {
    quote: "I bought my first 'real' watch here at 19 and my father's retirement gift here at 58. Same care both times.",
    author: "Nathan R.",
    detail: "Customer since 2019",
  },
  {
    quote: "The photography is honest, the descriptions are accurate and the watch arrived in a box nicer than most jewellers'.",
    author: "Camille D.",
    detail: "Verified buyer · Tidewater Diver",
  },
  {
    quote: "Returns were painless when I swapped sizes. I've now recommended Watches World to half my office.",
    author: "Ibrahim S.",
    detail: "Verified buyer · Azure Automatic",
  },
];

export default async function HomePage() {
  const [collections, featured, arrivals] = await Promise.all([
    getCollections(),
    getFeaturedProducts(8),
    getNewArrivals(4),
  ]);

  return (
    <div className="-mt-16 lg:-mt-20">
      {/* HERO */}
      <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-ink text-ivory">
        <Image
          src="/images/hero.jpg"
          alt="Automatic wristwatch with a midnight-blue dial on slate stone"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-40 sm:px-6 lg:pb-28">
          <p className="animate-fade-up text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-light [animation-delay:100ms]">
            Spring/Summer 2026 Collection
          </p>
          <h1 className="animate-fade-up mt-5 max-w-3xl font-display text-5xl font-medium leading-[1.02] sm:text-7xl lg:text-8xl [animation-delay:250ms]">
            Time, worn <span className="italic text-gold-light">beautifully.</span>
          </h1>
          <p className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg [animation-delay:400ms]">
            Dress, dive, minimalist and smart — a curated house of timepieces for every wrist and every chapter, from
            fifteen to sixty and beyond.
          </p>
          <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-4 [animation-delay:550ms]">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 rounded-sm bg-ivory px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition hover:bg-gold"
            >
              Shop the collection
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/shop?collection=heritage"
              className="link-underline text-xs font-semibold uppercase tracking-[0.2em] text-ivory/90"
            >
              Explore Heritage
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 right-6 hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-ivory/50 lg:flex">
          <span className="h-px w-10 bg-ivory/30" /> Scroll
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-sand/70 bg-cream py-4">
        <div className="animate-marquee flex w-max gap-14 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.3em] text-stone">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-14">
              {["Aurelle", "Halvorsen", "Kestrel", "Nord & Co", "Vektor", "Swiss & Japanese movements", "Sapphire crystal", "2-year warranty", "Worldwide shipping"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-14">
                    {t} <span className="h-1 w-1 rounded-full bg-gold" />
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">Collections</p>
            <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">Four houses, one standard.</h2>
          </div>
          <Link href="/shop" className="link-underline text-xs font-semibold uppercase tracking-[0.2em]">
            View all watches
          </Link>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-12">
          {collections.map((c, i) => {
            const span = i === 0 ? "md:col-span-7 md:row-span-2" : i === 1 ? "md:col-span-5" : "md:col-span-5";
            const aspect = i === 0 ? "aspect-[4/5] md:aspect-auto md:min-h-[640px]" : "aspect-[16/10]";
            return (
              <Reveal key={c.id} delay={i * 90} className={`${span}`}>
                <Link
                  href={`/shop?collection=${c.slug}`}
                  className={`group relative block ${aspect} overflow-hidden rounded-sm bg-ink`}
                >
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-ivory sm:p-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-light">
                      {c.tagline}
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-medium sm:text-4xl">{c.name}</h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] opacity-80 transition group-hover:gap-3 group-hover:opacity-100">
                      Discover <ArrowRight />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-cream/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">Featured</p>
            <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">This season&apos;s most-wanted</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-stone">
              Chosen by our watchmakers and loved by thousands of customers. Each one ships in a signed presentation box.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 80}>
                <ProductCard product={p} priority={i < 4} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 rounded-sm border border-ink px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-ink hover:text-ivory"
            >
              Shop all watches <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="https://images.pexels.com/photos/8327977/pexels-photo-8327977.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Watchmaker assembling a movement"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-56 overflow-hidden rounded-sm border-8 border-ivory shadow-2xl sm:block">
              <div className="relative aspect-square">
                <Image
                  src="https://images.pexels.com/photos/1401847/pexels-photo-1401847.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Mechanical movement detail"
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">Our Promise</p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-tight sm:text-5xl">
              Every watch is inspected on the bench before it&apos;s inspected on your wrist.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              We&apos;re a small team of watchmakers and designers who believe a good watch shouldn&apos;t require a
              trust fund. Each piece is regulated, pressure-tested and photographed in our own studio, so what you
              see is exactly what arrives.
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                { icon: ShieldIcon, title: "2-year warranty", copy: "Movement and case covered, no fine print." },
                { icon: TruckIcon, title: "Free shipping over $200", copy: "Tracked, insured, signed on arrival." },
                { icon: RefreshIcon, title: "30-day returns", copy: "Changed your mind? Send it back, on us." },
                { icon: GemIcon, title: "Authenticity guaranteed", copy: "Every watch ships with its papers." },
              ].map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span className="mt-0.5 text-gold-dark">
                    <f.icon />
                  </span>
                  <div>
                    <p className="font-semibold">{f.title}</p>
                    <p className="text-sm text-stone">{f.copy}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] link-underline"
            >
              Read our story <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CHAPTERS */}
      <section className="bg-ink py-24 text-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-light">For every chapter</p>
            <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">
              A watch for fifteen. A watch for sixty. And every year in between.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {chapters.map((ch, i) => (
              <Reveal key={ch.title} delay={i * 120}>
                <Link href={ch.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                    <Image
                      src={ch.image}
                      alt={ch.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                    <span className="absolute left-5 top-5 rounded-full border border-ivory/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur">
                      {ch.label}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl">{ch.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/60">{ch.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light transition group-hover:gap-3">
                    Shop the edit <ArrowRight />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">Just landed</p>
            <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">New arrivals</h2>
          </div>
          <Link href="/shop?sort=newest" className="link-underline text-xs font-semibold uppercase tracking-[0.2em]">
            See what&apos;s new
          </Link>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {arrivals.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-sand/70 bg-cream/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <StarRating rating={4.8} size={18} className="justify-center" />
            <h2 className="mt-4 font-display text-4xl font-medium sm:text-5xl">Rated 4.8 by 12,000+ customers</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 100}>
                <figure className="flex h-full flex-col rounded-sm border border-sand/70 bg-ivory p-8">
                  <span className="font-display text-6xl leading-none text-gold">&ldquo;</span>
                  <blockquote className="-mt-4 flex-1 font-display text-xl leading-relaxed">{t.quote}</blockquote>
                  <figcaption className="mt-6 text-sm">
                    <span className="font-semibold">{t.author}</span>
                    <span className="block text-xs text-stone">{t.detail}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-sm bg-ink px-6 py-20 text-center text-ivory sm:px-12">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
          <p className="relative text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-light">
            Not sure where to start?
          </p>
          <h2 className="relative mt-4 font-display text-4xl font-medium sm:text-6xl">
            Find the watch that fits your life.
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-sm text-ivory/70">
            Filter by style, size, movement and budget — or write to our watchmakers for a personal recommendation.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="rounded-sm bg-gold px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition hover:bg-gold-light"
            >
              Start browsing
            </Link>
            <Link
              href="/about"
              className="rounded-sm border border-ivory/40 px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-ivory hover:text-ink"
            >
              Talk to an expert
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

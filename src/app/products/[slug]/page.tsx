import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/product/add-to-cart";
import { Gallery } from "@/components/product/gallery";
import { ProductCard } from "@/components/product/product-card";
import { Reviews } from "@/components/product/reviews";
import { Reveal } from "@/components/ui/reveal";
import { StarRating } from "@/components/ui/star-rating";
import { GemIcon, RefreshIcon, ShieldIcon, TruckIcon } from "@/components/ui/icons";
import { formatPrice, genderLabel, styleLabel } from "@/lib/format";
import { getProductBySlug, getProductReviews, getRelatedProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Watch not found" };
  return {
    title: `${product.name} by ${product.brand}`,
    description: product.shortDescription,
    openGraph: { images: [{ url: product.images[0] }] },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [reviews, related] = await Promise.all([getProductReviews(product.id), getRelatedProducts(product, 4)]);
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const badges = [product.isNew ? "New" : null, onSale ? "Sale" : null].filter(Boolean) as string[];

  const specs: [string, string][] = [
    ["Movement", product.movement],
    ["Case size", product.caseSize],
    ["Case material", product.caseMaterial],
    ["Strap", product.strapMaterial],
    ["Dial", product.dialColor],
    ["Water resistance", product.waterResistance],
    ["Style", styleLabel(product.style)],
    ["Designed for", genderLabel(product.gender)],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6">
      <nav className="text-[11px] uppercase tracking-[0.2em] text-stone" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-ink">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/shop?collection=${product.collectionSlug}`} className="hover:text-ink">
          {product.collectionName}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="animate-fade-in">
          <Gallery images={product.images} name={product.name} badges={badges} />
        </div>

        <div className="animate-fade-up lg:sticky lg:top-28 lg:self-start">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">{product.brand}</p>
          <h1 className="mt-2 font-display text-5xl font-medium leading-[1.05] sm:text-6xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a href="#reviews" className="inline-flex items-center gap-2 hover:opacity-80">
              <StarRating rating={product.rating} size={14} />
              <span className="text-xs text-stone underline-offset-4 hover:underline">
                {product.reviewCount} {product.reviewCount === 1 ? "review" : "reviews"}
              </span>
            </a>
            <span className="text-xs text-stone">·</span>
            <span className="text-xs uppercase tracking-[0.15em] text-stone">{product.collectionName}</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl">{formatPrice(product.price)}</span>
            {onSale && (
              <>
                <span className="text-lg text-stone line-through">{formatPrice(product.compareAtPrice!)}</span>
                <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink">
                  Save {formatPrice(product.compareAtPrice! - product.price)}
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-stone">or 4 interest-free payments of {formatPrice(Math.round(product.price / 4))}</p>

          <p className="mt-6 text-base leading-relaxed text-ink/80">{product.shortDescription}</p>

          <div className="mt-8">
            <AddToCart product={product} />
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-4 border-y border-sand/70 py-6 text-xs">
            {[
              { icon: TruckIcon, text: "Free shipping over $200" },
              { icon: RefreshIcon, text: "30-day free returns" },
              { icon: ShieldIcon, text: "2-year warranty" },
              { icon: GemIcon, text: "Authenticity papers" },
            ].map((f) => (
              <li key={f.text} className="flex items-center gap-2.5 text-ink/80">
                <f.icon className="text-gold-dark" width={18} height={18} /> {f.text}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone">Highlights</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.features.map((f) => (
                <li key={f} className="rounded-full border border-sand px-3 py-1.5 text-xs">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Description + specs */}
      <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">The story</p>
          <h2 className="mt-3 font-display text-4xl font-medium">Designed to be worn, not kept in a drawer.</h2>
          <p className="mt-6 text-base leading-relaxed text-ink/80">{product.description}</p>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">Specifications</p>
          <dl className="mt-5 divide-y divide-sand/70 border-y border-sand/70">
            {specs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[140px_1fr] gap-4 py-3.5 text-sm">
                <dt className="text-stone">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="mt-24">
        <Reviews productId={product.id} reviews={reviews} rating={product.rating} />
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <Reveal className="flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">You may also like</p>
              <h2 className="mt-3 font-display text-4xl font-medium">Complete the collection</h2>
            </div>
            <Link
              href={`/shop?collection=${product.collectionSlug}`}
              className="link-underline hidden text-xs font-semibold uppercase tracking-[0.2em] sm:inline"
            >
              View {product.collectionName}
            </Link>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

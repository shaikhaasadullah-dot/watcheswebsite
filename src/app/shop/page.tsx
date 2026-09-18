import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProductCard } from "@/components/product/product-card";
import { Filters } from "@/components/shop/filters";
import { SortSelect } from "@/components/shop/sort-select";
import { getBrands, getCollectionBySlug, getCollections, getPriceBounds, getProducts, type ShopFilters } from "@/lib/queries";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const sp = await searchParams;
  const slug = typeof sp.collection === "string" ? sp.collection : undefined;
  const collection = slug ? await getCollectionBySlug(slug) : null;
  return {
    title: collection ? `${collection.name} Collection` : "Shop All Watches",
    description: collection?.description ?? "Browse our full range of dress, sport, minimalist and smart watches.",
  };
}

function toArray(v: string | string[] | undefined): string[] | undefined {
  if (!v) return undefined;
  return Array.isArray(v) ? v : [v];
}

function toNumber(v: string | string[] | undefined): number | undefined {
  if (typeof v !== "string") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const sortRaw = typeof sp.sort === "string" ? sp.sort : undefined;
  const sort = (["featured", "newest", "price-asc", "price-desc", "rating"] as const).find((s) => s === sortRaw);

  const filters: ShopFilters = {
    collection: typeof sp.collection === "string" ? sp.collection : undefined,
    style: toArray(sp.style),
    gender: toArray(sp.gender),
    brand: toArray(sp.brand),
    minPrice: toNumber(sp.minPrice),
    maxPrice: toNumber(sp.maxPrice),
    q: typeof sp.q === "string" ? sp.q.trim() || undefined : undefined,
    sort,
  };

  const [products, collections, brands, priceBounds] = await Promise.all([
    getProducts(filters),
    getCollections(),
    getBrands(),
    getPriceBounds(),
  ]);
  const activeCollection = filters.collection ? collections.find((c) => c.slug === filters.collection) : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
      <nav className="text-[11px] uppercase tracking-[0.2em] text-stone" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-ink">
          Shop
        </Link>
        {activeCollection && (
          <>
            <span className="mx-2">/</span>
            <span className="text-ink">{activeCollection.name}</span>
          </>
        )}
      </nav>

      <header className="mt-6 max-w-3xl animate-fade-up">
        <h1 className="font-display text-5xl font-medium sm:text-6xl">
          {filters.q ? (
            <>
              Results for <span className="italic text-gold-dark">&ldquo;{filters.q}&rdquo;</span>
            </>
          ) : (
            activeCollection?.name ?? "All Watches"
          )}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-stone sm:text-base">
          {activeCollection?.description ??
            "Every timepiece in the house — dress, dive, minimalist and smart. Filter by style, budget and brand, or simply scroll."}
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <Suspense>
          <Filters collections={collections} brands={brands} priceBounds={priceBounds} resultCount={products.length} />
        </Suspense>

        <section>
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-sand/70 pb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-stone">
              {products.length} {products.length === 1 ? "watch" : "watches"}
            </p>
            <Suspense>
              <SortSelect />
            </Suspense>
          </div>

          {products.length === 0 ? (
            <div className="rounded-sm border border-dashed border-sand py-24 text-center">
              <p className="font-display text-3xl">No watches match those filters</p>
              <p className="mt-2 text-sm text-stone">Try widening your price range or clearing a filter or two.</p>
              <Link
                href="/shop"
                className="mt-6 inline-block rounded-sm bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ivory"
              >
                View all watches
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 xl:grid-cols-3">
              {products.map((p, i) => (
                <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
                  <ProductCard product={p} priority={i < 6} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

import { db } from "@/db";
import { collections, products, reviews } from "@/db/schema";
import { collectionSeeds, productSeeds, reviewsForProduct } from "@/db/seed-data";
import { count } from "drizzle-orm";

let seedPromise: Promise<void> | null = null;

async function runSeed() {
  const [{ value }] = await db.select({ value: count() }).from(products);
  if (Number(value) > 0) return;

  const insertedCollections = await db
    .insert(collections)
    .values(collectionSeeds)
    .onConflictDoNothing()
    .returning();

  const allCollections =
    insertedCollections.length > 0 ? insertedCollections : await db.select().from(collections);
  const bySlug = new Map(allCollections.map((c) => [c.slug, c.id]));

  const insertedProducts = await db
    .insert(products)
    .values(
      productSeeds.map((p) => ({
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        collectionId: bySlug.get(p.collection)!,
        shortDescription: p.shortDescription,
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? null,
        images: p.images,
        gender: p.gender,
        style: p.style,
        movement: p.movement,
        caseSize: p.caseSize,
        caseMaterial: p.caseMaterial,
        strapMaterial: p.strapMaterial,
        waterResistance: p.waterResistance,
        dialColor: p.dialColor,
        features: p.features,
        stock: p.stock,
        featured: p.featured ?? false,
        isNew: p.isNew ?? false,
      })),
    )
    .onConflictDoNothing()
    .returning();

  const productIdBySlug = new Map(insertedProducts.map((p) => [p.slug, p.id]));
  const now = Date.now();
  const reviewRows = productSeeds.flatMap((p, idx) => {
    const productId = productIdBySlug.get(p.slug);
    if (!productId) return [];
    return reviewsForProduct(p, idx).map((r) => ({
      productId,
      author: r.author,
      location: r.location,
      rating: r.rating,
      title: r.title,
      body: r.body,
      verified: true,
      createdAt: new Date(now - r.daysAgo * 86_400_000),
    }));
  });

  if (reviewRows.length) {
    await db.insert(reviews).values(reviewRows);
  }
}

/** Ensures demo data exists. Safe to call on every request; only seeds once per process. */
export function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = runSeed().catch((err) => {
      seedPromise = null;
      throw err;
    });
  }
  return seedPromise;
}

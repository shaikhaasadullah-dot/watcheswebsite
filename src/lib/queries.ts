import { db } from "@/db";
import { collections, orderItems, orders, products, reviews } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { and, asc, avg, count, desc, eq, gte, ilike, inArray, lte, ne, or, sql } from "drizzle-orm";

export type ProductWithRating = typeof products.$inferSelect & {
  collectionSlug: string;
  collectionName: string;
  rating: number;
  reviewCount: number;
};

export type ShopFilters = {
  collection?: string;
  style?: string[];
  gender?: string[];
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  q?: string;
  sort?: "featured" | "newest" | "price-asc" | "price-desc" | "rating";
};

const ratingSubquery = db
  .select({
    productId: reviews.productId,
    rating: avg(reviews.rating).as("rating"),
    reviewCount: count(reviews.id).as("review_count"),
  })
  .from(reviews)
  .groupBy(reviews.productId)
  .as("ratings");

function baseSelect() {
  return db
    .select({
      product: products,
      collectionSlug: collections.slug,
      collectionName: collections.name,
      rating: sql<string | null>`${ratingSubquery.rating}`,
      reviewCount: sql<number | null>`${ratingSubquery.reviewCount}`,
    })
    .from(products)
    .innerJoin(collections, eq(products.collectionId, collections.id))
    .leftJoin(ratingSubquery, eq(ratingSubquery.productId, products.id));
}

type Row = Awaited<ReturnType<ReturnType<typeof baseSelect>["execute"]>>[number];

function mapRow(r: Row): ProductWithRating {
  return {
    ...r.product,
    collectionSlug: r.collectionSlug,
    collectionName: r.collectionName,
    rating: r.rating ? Math.round(Number(r.rating) * 10) / 10 : 0,
    reviewCount: Number(r.reviewCount ?? 0),
  };
}

export async function getCollections() {
  await ensureSeeded();
  return db.select().from(collections).orderBy(asc(collections.sortOrder));
}

export async function getCollectionBySlug(slug: string) {
  await ensureSeeded();
  const [c] = await db.select().from(collections).where(eq(collections.slug, slug)).limit(1);
  return c ?? null;
}

export async function getFeaturedProducts(limit = 8) {
  await ensureSeeded();
  const rows = await baseSelect().where(eq(products.featured, true)).orderBy(asc(products.id)).limit(limit);
  return rows.map(mapRow);
}

export async function getNewArrivals(limit = 4) {
  await ensureSeeded();
  const rows = await baseSelect().where(eq(products.isNew, true)).orderBy(desc(products.id)).limit(limit);
  return rows.map(mapRow);
}

export async function getProducts(filters: ShopFilters = {}) {
  await ensureSeeded();
  const conds = [];
  if (filters.collection) conds.push(eq(collections.slug, filters.collection));
  if (filters.style?.length) conds.push(inArray(products.style, filters.style));
  if (filters.gender?.length) conds.push(inArray(products.gender, filters.gender));
  if (filters.brand?.length) conds.push(inArray(products.brand, filters.brand));
  if (filters.minPrice != null) conds.push(gte(products.price, filters.minPrice));
  if (filters.maxPrice != null) conds.push(lte(products.price, filters.maxPrice));
  if (filters.q) {
    const term = `%${filters.q}%`;
    conds.push(or(ilike(products.name, term), ilike(products.brand, term), ilike(products.shortDescription, term)));
  }

  const orderBy = (() => {
    switch (filters.sort) {
      case "price-asc":
        return [asc(products.price)];
      case "price-desc":
        return [desc(products.price)];
      case "newest":
        return [desc(products.isNew), desc(products.id)];
      case "rating":
        return [desc(sql`coalesce(${ratingSubquery.rating}, 0)`), desc(sql`coalesce(${ratingSubquery.reviewCount}, 0)`)];
      default:
        return [desc(products.featured), asc(products.id)];
    }
  })();

  const rows = await baseSelect()
    .where(conds.length ? and(...conds) : undefined)
    .orderBy(...orderBy);
  return rows.map(mapRow);
}

export async function getProductBySlug(slug: string) {
  await ensureSeeded();
  const rows = await baseSelect().where(eq(products.slug, slug)).limit(1);
  return rows[0] ? mapRow(rows[0]) : null;
}

export async function getProductReviews(productId: number) {
  return db.select().from(reviews).where(eq(reviews.productId, productId)).orderBy(desc(reviews.createdAt));
}

export async function getRelatedProducts(product: ProductWithRating, limit = 4) {
  const rows = await baseSelect()
    .where(and(eq(products.collectionId, product.collectionId), ne(products.id, product.id)))
    .orderBy(desc(products.featured), asc(products.id))
    .limit(limit);
  if (rows.length >= limit) return rows.map(mapRow);
  const more = await baseSelect()
    .where(and(ne(products.id, product.id), ne(products.collectionId, product.collectionId)))
    .orderBy(desc(products.featured), asc(products.id))
    .limit(limit - rows.length);
  return [...rows, ...more].map(mapRow);
}

export async function getBrands() {
  await ensureSeeded();
  const rows = await db.selectDistinct({ brand: products.brand }).from(products).orderBy(asc(products.brand));
  return rows.map((r) => r.brand);
}

export async function getPriceBounds() {
  await ensureSeeded();
  const [row] = await db
    .select({ min: sql<number>`min(${products.price})`, max: sql<number>`max(${products.price})` })
    .from(products);
  return { min: Number(row?.min ?? 0), max: Number(row?.max ?? 0) };
}

export async function getOrderByNumber(orderNumber: string) {
  const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  if (!order) return null;
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
  return { order, items };
}

import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const productId = Number(body.productId);
  const rating = Number(body.rating);
  const author = String(body.author ?? "").trim();
  const title = String(body.title ?? "").trim();
  const text = String(body.body ?? "").trim();
  const location = body.location ? String(body.location).trim() : null;

  if (!Number.isInteger(productId)) return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  if (!Number.isInteger(rating) || rating < 1 || rating > 5)
    return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
  if (author.length < 2 || author.length > 120) return NextResponse.json({ error: "Please enter your name" }, { status: 400 });
  if (title.length < 3 || title.length > 160) return NextResponse.json({ error: "Please add a headline" }, { status: 400 });
  if (text.length < 20 || text.length > 4000)
    return NextResponse.json({ error: "Review should be at least 20 characters" }, { status: 400 });

  const [product] = await db.select({ id: products.id }).from(products).where(eq(products.id, productId)).limit(1);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const [created] = await db
    .insert(reviews)
    .values({ productId, rating, author, title, body: text, location, verified: false })
    .returning();

  return NextResponse.json({ review: created }, { status: 201 });
}

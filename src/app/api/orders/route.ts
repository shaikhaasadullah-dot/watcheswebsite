import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_METHODS, TAX_RATE } from "@/lib/format";
import { inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type IncomingItem = { productId: number; quantity: number };

function generateOrderNumber() {
  const ts = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `WW-${ts}${rand}`;
}

const required = ["email", "firstName", "lastName", "address1", "city", "region", "postalCode", "country"] as const;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  for (const key of required) {
    if (!body[key] || String(body[key]).trim().length === 0) {
      return NextResponse.json({ error: `Missing ${key}` }, { status: 400 });
    }
  }
  const email = String(body.email).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
  }

  const shippingMethod = SHIPPING_METHODS.find((m) => m.id === body.shippingMethod) ?? SHIPPING_METHODS[0];
  const rawItems = Array.isArray(body.items) ? (body.items as IncomingItem[]) : [];
  const items = rawItems
    .map((i) => ({ productId: Number(i.productId), quantity: Math.floor(Number(i.quantity)) }))
    .filter((i) => Number.isInteger(i.productId) && i.quantity > 0);

  if (items.length === 0) return NextResponse.json({ error: "Your bag is empty" }, { status: 400 });

  const dbProducts = await db
    .select()
    .from(products)
    .where(
      inArray(
        products.id,
        items.map((i) => i.productId),
      ),
    );
  const byId = new Map(dbProducts.map((p) => [p.id, p]));

  const lines: { product: typeof products.$inferSelect; quantity: number }[] = [];
  for (const item of items) {
    const p = byId.get(item.productId);
    if (!p) return NextResponse.json({ error: "One of the items is no longer available" }, { status: 409 });
    if (p.stock < item.quantity)
      return NextResponse.json({ error: `Only ${p.stock} of ${p.name} available` }, { status: 409 });
    lines.push({ product: p, quantity: item.quantity });
  }

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.quantity, 0);
  const shipping = shippingMethod.id === "standard" && subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : shippingMethod.price;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  const result = await db.transaction(async (tx) => {
    const [order] = await tx
      .insert(orders)
      .values({
        orderNumber: generateOrderNumber(),
        email,
        firstName: String(body.firstName).trim(),
        lastName: String(body.lastName).trim(),
        address1: String(body.address1).trim(),
        address2: body.address2 ? String(body.address2).trim() : null,
        city: String(body.city).trim(),
        region: String(body.region).trim(),
        postalCode: String(body.postalCode).trim(),
        country: String(body.country).trim(),
        shippingMethod: shippingMethod.id,
        subtotal,
        shipping,
        tax,
        total,
        status: "confirmed",
      })
      .returning();

    await tx.insert(orderItems).values(
      lines.map((l) => ({
        orderId: order.id,
        productId: l.product.id,
        name: l.product.name,
        brand: l.product.brand,
        slug: l.product.slug,
        image: l.product.images[0],
        unitPrice: l.product.price,
        quantity: l.quantity,
      })),
    );

    for (const l of lines) {
      await tx
        .update(products)
        .set({ stock: l.product.stock - l.quantity })
        .where(inArray(products.id, [l.product.id]));
    }

    return order;
  });

  return NextResponse.json({ orderNumber: result.orderNumber, total }, { status: 201 });
}

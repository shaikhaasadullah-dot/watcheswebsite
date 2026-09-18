import { getProducts, type ShopFilters } from "@/lib/queries";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sp = url.searchParams;
  const sortRaw = sp.get("sort");
  const sort = (["featured", "newest", "price-asc", "price-desc", "rating"] as const).find((s) => s === sortRaw);
  const num = (v: string | null) => (v && Number.isFinite(Number(v)) ? Number(v) : undefined);

  const filters: ShopFilters = {
    collection: sp.get("collection") ?? undefined,
    style: sp.getAll("style"),
    gender: sp.getAll("gender"),
    brand: sp.getAll("brand"),
    minPrice: num(sp.get("minPrice")),
    maxPrice: num(sp.get("maxPrice")),
    q: sp.get("q") ?? undefined,
    sort,
  };
  const products = await getProducts(filters);
  return NextResponse.json({ products, count: products.length });
}

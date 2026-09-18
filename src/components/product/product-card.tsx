"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { StarRating } from "@/components/ui/star-rating";
import { BagIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/format";
import type { ProductWithRating } from "@/lib/queries";

type Props = {
  product: ProductWithRating;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: Props) {
  const { addItem } = useCart();
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const discount = onSale ? Math.round((1 - product.price / product.compareAtPrice!) * 100) : 0;

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-cream"
        aria-label={product.name}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-0"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100"
          />
        )}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory">
              New
            </span>
          )}
          {onSale && (
            <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
              −{discount}%
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addItem({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              brand: product.brand,
              price: product.price,
              image: product.images[0],
              maxStock: product.stock,
            });
          }}
          className="absolute bottom-3 left-3 right-3 flex translate-y-3 items-center justify-center gap-2 rounded-sm bg-ivory/95 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink opacity-0 shadow-lg backdrop-blur transition-all duration-500 hover:bg-ink hover:text-ivory group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
        >
          <BagIcon width={16} height={16} /> Quick add
        </button>
      </Link>

      <div className="mt-4 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone">{product.brand}</p>
            <h3 className="font-display text-xl leading-tight text-ink">
              <Link href={`/products/${product.slug}`} className="hover:text-gold-dark transition-colors">
                {product.name}
              </Link>
            </h3>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
            {onSale && <p className="text-xs text-stone line-through">{formatPrice(product.compareAtPrice!)}</p>}
          </div>
        </div>
        {product.reviewCount > 0 && <StarRating rating={product.rating} count={product.reviewCount} size={12} />}
      </div>
    </article>
  );
}

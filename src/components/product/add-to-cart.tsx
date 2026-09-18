"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import { BagIcon, CheckIcon, MinusIcon, PlusIcon } from "@/components/ui/icons";
import type { ProductWithRating } from "@/lib/queries";

export function AddToCart({ product }: { product: ProductWithRating }) {
  const { addItem, items } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const inCart = items.find((i) => i.productId === product.id)?.quantity ?? 0;
  const remaining = Math.max(0, product.stock - inCart);
  const soldOut = product.stock === 0;

  const onAdd = () => {
    if (soldOut || remaining === 0) return;
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.images[0],
        maxStock: product.stock,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="inline-flex items-center rounded-sm border border-ink">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3.5 py-4 transition hover:bg-cream"
          >
            <MinusIcon />
          </button>
          <span className="w-8 text-center text-sm font-semibold tabular-nums">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={qty >= remaining}
            onClick={() => setQty((q) => Math.min(remaining, q + 1))}
            className="px-3.5 py-4 transition hover:bg-cream disabled:opacity-30"
          >
            <PlusIcon />
          </button>
        </div>
        <button
          type="button"
          onClick={onAdd}
          disabled={soldOut || remaining === 0}
          className={`flex flex-1 items-center justify-center gap-2 rounded-sm py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
            added ? "bg-gold text-ink" : "bg-ink text-ivory hover:bg-gold hover:text-ink"
          }`}
        >
          {added ? (
            <>
              <CheckIcon /> Added to bag
            </>
          ) : soldOut ? (
            "Sold out"
          ) : remaining === 0 ? (
            "Max in bag"
          ) : (
            <>
              <BagIcon width={16} height={16} /> Add to bag
            </>
          )}
        </button>
      </div>
      <p className="text-xs text-stone">
        {soldOut ? (
          "Currently out of stock — join the waitlist below."
        ) : product.stock <= 10 ? (
          <span className="text-gold-dark font-medium">Only {product.stock} left in stock</span>
        ) : (
          "In stock and ready to ship"
        )}
        {inCart > 0 && <span> · {inCart} already in your bag</span>}
      </p>
    </div>
  );
}

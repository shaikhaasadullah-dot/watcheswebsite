"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/cart/cart-context";
import { ArrowRight, CloseIcon, MinusIcon, PlusIcon, TrashIcon } from "@/components/ui/icons";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { isOpen, closeCart, items, subtotal, itemCount, updateQuantity, removeItem, lastAdded } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/50 backdrop-blur-[2px] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-sand/70 px-6 py-5">
          <div>
            <h2 className="font-display text-2xl">Your Bag</h2>
            <p className="text-xs uppercase tracking-[0.18em] text-stone">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full p-2 transition hover:bg-black/5"
          >
            <CloseIcon />
          </button>
        </header>

        {lastAdded && (
          <div className="animate-pop mx-6 mt-4 flex items-center gap-3 rounded-sm border border-gold/40 bg-gold/10 px-4 py-3 text-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-ink">✓</span>
            <span>
              <strong className="font-semibold">{lastAdded.name}</strong> added to your bag
            </span>
          </div>
        )}

        {items.length > 0 && (
          <div className="px-6 pt-5">
            <p className="mb-2 text-xs text-stone">
              {remaining > 0 ? (
                <>
                  Add <strong className="text-ink">{formatPrice(remaining)}</strong> more for complimentary shipping
                </>
              ) : (
                <span className="text-gold-dark font-medium">You&apos;ve unlocked complimentary shipping</span>
              )}
            </p>
            <div className="h-1 w-full overflow-hidden rounded-full bg-sand/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold-light transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="scrollbar-thin flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-sand">
                <svg viewBox="0 0 24 24" width={30} height={30} fill="none" stroke="currentColor" strokeWidth={1.2}>
                  <path d="M6 7h12l1 14H5L6 7Z" />
                  <path d="M9 7V6a3 3 0 0 1 6 0v1" />
                </svg>
              </div>
              <h3 className="font-display text-2xl">Your bag is empty</h3>
              <p className="mt-2 max-w-xs text-sm text-stone">
                Discover timepieces crafted for every wrist, from first watch to forever watch.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-6 rounded-sm bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ivory transition hover:bg-gold hover:text-ink"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-sand/60">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4 py-5">
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={closeCart}
                    className="relative h-28 w-24 shrink-0 overflow-hidden rounded-sm bg-cream"
                  >
                    <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone">{item.brand}</p>
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="font-display text-lg leading-tight hover:text-gold-dark"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center rounded-sm border border-sand">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-2 transition hover:bg-cream"
                        >
                          <MinusIcon />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          disabled={item.quantity >= item.maxStock}
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-2 transition hover:bg-cream disabled:opacity-30"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="inline-flex items-center gap-1 text-xs text-stone transition hover:text-red-700"
                      >
                        <TrashIcon /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-sand/70 bg-cream/60 px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone">Subtotal</span>
              <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-stone">Shipping and taxes calculated at checkout.</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm bg-ink py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition hover:bg-gold hover:text-ink"
            >
              Checkout <ArrowRight />
            </Link>
            <button
              type="button"
              onClick={closeCart}
              className="mt-3 w-full text-center text-xs uppercase tracking-[0.18em] text-stone transition hover:text-ink"
            >
              Continue shopping
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}

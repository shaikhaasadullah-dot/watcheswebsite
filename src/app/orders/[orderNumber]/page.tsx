import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckIcon } from "@/components/ui/icons";
import { SHIPPING_METHODS, formatDate, formatPrice } from "@/lib/format";
import { getOrderByNumber } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Order confirmed" };

export default async function OrderPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params;
  const data = await getOrderByNumber(orderNumber);
  if (!data) notFound();
  const { order, items } = data;
  const method = SHIPPING_METHODS.find((m) => m.id === order.shippingMethod);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-14 sm:px-6">
      <div className="animate-fade-up text-center">
        <span className="animate-pop mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink [animation-delay:200ms]">
          <CheckIcon width={28} height={28} />
        </span>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">Order {order.orderNumber}</p>
        <h1 className="mt-3 font-display text-5xl font-medium sm:text-6xl">Thank you, {order.firstName}.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-stone">
          Your order is confirmed and our watchmakers are preparing it now. A receipt has been sent to{" "}
          <strong className="text-ink">{order.email}</strong>.
        </p>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-[1fr_320px]">
        <section className="animate-fade-up rounded-sm border border-sand/70 bg-cream/40 p-6 [animation-delay:150ms]">
          <h2 className="font-display text-2xl">Your timepieces</h2>
          <ul className="mt-5 divide-y divide-sand/70">
            {items.map((i) => (
              <li key={i.id} className="flex gap-4 py-4">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-cream">
                  <Image src={i.image} alt={i.name} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-stone">{i.brand}</span>
                  <Link href={`/products/${i.slug}`} className="font-display text-xl leading-tight hover:text-gold-dark">
                    {i.name}
                  </Link>
                  <span className="mt-auto text-xs text-stone">Qty {i.quantity}</span>
                </div>
                <span className="text-sm font-semibold">{formatPrice(i.unitPrice * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-sand/70 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone">Subtotal</dt>
              <dd>{formatPrice(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone">Shipping ({method?.label ?? order.shippingMethod})</dt>
              <dd>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone">Tax</dt>
              <dd>{formatPrice(order.tax)}</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-sand/70 pt-3">
              <dt className="font-semibold">Total paid</dt>
              <dd className="font-display text-3xl">{formatPrice(order.total)}</dd>
            </div>
          </dl>
        </section>

        <aside className="animate-fade-up space-y-6 [animation-delay:300ms]">
          <div className="rounded-sm border border-sand/70 p-6">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone">Shipping to</h3>
            <p className="mt-3 text-sm leading-relaxed">
              {order.firstName} {order.lastName}
              <br />
              {order.address1}
              {order.address2 && (
                <>
                  <br />
                  {order.address2}
                </>
              )}
              <br />
              {order.city}, {order.region} {order.postalCode}
              <br />
              {order.country}
            </p>
          </div>
          <div className="rounded-sm border border-sand/70 p-6">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone">Delivery</h3>
            <p className="mt-3 text-sm font-semibold">{method?.label}</p>
            <p className="text-xs text-stone">{method?.eta}</p>
            <p className="mt-3 text-xs text-stone">Placed {formatDate(order.createdAt)}</p>
          </div>
          <div className="rounded-sm bg-ink p-6 text-ivory">
            <p className="font-display text-xl">Status: <span className="italic text-gold-light">Confirmed</span></p>
            <p className="mt-2 text-xs text-ivory/60">You&apos;ll receive tracking once your watch leaves the bench.</p>
          </div>
        </aside>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-sm bg-ink px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition hover:bg-gold hover:text-ink"
        >
          Continue shopping <ArrowRight />
        </Link>
      </div>
    </div>
  );
}

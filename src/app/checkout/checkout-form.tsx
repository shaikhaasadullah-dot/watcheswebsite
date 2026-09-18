"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import { ArrowLeft, ArrowRight, CheckIcon, LockIcon } from "@/components/ui/icons";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_METHODS, TAX_RATE, formatPrice } from "@/lib/format";

type Step = 0 | 1 | 2;
const STEPS = ["Contact", "Shipping", "Payment"];

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  shippingMethod: (typeof SHIPPING_METHODS)[number]["id"];
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

const initial: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  region: "",
  postalCode: "",
  country: "United States",
  shippingMethod: "standard",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Italy", "Spain", "Netherlands", "Japan", "Singapore", "United Arab Emirates"];

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, hydrated, clearCart } = useCart();
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const shippingCost = useMemo(() => {
    const m = SHIPPING_METHODS.find((s) => s.id === form.shippingMethod)!;
    return m.id === "standard" && subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : m.price;
  }, [form.shippingMethod, subtotal]);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shippingCost + tax;

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let v = e.target.value;
    if (k === "cardNumber") v = v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    if (k === "expiry") v = v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(?=\d)/, "$1/");
    if (k === "cvc") v = v.replace(/\D/g, "").slice(0, 4);
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (s: Step) => {
    const er: typeof errors = {};
    if (s === 0) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "Enter a valid email";
      if (!form.firstName.trim()) er.firstName = "Required";
      if (!form.lastName.trim()) er.lastName = "Required";
    }
    if (s === 1) {
      if (!form.address1.trim()) er.address1 = "Required";
      if (!form.city.trim()) er.city = "Required";
      if (!form.region.trim()) er.region = "Required";
      if (!form.postalCode.trim()) er.postalCode = "Required";
    }
    if (s === 2) {
      if (!form.cardName.trim()) er.cardName = "Required";
      if (form.cardNumber.replace(/\s/g, "").length !== 16) er.cardNumber = "Enter 16 digits";
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) er.expiry = "MM/YY";
      if (form.cvc.length < 3) er.cvc = "3–4 digits";
    }
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(2, s + 1) as Step);
  };

  const placeOrder = async () => {
    if (!validate(2)) return;
    setSubmitting(true);
    setServerError(null);
    try {
      // Simulate payment authorisation latency
      await new Promise((r) => setTimeout(r, 900));
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          address1: form.address1,
          address2: form.address2,
          city: form.city,
          region: form.region,
          postalCode: form.postalCode,
          country: form.country,
          shippingMethod: form.shippingMethod,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to place order");
      clearCart();
      router.push(`/orders/${data.orderNumber}`);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (!hydrated) {
    return (
      <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
        <div className="space-y-4">
          <div className="skeleton h-10 w-1/2 rounded-sm" />
          <div className="skeleton h-12 rounded-sm" />
          <div className="skeleton h-12 rounded-sm" />
        </div>
        <div className="skeleton h-80 rounded-sm" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <h1 className="font-display text-5xl">Your bag is empty</h1>
        <p className="mt-4 text-stone">Add a watch or two before heading to checkout.</p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-ink px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition hover:bg-gold hover:text-ink"
        >
          Browse watches <ArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
      <div>
        {/* Stepper */}
        <ol className="flex items-center gap-3 text-xs">
          {STEPS.map((label, i) => (
            <li key={label} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => i < step && setStep(i as Step)}
                disabled={i > step}
                className={`flex items-center gap-2 ${i > step ? "cursor-default text-stone" : ""}`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                    i < step ? "bg-gold text-ink" : i === step ? "bg-ink text-ivory" : "border border-sand text-stone"
                  }`}
                >
                  {i < step ? <CheckIcon width={12} height={12} /> : i + 1}
                </span>
                <span className={`uppercase tracking-[0.18em] ${i === step ? "font-semibold" : ""}`}>{label}</span>
              </button>
              {i < STEPS.length - 1 && <span className="h-px w-8 bg-sand sm:w-14" />}
            </li>
          ))}
        </ol>

        <div key={step} className="animate-fade-up mt-10">
          {step === 0 && (
            <section>
              <h2 className="font-display text-4xl">Contact details</h2>
              <p className="mt-2 text-sm text-stone">We&apos;ll send your receipt and tracking here.</p>
              <div className="mt-8 grid gap-5">
                <Input label="Email" type="email" value={form.email} onChange={set("email")} error={errors.email} autoComplete="email" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="First name" value={form.firstName} onChange={set("firstName")} error={errors.firstName} autoComplete="given-name" />
                  <Input label="Last name" value={form.lastName} onChange={set("lastName")} error={errors.lastName} autoComplete="family-name" />
                </div>
              </div>
            </section>
          )}

          {step === 1 && (
            <section>
              <h2 className="font-display text-4xl">Shipping address</h2>
              <p className="mt-2 text-sm text-stone">Every order is tracked, insured and requires a signature.</p>
              <div className="mt-8 grid gap-5">
                <Input label="Address" value={form.address1} onChange={set("address1")} error={errors.address1} autoComplete="address-line1" />
                <Input label="Apartment, suite, etc. (optional)" value={form.address2} onChange={set("address2")} autoComplete="address-line2" />
                <div className="grid gap-5 sm:grid-cols-3">
                  <Input label="City" value={form.city} onChange={set("city")} error={errors.city} autoComplete="address-level2" />
                  <Input label="State / Region" value={form.region} onChange={set("region")} error={errors.region} autoComplete="address-level1" />
                  <Input label="Postal code" value={form.postalCode} onChange={set("postalCode")} error={errors.postalCode} autoComplete="postal-code" />
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">Country</span>
                  <select
                    value={form.country}
                    onChange={set("country")}
                    className="w-full rounded-sm border border-sand bg-ivory px-3 py-3 text-sm outline-none focus:border-ink"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
              </div>

              <h3 className="mt-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone">Delivery method</h3>
              <div className="mt-3 space-y-3">
                {SHIPPING_METHODS.map((m) => {
                  const price = m.id === "standard" && subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : m.price;
                  const selected = form.shippingMethod === m.id;
                  return (
                    <label
                      key={m.id}
                      className={`flex cursor-pointer items-center justify-between rounded-sm border p-4 transition ${
                        selected ? "border-ink bg-cream/50" : "border-sand hover:border-stone"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          className="sr-only"
                          checked={selected}
                          onChange={() => setForm((f) => ({ ...f, shippingMethod: m.id }))}
                        />
                        <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${selected ? "border-ink" : "border-stone/60"}`}>
                          {selected && <span className="h-2 w-2 rounded-full bg-ink" />}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">{m.label}</span>
                          <span className="block text-xs text-stone">{m.eta}</span>
                        </span>
                      </span>
                      <span className="text-sm font-semibold">{price === 0 ? "Free" : formatPrice(price)}</span>
                    </label>
                  );
                })}
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2 className="font-display text-4xl">Payment</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-stone">
                <LockIcon /> Encrypted and secure. This is a demo — no charge will be made.
              </p>
              <div className="mt-8 rounded-sm border border-sand bg-gradient-to-br from-ink to-ink-soft p-6 text-ivory">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">Card</span>
                  <span className="flex gap-1">
                    <span className="h-6 w-6 rounded-full bg-red-500/80" />
                    <span className="-ml-3 h-6 w-6 rounded-full bg-amber-400/80" />
                  </span>
                </div>
                <p className="mt-8 font-mono text-xl tracking-[0.2em]">{form.cardNumber || "•••• •••• •••• ••••"}</p>
                <div className="mt-6 flex justify-between text-xs uppercase tracking-[0.15em]">
                  <span>{form.cardName || "Name on card"}</span>
                  <span>{form.expiry || "MM/YY"}</span>
                </div>
              </div>
              <div className="mt-6 grid gap-5">
                <Input label="Name on card" value={form.cardName} onChange={set("cardName")} error={errors.cardName} autoComplete="cc-name" />
                <Input label="Card number" value={form.cardNumber} onChange={set("cardNumber")} error={errors.cardNumber} inputMode="numeric" placeholder="4242 4242 4242 4242" autoComplete="cc-number" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Expiry" value={form.expiry} onChange={set("expiry")} error={errors.expiry} inputMode="numeric" placeholder="MM/YY" autoComplete="cc-exp" />
                  <Input label="CVC" value={form.cvc} onChange={set("cvc")} error={errors.cvc} inputMode="numeric" placeholder="123" autoComplete="cc-csc" />
                </div>
              </div>
              <div className="mt-8 rounded-sm bg-cream/60 p-4 text-xs text-stone">
                <p className="font-semibold text-ink">Shipping to</p>
                <p className="mt-1">
                  {form.firstName} {form.lastName}, {form.address1}
                  {form.address2 ? `, ${form.address2}` : ""}, {form.city}, {form.region} {form.postalCode}, {form.country}
                </p>
                <button type="button" onClick={() => setStep(1)} className="mt-2 underline underline-offset-4">
                  Edit
                </button>
              </div>
              {serverError && <p className="mt-4 rounded-sm bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}
            </section>
          )}
        </div>

        <div className="mt-10 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone hover:text-ink"
            >
              <ArrowLeft /> Back
            </button>
          ) : (
            <Link href="/shop" className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone hover:text-ink">
              <ArrowLeft /> Continue shopping
            </Link>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition hover:bg-gold hover:text-ink"
            >
              Continue to {STEPS[step + 1]} <ArrowRight />
            </button>
          ) : (
            <button
              type="button"
              onClick={placeOrder}
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition hover:bg-gold hover:text-ink disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory" /> Processing…
                </>
              ) : (
                <>
                  <LockIcon /> Pay {formatPrice(total)}
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Order summary */}
      <aside className="h-fit rounded-sm border border-sand/70 bg-cream/40 p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-2xl">Order summary</h2>
        <ul className="mt-5 max-h-80 space-y-4 overflow-y-auto scrollbar-thin pr-1">
          {items.map((i) => (
            <li key={i.productId} className="flex gap-3">
              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-cream">
                <Image src={i.image} alt={i.name} fill sizes="64px" className="object-cover" />
                <span className="absolute -right-0 -top-0 flex h-5 min-w-5 items-center justify-center rounded-bl-sm bg-ink px-1 text-[10px] font-bold text-ivory">
                  {i.quantity}
                </span>
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone">{i.brand}</span>
                <span className="font-display text-lg leading-tight">{i.name}</span>
                <span className="mt-auto text-sm font-semibold">{formatPrice(i.price * i.quantity)}</span>
              </div>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 border-t border-sand/70 pt-5 text-sm">
          <div className="flex justify-between">
            <dt className="text-stone">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-stone">Shipping</dt>
            <dd>{shippingCost === 0 ? <span className="text-gold-dark">Free</span> : formatPrice(shippingCost)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-stone">Estimated tax</dt>
            <dd>{formatPrice(tax)}</dd>
          </div>
          <div className="flex items-baseline justify-between border-t border-sand/70 pt-4">
            <dt className="font-semibold">Total</dt>
            <dd className="font-display text-3xl">{formatPrice(total)}</dd>
          </div>
        </dl>
        <p className="mt-5 flex items-center gap-2 text-[11px] text-stone">
          <LockIcon /> 256-bit SSL · 30-day returns · 2-year warranty
        </p>
      </aside>
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };

function Input({ label, error, ...rest }: InputProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">{label}</span>
      <input
        {...rest}
        className={`w-full rounded-sm border bg-ivory px-3 py-3 text-sm outline-none transition focus:border-ink ${
          error ? "border-red-500" : "border-sand"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

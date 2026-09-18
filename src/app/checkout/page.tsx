import type { Metadata } from "next";
import { CheckoutForm } from "./checkout-form";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">Secure checkout</p>
      <h1 className="mt-2 font-display text-5xl font-medium sm:text-6xl">Almost yours.</h1>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}

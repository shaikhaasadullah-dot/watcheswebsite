"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "done">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("done");
  };

  if (status === "done") {
    return <p className="mt-4 text-sm text-gold-light animate-fade-in">Welcome aboard — check your inbox for 10% off.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex max-w-sm">
      <input
        type="email"
        required
        placeholder="you@example.com"
        className="flex-1 border-b border-ivory/30 bg-transparent py-2 text-sm outline-none placeholder:text-ivory/40 focus:border-gold"
      />
      <button
        type="submit"
        className="ml-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold transition hover:text-gold-light"
      >
        Subscribe
      </button>
    </form>
  );
}

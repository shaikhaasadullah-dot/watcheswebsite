"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { StarRating } from "@/components/ui/star-rating";
import { formatDate } from "@/lib/format";
import type { Review } from "@/db/schema";

type Props = { productId: number; reviews: Review[]; rating: number };

export function Reviews({ productId, reviews, rating }: Props) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [hover, setHover] = useState(0);
  const [stars, setStars] = useState(5);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const dist = [5, 4, 3, 2, 1].map((s) => ({
    s,
    n: reviews.filter((r) => r.rating === s).length,
  }));

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      productId,
      author: form.get("author"),
      location: form.get("location"),
      title: form.get("title"),
      body: form.get("body"),
      rating: stars,
    };
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Please try again.");
      setStatus("error");
      return;
    }
    setStatus("done");
    setShowForm(false);
    router.refresh();
  };

  return (
    <section id="reviews" className="scroll-mt-28">
      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">Reviews</p>
          <h2 className="mt-3 font-display text-4xl font-medium">What owners say</h2>
          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-6xl leading-none">{reviews.length ? rating.toFixed(1) : "—"}</span>
            <div className="pb-1">
              <StarRating rating={rating} size={16} />
              <p className="text-xs text-stone">
                Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
          <ul className="mt-6 space-y-2">
            {dist.map(({ s, n }) => (
              <li key={s} className="flex items-center gap-3 text-xs">
                <span className="w-8 text-stone">{s} ★</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand/60">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-700"
                    style={{ width: reviews.length ? `${(n / reviews.length) * 100}%` : 0 }}
                  />
                </div>
                <span className="w-6 text-right tabular-nums text-stone">{n}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="mt-8 w-full rounded-sm border border-ink py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition hover:bg-ink hover:text-ivory"
          >
            {showForm ? "Cancel" : "Write a review"}
          </button>
          {status === "done" && (
            <p className="animate-fade-in mt-3 text-xs text-gold-dark">Thank you — your review is live.</p>
          )}
        </div>

        <div>
          {showForm && (
            <form
              onSubmit={submit}
              className="animate-fade-up mb-10 space-y-5 rounded-sm border border-sand/70 bg-cream/50 p-6"
            >
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">Your rating</p>
                <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onMouseEnter={() => setHover(s)}
                      onClick={() => setStars(s)}
                      aria-label={`${s} stars`}
                      className={`text-2xl transition ${(hover || stars) >= s ? "text-gold" : "text-sand"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="author" label="Name" required />
                <Field name="location" label="Location (optional)" />
              </div>
              <Field name="title" label="Headline" required />
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">
                  Your review
                </label>
                <textarea
                  name="body"
                  required
                  minLength={20}
                  rows={4}
                  className="w-full rounded-sm border border-sand bg-ivory px-3 py-2.5 text-sm outline-none focus:border-ink"
                  placeholder="How does it wear? What do you love?"
                />
              </div>
              {error && <p className="text-sm text-red-700">{error}</p>}
              <button
                type="submit"
                disabled={status === "saving"}
                className="rounded-sm bg-ink px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-ivory transition hover:bg-gold hover:text-ink disabled:opacity-60"
              >
                {status === "saving" ? "Submitting…" : "Submit review"}
              </button>
            </form>
          )}

          {reviews.length === 0 ? (
            <p className="rounded-sm border border-dashed border-sand p-10 text-center text-sm text-stone">
              No reviews yet. Be the first to share your experience.
            </p>
          ) : (
            <ul className="divide-y divide-sand/70">
              {reviews.map((r) => (
                <li key={r.id} className="py-7 first:pt-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <StarRating rating={r.rating} size={13} />
                    <span className="text-xs text-stone">{formatDate(r.createdAt)}</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl leading-tight">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">{r.body}</p>
                  <p className="mt-4 text-xs text-stone">
                    <span className="font-semibold text-ink">{r.author}</span>
                    {r.location && <span> · {r.location}</span>}
                    {r.verified && (
                      <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-gold-dark">
                        ✓ Verified buyer
                      </span>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ name, label, required }: { name: string; label: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={`rev-${name}`} className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">
        {label}
      </label>
      <input
        id={`rev-${name}`}
        name={name}
        required={required}
        className="w-full rounded-sm border border-sand bg-ivory px-3 py-2.5 text-sm outline-none focus:border-ink"
      />
    </div>
  );
}

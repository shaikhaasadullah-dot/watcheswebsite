import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-32 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">404</p>
      <h1 className="mt-4 font-display text-6xl font-medium">Lost track of time?</h1>
      <p className="mt-4 text-stone">The page you&apos;re looking for has wound down. Let&apos;s get you back to the collection.</p>
      <Link
        href="/shop"
        className="mt-8 inline-flex items-center gap-2 rounded-sm bg-ink px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition hover:bg-gold hover:text-ink"
      >
        Browse watches <ArrowRight />
      </Link>
    </div>
  );
}

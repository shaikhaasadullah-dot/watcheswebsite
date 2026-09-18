import Link from "next/link";
import { NewsletterForm } from "@/components/layout/newsletter-form";

const cols = [
  {
    title: "Shop",
    links: [
      { label: "All Watches", href: "/shop" },
      { label: "Heritage", href: "/shop?collection=heritage" },
      { label: "Sport & Dive", href: "/shop?collection=sport" },
      { label: "Minimalist", href: "/shop?collection=minimal" },
      { label: "Smart", href: "/shop?collection=smart" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Craftsmanship", href: "/about#craft" },
      { label: "Sustainability", href: "/about" },
      { label: "Careers", href: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping & Returns", href: "/about#service" },
      { label: "Warranty", href: "/about#service" },
      { label: "Size Guide", href: "/about" },
      { label: "Contact", href: "/about" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-3xl">
              Watches <span className="italic text-gold">World</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">
              Timepieces for every chapter — from a first watch at fifteen to a forever watch at sixty. Curated
              with care, shipped worldwide.
            </p>
            <div className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Join the list</p>
              <p className="mt-2 text-sm text-ivory/60">Early access to drops, private sales and stories from the bench.</p>
              <NewsletterForm />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:pl-12">
            {cols.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-ivory/70 transition hover:text-ivory">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-6 text-xs text-ivory/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Watches World. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

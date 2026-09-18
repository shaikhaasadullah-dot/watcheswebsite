"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useCart } from "@/components/cart/cart-context";
import { BagIcon, CloseIcon, MenuIcon, SearchIcon } from "@/components/ui/icons";

const NAV = [
  { href: "/shop", label: "All Watches" },
  { href: "/shop?collection=heritage", label: "Heritage" },
  { href: "/shop?collection=sport", label: "Sport & Dive" },
  { href: "/shop?collection=minimal", label: "Minimalist" },
  { href: "/shop?collection=smart", label: "Smart" },
  { href: "/about", label: "Our Story" },
];

export function Header() {
  const { itemCount, openCart, hydrated } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bump, setBump] = useState(false);

  const transparent = pathname === "/" && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!hydrated || itemCount === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [itemCount, hydrated]);

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    setSearchOpen(false);
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  };

  return (
    <>
      <div className="bg-ink text-ivory">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.22em] sm:px-6">
          Complimentary shipping over $200 · 30-day returns · 2-year warranty
        </p>
      </div>
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          transparent
            ? "bg-transparent text-ivory"
            : "border-b border-sand/60 bg-ivory/90 text-ink shadow-[0_1px_0_rgba(0,0,0,0.02)] backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20">
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-full p-2 transition hover:bg-black/5"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          <Link href="/" className="flex items-center gap-2.5" aria-label="Watches World home">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                transparent ? "border-ivory/60" : "border-ink/60"
              }`}
            >
              <span className="relative block h-3.5 w-3.5">
                <span className="absolute left-1/2 top-1/2 h-[7px] w-px -translate-x-1/2 -translate-y-full bg-current" />
                <span className="absolute left-1/2 top-1/2 h-px w-[6px] -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-1/2 h-0.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
              </span>
            </span>
            <span className="font-display text-2xl font-medium tracking-wide">
              Watches <span className="italic text-gold">World</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-underline text-[12px] font-medium uppercase tracking-[0.2em] opacity-90 transition-opacity hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="rounded-full p-2 transition hover:bg-black/5"
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              aria-label={`Open cart, ${itemCount} items`}
              onClick={openCart}
              className="relative rounded-full p-2 transition hover:bg-black/5"
            >
              <BagIcon />
              {hydrated && itemCount > 0 && (
                <span
                  className={`absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink transition-transform ${
                    bump ? "scale-125" : "scale-100"
                  }`}
                >
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div
          className={`overflow-hidden border-t border-sand/60 bg-ivory text-ink transition-all duration-500 ${
            searchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <form onSubmit={onSearch} className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6">
            <SearchIcon className="text-stone" />
            <input
              name="q"
              type="search"
              autoFocus={searchOpen}
              placeholder="Search by name, brand or style…"
              className="flex-1 bg-transparent font-display text-xl outline-none placeholder:text-stone"
            />
            <button
              type="submit"
              className="rounded-sm bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory"
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile menu */}
        <div
          className={`border-t border-sand/60 bg-ivory text-ink transition-all duration-500 lg:hidden ${
            menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
          }`}
        >
          <nav className="flex flex-col px-4 py-4 sm:px-6" aria-label="Mobile">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ transitionDelay: `${i * 40}ms` }}
                className={`border-b border-sand/50 py-3.5 font-display text-2xl transition-all ${
                  menuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}

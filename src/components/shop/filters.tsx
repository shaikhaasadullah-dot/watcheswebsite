"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { CloseIcon, FilterIcon } from "@/components/ui/icons";
import { formatPrice, genderLabel, styleLabel } from "@/lib/format";
import type { Collection } from "@/db/schema";

type Props = {
  collections: Collection[];
  brands: string[];
  priceBounds: { min: number; max: number };
  resultCount: number;
};

const STYLES = ["dress", "sport", "minimal", "smart"];
const GENDERS = ["men", "women", "unisex"];
const PRICE_BUCKETS = [
  { label: "Under $300", min: 0, max: 30000 },
  { label: "$300 – $600", min: 30000, max: 60000 },
  { label: "$600 – $1,000", min: 60000, max: 100000 },
  { label: "Over $1,000", min: 100000, max: undefined as number | undefined },
];

export function Filters({ collections, brands, priceBounds, resultCount }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const update = useCallback(
    (mutate: (p: URLSearchParams) => void) => {
      const next = new URLSearchParams(params.toString());
      mutate(next);
      startTransition(() => {
        router.push(`${pathname}?${next.toString()}`, { scroll: false });
      });
    },
    [params, pathname, router],
  );

  const toggleMulti = (key: string, value: string) =>
    update((p) => {
      const values = p.getAll(key);
      p.delete(key);
      const set = new Set(values);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      set.forEach((v) => p.append(key, v));
    });

  const setCollection = (slug: string | null) =>
    update((p) => {
      if (!slug || p.get("collection") === slug) p.delete("collection");
      else p.set("collection", slug);
    });

  const setPrice = (min: number, max?: number) =>
    update((p) => {
      const currentMin = p.get("minPrice");
      const currentMax = p.get("maxPrice");
      const same = currentMin === String(min) && (max == null ? currentMax == null : currentMax === String(max));
      p.delete("minPrice");
      p.delete("maxPrice");
      if (!same) {
        p.set("minPrice", String(min));
        if (max != null) p.set("maxPrice", String(max));
      }
    });

  const clearAll = () =>
    update((p) => {
      ["collection", "style", "gender", "brand", "minPrice", "maxPrice", "q"].forEach((k) => p.delete(k));
    });

  const activeCount =
    (params.get("collection") ? 1 : 0) +
    params.getAll("style").length +
    params.getAll("gender").length +
    params.getAll("brand").length +
    (params.get("minPrice") || params.get("maxPrice") ? 1 : 0) +
    (params.get("q") ? 1 : 0);

  const currentMin = params.get("minPrice");
  const currentMax = params.get("maxPrice");

  const panel = (
    <div className="space-y-8">
      {params.get("q") && (
        <Group title="Search">
          <button
            type="button"
            onClick={() => update((p) => p.delete("q"))}
            className="inline-flex items-center gap-2 rounded-full border border-ink px-3 py-1 text-xs"
          >
            &ldquo;{params.get("q")}&rdquo; <CloseIcon width={12} height={12} />
          </button>
        </Group>
      )}
      <Group title="Collection">
        <ul className="space-y-2">
          <li>
            <Radio checked={!params.get("collection")} onChange={() => setCollection(null)} label="All watches" />
          </li>
          {collections.map((c) => (
            <li key={c.id}>
              <Radio
                checked={params.get("collection") === c.slug}
                onChange={() => setCollection(c.slug)}
                label={c.name}
              />
            </li>
          ))}
        </ul>
      </Group>
      <Group title="Style">
        <ul className="space-y-2">
          {STYLES.map((s) => (
            <li key={s}>
              <Check
                checked={params.getAll("style").includes(s)}
                onChange={() => toggleMulti("style", s)}
                label={styleLabel(s)}
              />
            </li>
          ))}
        </ul>
      </Group>
      <Group title="For">
        <ul className="space-y-2">
          {GENDERS.map((g) => (
            <li key={g}>
              <Check
                checked={params.getAll("gender").includes(g)}
                onChange={() => toggleMulti("gender", g)}
                label={genderLabel(g)}
              />
            </li>
          ))}
        </ul>
      </Group>
      <Group title="Price">
        <ul className="space-y-2">
          {PRICE_BUCKETS.map((b) => {
            const checked = currentMin === String(b.min) && (b.max == null ? currentMax == null : currentMax === String(b.max));
            return (
              <li key={b.label}>
                <Check checked={checked} onChange={() => setPrice(b.min, b.max)} label={b.label} />
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-[11px] text-stone">
          Range: {formatPrice(priceBounds.min)} – {formatPrice(priceBounds.max)}
        </p>
      </Group>
      <Group title="Brand">
        <ul className="space-y-2">
          {brands.map((b) => (
            <li key={b}>
              <Check checked={params.getAll("brand").includes(b)} onChange={() => toggleMulti("brand", b)} label={b} />
            </li>
          ))}
        </ul>
      </Group>
      {activeCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="w-full rounded-sm border border-ink py-3 text-xs font-semibold uppercase tracking-[0.18em] transition hover:bg-ink hover:text-ivory"
        >
          Clear all ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-sm border border-ink px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] lg:hidden"
      >
        <FilterIcon /> Filters {activeCount > 0 && <span className="rounded-full bg-gold px-1.5 text-[10px]">{activeCount}</span>}
      </button>

      {/* Desktop sidebar */}
      <aside className="sticky top-28 hidden self-start lg:block">{panel}</aside>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/50 transition-opacity duration-400 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute left-0 top-0 flex h-full w-full max-w-sm flex-col bg-ivory shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-sand/70 px-6 py-5">
            <h2 className="font-display text-2xl">Filters</h2>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close filters" className="rounded-full p-2">
              <CloseIcon />
            </button>
          </div>
          <div className="scrollbar-thin flex-1 overflow-y-auto px-6 py-6">{panel}</div>
          <div className="border-t border-sand/70 p-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full rounded-sm bg-ink py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory"
            >
              Show {resultCount} {resultCount === 1 ? "watch" : "watches"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone">{title}</p>
      {children}
    </div>
  );
}

function Check({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="flex h-4 w-4 items-center justify-center rounded-[3px] border border-stone/60 transition peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-gold">
        {checked && (
          <svg viewBox="0 0 24 24" width={11} height={11} fill="none" stroke="#f7f4ee" strokeWidth={3}>
            <path d="m5 12 5 5L20 7" />
          </svg>
        )}
      </span>
      <span className="transition group-hover:text-gold-dark">{label}</span>
    </label>
  );
}

function Radio({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 text-sm">
      <input type="radio" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-stone/60 transition peer-checked:border-ink peer-focus-visible:ring-2 peer-focus-visible:ring-gold">
        {checked && <span className="h-2 w-2 rounded-full bg-ink" />}
      </span>
      <span className={`transition group-hover:text-gold-dark ${checked ? "font-semibold" : ""}`}>{label}</span>
    </label>
  );
}

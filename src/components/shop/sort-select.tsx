"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "@/components/ui/icons";

const OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top rated" },
  { value: "price-asc", label: "Price: Low to high" },
  { value: "price-desc", label: "Price: High to low" },
];

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const current = params.get("sort") ?? "featured";

  return (
    <label className="relative inline-flex items-center gap-2 text-xs">
      <span className="hidden uppercase tracking-[0.18em] text-stone sm:inline">Sort</span>
      <span className="relative">
        <select
          value={current}
          onChange={(e) => {
            const next = new URLSearchParams(params.toString());
            if (e.target.value === "featured") next.delete("sort");
            else next.set("sort", e.target.value);
            router.push(`${pathname}?${next.toString()}`, { scroll: false });
          }}
          className="appearance-none rounded-sm border border-ink bg-transparent py-2.5 pl-4 pr-9 text-xs font-semibold uppercase tracking-[0.16em] outline-none focus:ring-2 focus:ring-gold"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
      </span>
    </label>
  );
}

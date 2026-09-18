"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";

type Props = { images: string[]; name: string; badges?: string[] };

export function Gallery({ images, name, badges = [] }: Props) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  const go = (dir: 1 | -1) => setActive((a) => (a + dir + images.length) % images.length);

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse">
      <div className="relative flex-1">
        <div
          className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-cream"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setZoom({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
          }}
          onMouseLeave={() => setZoom(null)}
        >
          {images.map((src, i) => (
            <Image
              key={src + i}
              src={src}
              alt={`${name} — view ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 55vw"
              style={
                zoom && i === active
                  ? { transformOrigin: `${zoom.x}% ${zoom.y}%`, transform: "scale(1.6)" }
                  : undefined
              }
              className={`object-cover transition-all duration-500 ${
                i === active ? "opacity-100" : "pointer-events-none opacity-0"
              } ${zoom ? "cursor-zoom-in" : ""}`}
            />
          ))}
          <div className="absolute left-4 top-4 flex flex-col gap-1.5">
            {badges.map((b) => (
              <span
                key={b}
                className="rounded-full bg-ink/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory backdrop-blur"
              >
                {b}
              </span>
            ))}
          </div>
          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-ivory/90 p-2.5 opacity-0 shadow transition group-hover:opacity-100 focus:opacity-100"
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-ivory/90 p-2.5 opacity-0 shadow transition group-hover:opacity-100 focus:opacity-100"
              >
                <ArrowRight />
              </button>
            </>
          )}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 lg:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-ink" : "w-1.5 bg-ink/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden w-20 flex-col gap-3 lg:flex">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative aspect-[4/5] overflow-hidden rounded-sm border transition ${
              i === active ? "border-ink" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

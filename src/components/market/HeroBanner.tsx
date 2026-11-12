"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { whatsappLink } from "@/lib/contact";

// The tour is split into 3 clips played side by side. Each clip is shown at
// close to its native size, so it stays sharp on wide screens.
const panels = [
  { n: 1, cls: "" },
  { n: 2, cls: "hidden md:block" },
  { n: 3, cls: "hidden lg:block" },
];

export default function HeroBanner({
  propertyCount,
  areaCount,
}: {
  propertyCount: number;
  areaCount: number;
}) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () =>
      refs.current.forEach((v) => {
        if (v && v.offsetParent !== null && v.paused) {
          v.muted = true;
          v.play().catch(() => {});
        }
      });
    start();
    window.addEventListener("resize", start);
    return () => window.removeEventListener("resize", start);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-end overflow-hidden bg-[#0F3D2E] text-white lg:items-center">
      <div className="absolute inset-0 flex gap-[2px] bg-[#0F3D2E]">
        {panels.map((p, i) => (
          <video
            key={p.n}
            ref={(el) => {
              refs.current[i] = el;
            }}
            muted
            loop
            playsInline
            autoPlay
            preload={p.n === 1 ? "auto" : "none"}
            poster={`/videos/clip-${p.n}.jpg`}
            aria-hidden="true"
            className={`h-full min-w-0 flex-1 object-cover ${p.cls}`}
          >
            <source src={`/videos/clip-${p.n}.mp4`} type="video/mp4" />
          </video>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent lg:bg-gradient-to-r lg:from-[#0F3D2E]/90 lg:via-[#0F3D2E]/40 lg:to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">
          Ikorodu, Lagos
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">
          Find property in Ikorodu, all in one marketplace.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white drop-shadow">
          Browse homes, land and shops across Ikorodu. Enquire on WhatsApp or
          email and we will arrange your inspection.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#browse"
            className="btn-live glow-amber inline-block rounded-lg bg-amber-400 px-6 py-3 font-semibold text-stone-900"
          >
            Browse {propertyCount} properties
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-live glow-green inline-block rounded-lg bg-[#25D366] px-6 py-3 font-semibold text-stone-900"
          >
            Chat on WhatsApp
          </a>
          <Link
            href="/sell"
            className="btn-live glow-white inline-block rounded-lg border border-white/70 px-6 py-3 font-semibold text-white"
          >
            List your property
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/90">
          {propertyCount} properties · {areaCount} areas
        </p>
      </div>
    </section>
  );
}

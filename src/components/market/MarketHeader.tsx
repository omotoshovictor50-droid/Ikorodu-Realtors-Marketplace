"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { asset } from "@/lib/assets";

const main = [
  { href: "/", label: "Browse" },
  { href: "/map", label: "Map" },
  { href: "/about", label: "About Us" },
  { href: "/sell", label: "List a Property" },
];

const more = [
  { href: "/listings", label: "Properties" },
  { href: "/partners", label: "Partners" },
  { href: "/technology", label: "Our Technology" },
  { href: "/vision", label: "Our Vision" },
  { href: "/contact", label: "Contact" },
];

export default function MarketHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-[#0F3D2E]">
          <Image
            src={asset("/brand/mark.webp")}
            alt="Ikorodu Realtors logo"
            width={480}
            height={188}
            unoptimized
            className="h-9 w-auto"
          />
          <span className="hidden lg:inline">
            Ikorodu Realtors <span className="font-medium text-stone-500">Marketplace</span>
          </span>
        </Link>

        <nav className="hidden gap-6 text-sm font-medium text-stone-700 md:flex" aria-label="Main">
          {main.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#0F3D2E]">
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="btn-live glow-forest flex h-11 w-11 items-center justify-center rounded-lg border border-[#0F3D2E] text-[#0F3D2E] md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="menu-drop max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-stone-200 bg-white px-4 pb-6 pt-2 md:hidden"
        >
          {[...main, ...more].map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block border-b border-stone-100 py-3.5 text-base font-semibold text-stone-800 active:bg-stone-50 ${i === main.length ? "mt-4 border-t border-t-stone-200" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

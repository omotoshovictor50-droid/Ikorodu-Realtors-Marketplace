import Link from "next/link";
import { whatsappLink } from "@/lib/contact";

const links = [
  { href: "/", label: "Browse" },
  { href: "/map", label: "Map" },
  { href: "/sell", label: "List a property" },
];

export default function MarketHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="text-lg font-bold text-[#0F3D2E]">
          Ikorodu Realtors{" "}
          <span className="font-medium text-stone-500">Marketplace</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-stone-700 sm:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#0F3D2E]">
              {l.label}
            </Link>
          ))}
        </nav>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-live glow-green inline-block rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-stone-900">Chat on WhatsApp</a>
      </div>
    </header>
  );
}

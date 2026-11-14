import Image from "next/image";
import Link from "next/link";
import Splash from "@/components/market/Splash";
import { asset } from "@/lib/assets";
import MarketHeader from "@/components/market/MarketHeader";
import ClickRipple from "@/components/market/ClickRipple";
import WhatsAppFloat from "@/components/market/WhatsAppFloat";
import { ENQUIRY_EMAIL, whatsappLink } from "@/lib/contact";

const cols = [
  { title: "Marketplace", links: [["Homepage", "/"], ["Properties", "/listings"], ["Map", "/map"], ["List a Property", "/sell"]] },
  { title: "Company", links: [["About Us", "/about"], ["Partners", "/partners"], ["Our Technology", "/technology"], ["Our Vision", "/vision"], ["Contact", "/contact"]] },
  { title: "Legal", links: [["Privacy Policy", "/privacy"], ["Terms of Use", "/terms"], ["Disclaimer", "/disclaimer"]] },
];

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Splash />
      <ClickRipple />
      <MarketHeader />
      <main>{children}</main>
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src={asset("/brand/logo.webp")}
              alt="Ikorodu Realtors - Discover, Connect, Own"
              width={900}
              height={600}
              unoptimized
              className="h-auto w-44"
            />
            <p className="mt-2 text-sm text-stone-600">Independent digital property marketing and listing platform for Ikorodu, Lagos.</p>
            <p className="mt-3 text-sm">
              <a className="underline" href={whatsappLink()}>+234 913 925 5152</a>
              <br />
              <a className="underline" href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a>
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="font-semibold text-stone-900">{c.title}</p>
              <ul className="mt-2 space-y-1 text-sm text-stone-600">
                {c.links.map(([label, href]) => (
                  <li key={href}><Link href={href} className="hover:underline">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-stone-100 px-4 py-4 text-center text-xs text-stone-500">
          © Ikorodu Realtors. Property information is supplied by third parties and is not independently verified. See our <Link href="/disclaimer" className="underline">Disclaimer</Link>.
        </div>
      </footer>
      <WhatsAppFloat />
    </div>
  );
}

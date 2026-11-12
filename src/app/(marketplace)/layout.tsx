import MarketHeader from "@/components/market/MarketHeader";
import ClickRipple from "@/components/market/ClickRipple";
import { ENQUIRY_EMAIL, whatsappLink } from "@/lib/contact";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <ClickRipple />
      <MarketHeader />
      <main>{children}</main>
      <footer className="border-t border-stone-200 bg-white py-6 text-center text-sm text-stone-500">
        © Ikorodu Realtors Marketplace · Lagos, Nigeria · <a className="underline" href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a> · <a className="underline" href={whatsappLink()}>+234 913 925 5152</a>
      </footer>
    </div>
  );
}

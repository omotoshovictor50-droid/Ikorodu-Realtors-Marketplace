import HeroBanner from "@/components/market/HeroBanner";
import MarketBrowser from "@/components/market/MarketBrowser";
import { AboutSection, ContactSection, HowItWorks, PartnersSection } from "@/components/market/HomeSections";

export default function MarketplaceHome() {
  return (
    <>
      <HeroBanner />
      <AboutSection />
      <MarketBrowser />
      <PartnersSection />
      <HowItWorks />
      <ContactSection />
    </>
  );
}

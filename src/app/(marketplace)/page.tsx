import HeroBanner from "@/components/market/HeroBanner";
import MarketBrowser from "@/components/market/MarketBrowser";
import { properties } from "@/data/properties";
import { areas } from "@/lib/market";

export default function MarketplaceHome() {
  return (
    <>
      <HeroBanner propertyCount={properties.length} areaCount={areas.length} />
      <MarketBrowser />
    </>
  );
}

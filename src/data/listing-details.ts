import { Property } from "@/data/properties";
import { listingRef } from "@/lib/contact";

// Standard details shown on every listing page.
// NOTE: sample values (year built, furnishing, parking, toilets, features) are
// generated from the listing id. Replace with real data per property.

const HOUSE = ["Duplex", "Luxury Duplex", "Bungalow", "Apartment", "Terrace", "Semi-Detached"];

const HOUSE_FEATURES = [
  "Fitted kitchen",
  "Tiled floors",
  "Ample parking",
  "24/7 security",
  "Water supply",
  "Good road access",
];

export interface ListingDetails {
  facts: { label: string; value: string }[];
  features: string[];
  images: string[];
  videoSrc: string | null;
  videoPoster: string | null;
}

export function getDetails(p: Property): ListingDetails {
  const n = Number(p.id);
  const house = HOUSE.includes(p.category);

  const facts = [
    { label: "Reference", value: listingRef(p) },
    { label: "Property type", value: p.category },
    { label: "Status", value: p.status },
    { label: "Location", value: `${p.area}, ${p.city}` },
    { label: "Size", value: `${p.size} ${p.sizeUnit}` },
  ];

  if (house) {
    const baths = p.bathrooms ?? 0;
    facts.push(
      { label: "Bedrooms", value: String(p.bedrooms ?? 0) },
      { label: "Bathrooms", value: String(baths) },
      { label: "Toilets", value: String(baths + (n % 2)) },
      { label: "Parking", value: `${(n % 3) + 1} cars` },
      { label: "Year built", value: String(2018 + (n % 8)) },
      { label: "Furnishing", value: ["Unfurnished", "Semi-furnished", "Furnished"][n % 3] }
    );
  }
  facts.push(
    { label: "Title documents", value: "Available on request" },
    { label: "Inspection", value: "By appointment" },
    { label: "Payment options", value: "Ask us" }
  );

  const features = house
    ? HOUSE_FEATURES
    : p.category === "Land"
    ? ["Dry plot", "Survey documents on request", "Good road access", "Developing area"]
    : ["Ground floor", "Busy road frontage", "Suitable for retail or office"];

  const rooms = [1, 2, 3, 4, 5, 6].map((i) => `/gallery/room-${i}.jpg`);
  const clip = (n % 3) + 1;

  return {
    facts,
    features,
    images: house ? [...p.images, ...rooms] : p.images,
    videoSrc: house ? `/videos/clip-${clip}.mp4` : null,
    videoPoster: house ? `/videos/clip-${clip}.jpg` : null,
  };
}

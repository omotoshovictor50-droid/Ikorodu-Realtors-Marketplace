import { useEffect, useState } from "react";
import { properties as samples, Property, formatPrice } from "@/data/properties";
import { supabase } from "@/lib/supabase";
import { asset } from "@/lib/assets";

export type ListingStatus = "Available" | "Sold" | "Unavailable";

export const CATEGORIES = [
  "Duplex", "Luxury Duplex", "Bungalow", "Apartment",
  "Terrace", "Semi-Detached", "Land", "Commercial",
];
export const AREAS = [
  "Agric", "Igbogbo", "Elepe", "Oke-Eletu", "Ikorodu Town", "Sagamu Road",
  "Ajegunle", "Imota", "Majidun", "Ijede", "Odogunyan", "Ibeshe",
];
const HOUSE_TYPES = ["Duplex", "Luxury Duplex", "Bungalow", "Apartment", "Terrace", "Semi-Detached"];

export interface Listing {
  id: string;
  ref: string;
  title: string;
  category: string;
  status: ListingStatus;
  published: boolean;
  price: number;
  netPrice: number;
  address: string;
  area: string;
  city: string;
  bedrooms: number | null;
  bathrooms: number | null;
  toilets: number | null;
  parking: number | null;
  size: number | null;
  sizeUnit: string;
  yearBuilt: number | null;
  furnishing: string | null;
  titleDocuments: string;
  paymentOptions: string;
  description: string;
  features: string[];
  images: string[];
  videoUrl: string | null;
  videoPoster?: string | null;
  latitude: number | null;
  longitude: number | null;
}

export const blankListing = (): Listing => ({
  id: crypto.randomUUID(), ref: "", title: "", category: "Duplex", status: "Available",
  published: true, price: 0, netPrice: 0, address: "", area: "", city: "Ikorodu",
  bedrooms: null, bathrooms: null, toilets: null, parking: null, size: null,
  sizeUnit: "sqm", yearBuilt: null, furnishing: null,
  titleDocuments: "Available on request", paymentOptions: "Ask us",
  description: "", features: [], images: [], videoUrl: null,
  latitude: null, longitude: null,
});

export const refFromNo = (n: number) => `IK-${String(n).padStart(3, "0")}`;

// ---- database row <-> Listing ----
/* eslint-disable @typescript-eslint/no-explicit-any */
export function rowToListing(r: any): Listing {
  return {
    id: r.id, ref: refFromNo(Number(r.ref_no ?? 0)), title: r.title ?? "",
    category: r.category ?? "Duplex", status: (r.status ?? "Available") as ListingStatus,
    published: r.published !== false, price: Number(r.price ?? 0), netPrice: Number(r.net_price ?? 0),
    address: r.address ?? "", area: r.area ?? "", city: r.city ?? "Ikorodu",
    bedrooms: r.bedrooms ?? null, bathrooms: r.bathrooms ?? null, toilets: r.toilets ?? null,
    parking: r.parking ?? null, size: r.size == null ? null : Number(r.size),
    sizeUnit: r.size_unit ?? "sqm", yearBuilt: r.year_built ?? null, furnishing: r.furnishing ?? null,
    titleDocuments: r.title_documents ?? "Available on request", paymentOptions: r.payment_options ?? "Ask us",
    description: r.description ?? "", features: r.features ?? [], images: r.images ?? [],
    videoUrl: r.video_url ?? null, latitude: r.latitude ?? null, longitude: r.longitude ?? null,
  };
}

export function listingToRow(l: Listing) {
  return {
    id: l.id, title: l.title, category: l.category, status: l.status, published: l.published,
    price: l.price, net_price: l.netPrice, address: l.address, area: l.area, city: l.city,
    bedrooms: l.bedrooms, bathrooms: l.bathrooms, toilets: l.toilets, parking: l.parking,
    size: l.size, size_unit: l.sizeUnit, year_built: l.yearBuilt, furnishing: l.furnishing,
    title_documents: l.titleDocuments, payment_options: l.paymentOptions,
    description: l.description, features: l.features, images: l.images, video_url: l.videoUrl,
    latitude: l.latitude, longitude: l.longitude, updated_at: new Date().toISOString(),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ---- built-in sample listings (shown until the database is connected) ----
export function fromSample(p: Property): Listing {
  const n = Number(p.id);
  const house = HOUSE_TYPES.includes(p.category);
  const baths = p.bathrooms ?? 0;
  const clip = (n % 4) + 1;
  const rooms = [1, 2, 3, 4, 5, 6].map((i) => asset(`/gallery/room-${i}.jpg`));
  return {
    id: p.id, ref: refFromNo(n), title: p.title, category: p.category,
    status: p.status, published: true, price: p.price, netPrice: p.netPrice,
    address: p.address, area: p.area, city: p.city,
    bedrooms: house ? p.bedrooms ?? 0 : null, bathrooms: house ? baths : null,
    toilets: house ? baths + (n % 2) : null, parking: house ? (n % 3) + 1 : null,
    size: p.size, sizeUnit: p.sizeUnit, yearBuilt: house ? 2018 + (n % 8) : null,
    furnishing: house ? ["Unfurnished", "Semi-furnished", "Furnished"][n % 3] : null,
    titleDocuments: "Available on request", paymentOptions: "Ask us",
    description: p.description,
    features: house
      ? ["Fitted kitchen", "Tiled floors", "Ample parking", "24/7 security", "Water supply", "Good road access"]
      : p.category === "Land"
      ? ["Dry plot", "Survey documents on request", "Good road access", "Developing area"]
      : ["Ground floor", "Busy road frontage", "Suitable for retail or office"],
    images: house ? [...p.images, ...rooms] : p.images,
    videoUrl: house ? asset(`/videos/clip-${clip}.mp4`) : null,
    videoPoster: house ? asset(`/videos/clip-${clip}.jpg`) : null,
    latitude: p.latitude, longitude: p.longitude,
  };
}

export function factsFor(l: Listing): { label: string; value: string }[] {
  const f: { label: string; value: string }[] = [
    { label: "Reference", value: l.ref },
    { label: "Asking price", value: formatPrice(l.price) },
    { label: "Net price", value: formatPrice(l.netPrice) },
    { label: "Property type", value: l.category },
    { label: "Status", value: l.status },
    { label: "Location", value: [l.area, l.city].filter(Boolean).join(", ") },
  ];
  const add = (label: string, v: string | number | null | undefined, suffix = "") => {
    if (v !== null && v !== undefined && v !== "") f.push({ label, value: `${v}${suffix}` });
  };
  add("Size", l.size, ` ${l.sizeUnit}`);
  add("Bedrooms", l.bedrooms);
  add("Bathrooms", l.bathrooms);
  add("Toilets", l.toilets);
  add("Parking", l.parking, " cars");
  add("Year built", l.yearBuilt);
  add("Furnishing", l.furnishing);
  add("Title documents", l.titleDocuments);
  add("Payment options", l.paymentOptions);
  f.push({ label: "Inspection", value: "By appointment" });
  return f;
}

export function youtubeId(url: string | null): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

// ---- loading ----
export async function fetchListings(): Promise<Listing[]> {
  if (!supabase) return samples.map(fromSample);
  const { data, error } = await supabase
    .from("listings").select("*").eq("published", true).order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToListing);
}

let cache: Promise<Listing[]> | null = null;
export const clearListingsCache = () => { cache = null; };

export function useListings() {
  const [state, setState] = useState<{ listings: Listing[]; loading: boolean; error: string | null }>({
    listings: [], loading: true, error: null,
  });
  useEffect(() => {
    let off = false;
    (cache ??= fetchListings())
      .then((listings) => !off && setState({ listings, loading: false, error: null }))
      .catch((e) => {
        cache = null;
        if (!off) setState({ listings: [], loading: false, error: e?.message ?? "Could not load properties" });
      });
    return () => { off = true; };
  }, []);
  return state;
}

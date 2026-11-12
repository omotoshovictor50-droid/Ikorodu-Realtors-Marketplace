import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { properties, formatPrice } from "@/data/properties";
import { getDetails } from "@/data/listing-details";
import { getProperty } from "@/lib/market";
import {
  ENQUIRY_EMAIL,
  emailLink,
  listingRef,
  whatsappLink,
  whatsappText,
} from "@/lib/contact";
import ListingMedia from "@/components/market/ListingMedia";
import ListingCard from "@/components/market/ListingCard";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = getProperty(id);
  if (!p) return {};
  return {
    title: `${p.title} in ${p.area} | Ikorodu Realtors`,
    description: p.description,
  };
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) notFound();

  const d = getDetails(property);
  const similar = properties
    .filter((p) => p.id !== id && p.status === "Available")
    .sort(
      (a, b) =>
        Number(b.category === property.category) * 2 +
        Number(b.area === property.area) -
        (Number(a.category === property.category) * 2 + Number(a.area === property.area))
    )
    .slice(0, 3);

  const inspectLink = whatsappText(
    `Hello, I would like to book an inspection for the ${property.title} in ${property.area} (Ref ${listingRef(property)}).`
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-4 text-sm text-stone-500">
        <Link href="/" className="hover:underline">Browse</Link> /{" "}
        <span>{property.category}</span> / <span>{property.area}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ListingMedia
            images={d.images}
            videoSrc={d.videoSrc}
            poster={d.videoPoster}
            title={property.title}
          />

          <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-stone-900">{property.title}</h1>
              <p className="text-stone-500">{property.address}</p>
            </div>
            <p className="text-3xl font-bold text-[#0F3D2E]">{formatPrice(property.price)}</p>
          </div>

          <h2 className="mb-3 mt-8 text-lg font-bold text-stone-900">Property details</h2>
          <dl className="grid gap-px overflow-hidden rounded-xl border border-stone-200 bg-stone-200 sm:grid-cols-2">
            {d.facts.map((f) => (
              <div key={f.label} className="flex justify-between gap-4 bg-white px-4 py-3 text-sm">
                <dt className="text-stone-500">{f.label}</dt>
                <dd className="text-right font-semibold text-stone-900">{f.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mb-2 mt-8 text-lg font-bold text-stone-900">About this property</h2>
          <p className="leading-relaxed text-stone-700">{property.description}</p>

          <h2 className="mb-3 mt-8 text-lg font-bold text-stone-900">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {d.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-stone-700">
                <Check className="h-4 w-4 text-emerald-700" /> {f}
              </li>
            ))}
          </ul>

          <h2 className="mb-2 mt-8 text-lg font-bold text-stone-900">Location</h2>
          <p className="text-stone-700">{property.address}, {property.city}</p>
          <Link href="/map" className="mt-1 inline-block text-sm font-semibold text-[#0F3D2E] underline">
            View all listings on the map
          </Link>
        </div>

        <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase text-stone-500">Enquire about this property</p>
          <p className="mt-1 text-sm text-stone-600">Ref {listingRef(property)}</p>
          <a
            href={whatsappLink(property)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-live glow-green mt-5 block rounded-lg bg-[#25D366] py-3 text-center text-sm font-semibold text-stone-900"
          >
            Chat on WhatsApp
          </a>
          <a
            href={emailLink(property)}
            className="btn-live glow-forest mt-2 block rounded-lg border border-[#0F3D2E] py-3 text-center text-sm font-semibold text-[#0F3D2E]"
          >
            Email {ENQUIRY_EMAIL}
          </a>
          <a
            href={inspectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-live glow-amber mt-2 block rounded-lg bg-amber-400 py-3 text-center text-sm font-semibold text-stone-900"
          >
            Book an inspection
          </a>
        </aside>
      </div>

      <h2 className="mb-4 mt-12 text-xl font-bold text-stone-900">Similar properties</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {similar.map((p) => (
          <ListingCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}

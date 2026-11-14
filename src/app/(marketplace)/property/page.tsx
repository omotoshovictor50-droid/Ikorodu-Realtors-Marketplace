"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { formatPrice } from "@/data/properties";
import { factsFor, useListings } from "@/lib/listings";
import ListingMedia from "@/components/market/ListingMedia";
import ListingCard from "@/components/market/ListingCard";

export default function PropertyPage() {
  const { listings, loading } = useListings();
  const [id, setId] = useState<string | null | undefined>(undefined);
  useEffect(() => setId(new URLSearchParams(window.location.search).get("id")), []);

  const property = listings.find((l) => l.id === id);

  // Tell the floating WhatsApp button which property is open
  useEffect(() => {
    if (!property) return;
    document.title = `${property.title} in ${property.area} | Ikorodu Realtors`;
    window.dispatchEvent(
      new CustomEvent("wa-context", {
        detail: `Hello, I’m interested in the ${property.title} in ${property.area} (Ref ${property.ref}). Is it still available? I would also like to arrange an inspection.`,
      })
    );
    return () => { window.dispatchEvent(new CustomEvent("wa-context", { detail: null })); };
  }, [property]);

  const similar = useMemo(() => {
    if (!property) return [];
    const score = (l: typeof property) => Number(l.category === property.category) * 2 + Number(l.area === property.area);
    return listings.filter((l) => l.id !== property.id && l.status === "Available").sort((a, b) => score(b) - score(a)).slice(0, 3);
  }, [listings, property]);

  if (id === undefined || loading) return <p className="p-10 text-center text-stone-500">Loading property…</p>;
  if (!property)
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Property not found</h1>
        <p className="mt-2 text-stone-600">It may have been removed or sold.</p>
        <Link href="/" className="mt-6 inline-block font-semibold text-[#0F3D2E] underline">Browse all properties</Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-4 text-sm text-stone-500">
        <Link href="/" className="hover:underline">Browse</Link> / <span>{property.category}</span> / <span>{property.area}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <ListingMedia images={property.images} videoUrl={property.videoUrl} poster={property.videoPoster} title={property.title} />

          <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-stone-900">{property.title}</h1>
              <p className="text-stone-500">{property.address}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-semibold uppercase text-stone-500">Asking price</p>
              <p className="text-3xl font-bold text-[#0F3D2E]">{formatPrice(property.price)}</p>
              <p className="mt-1 text-xs font-semibold uppercase text-stone-500">Net price</p>
              <p className="text-xl font-bold text-emerald-700">{formatPrice(property.netPrice)}</p>
            </div>
          </div>

          <h2 className="mb-3 mt-8 text-lg font-bold text-stone-900">Property details</h2>
          <dl className="grid gap-px overflow-hidden rounded-xl border border-stone-200 bg-stone-200 sm:grid-cols-2">
            {factsFor(property).map((f) => (
              <div key={f.label} className="flex justify-between gap-4 bg-white px-4 py-3 text-sm">
                <dt className="text-stone-500">{f.label}</dt>
                <dd className="text-right font-semibold text-stone-900">{f.value}</dd>
              </div>
            ))}
          </dl>

          {property.description && (
            <>
              <h2 className="mb-2 mt-8 text-lg font-bold text-stone-900">About this property</h2>
              <p className="whitespace-pre-line leading-relaxed text-stone-700">{property.description}</p>
            </>
          )}

          {property.features.length > 0 && (
            <>
              <h2 className="mb-3 mt-8 text-lg font-bold text-stone-900">Features</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {property.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-stone-700">
                    <Check className="h-4 w-4 text-emerald-700" /> {f}
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mb-2 mt-8 text-lg font-bold text-stone-900">Location</h2>
          <p className="text-stone-700">{[property.address, property.city].filter(Boolean).join(", ")}</p>
          <Link href="/map" className="mt-1 inline-block text-sm font-semibold text-[#0F3D2E] underline">
            View all listings on the map
          </Link>
        </div>

        <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase text-stone-500">Interested in this property?</p>
          <p className="mt-1 text-lg font-bold text-[#0F3D2E]">Ref {property.ref}</p>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Tap the green WhatsApp button at the bottom right of your screen. We will confirm
            availability, answer your questions and arrange your inspection.
          </p>
        </aside>
      </div>

      {similar.length > 0 && (
        <>
          <h2 className="mb-4 mt-12 text-xl font-bold text-stone-900">Similar properties</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => <ListingCard key={p.id} property={p} />)}
          </div>
        </>
      )}
    </div>
  );
}

import { notFound } from "next/navigation";
import { BadgeCheck, MessageCircle } from "lucide-react";
import ListingCard from "@/components/market/ListingCard";
import { realtors } from "@/data/realtors";
import { formatPriceShort } from "@/data/properties";
import { areasFor, getRealtor, listingsFor } from "@/lib/market";

export function generateStaticParams() {
  return realtors.map((r) => ({ id: r.id }));
}

export default async function RealtorStorefront({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const realtor = getRealtor(id);
  if (!realtor) notFound();

  const listings = listingsFor(id);
  const prices = listings.map((p) => p.price);
  const available = listings.filter((p) => p.status === "Available").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-stone-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-[#0F3D2E]">
            {realtor.initials}
          </div>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-stone-900">
              {realtor.name}
              {realtor.verified && <BadgeCheck className="h-5 w-5 text-emerald-700" />}
            </h1>
            <p className="text-stone-500">{realtor.agency} · {realtor.yearsActive} years active</p>
            <p className="mt-1 max-w-xl text-sm text-stone-600">{realtor.bio}</p>
          </div>
        </div>
        <button type="button" className="flex items-center gap-2 rounded-lg bg-[#0F3D2E] px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-900">
          <MessageCircle className="h-4 w-4" /> Message {realtor.name.split(" ")[0]}
        </button>
      </div>

      <dl className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <dt className="text-xs font-semibold uppercase text-stone-500">Listings</dt>
          <dd className="mt-1 text-xl font-bold">{listings.length} <span className="text-sm font-medium text-stone-500">({available} available)</span></dd>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <dt className="text-xs font-semibold uppercase text-stone-500">Price range</dt>
          <dd className="mt-1 text-xl font-bold">{formatPriceShort(Math.min(...prices))} – {formatPriceShort(Math.max(...prices))}</dd>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <dt className="text-xs font-semibold uppercase text-stone-500">Areas</dt>
          <dd className="mt-1 text-sm font-semibold">{areasFor(id).join(", ")}</dd>
        </div>
      </dl>

      <h2 className="mb-4 mt-10 text-xl font-bold text-stone-900">Listings by {realtor.name}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listings.map((p) => <ListingCard key={p.id} property={p} />)}
      </div>
    </div>
  );
}

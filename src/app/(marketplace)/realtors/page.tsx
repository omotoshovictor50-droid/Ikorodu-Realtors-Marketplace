import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { realtors } from "@/data/realtors";
import { areasFor, listingsFor } from "@/lib/market";

export default function RealtorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-900">Realtors</h1>
      <p className="mt-1 text-stone-600">
        {realtors.length} sellers listing across Ikorodu. Open a storefront to see everything they offer.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {realtors.map((r) => (
          <Link
            key={r.id}
            href={`/realtors/${r.id}`}
            className="rounded-2xl border border-stone-200 bg-white p-5 transition hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 font-bold text-[#0F3D2E]">
              {r.initials}
            </div>
            <h2 className="mt-3 font-semibold text-stone-900">{r.name}</h2>
            <p className="text-sm text-stone-500">{r.agency}</p>
            <p className="mt-2 text-sm text-stone-600">
              {listingsFor(r.id).length} listings · {areasFor(r.id).length} areas
            </p>
            {r.verified && (
              <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-700">
                <BadgeCheck className="h-4 w-4" /> Verified
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

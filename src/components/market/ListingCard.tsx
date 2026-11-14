import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize } from "lucide-react";
import { formatPrice } from "@/data/properties";
import { Listing } from "@/lib/listings";

export default function ListingCard({ property }: { property: Listing }) {
  const href = `/property/?id=${property.id}`;
  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:shadow-md">
      <Link href={href} className="block">
        <div className="relative h-44 bg-stone-100">
          {property.images[0] ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-stone-400">Photos coming soon</div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-[#0F3D2E]">
            {property.category}
          </span>
          {property.status !== "Available" && (
            <span className="absolute right-3 top-3 rounded-full bg-stone-900/80 px-2.5 py-0.5 text-xs font-semibold text-white">
              {property.status}
            </span>
          )}
        </div>
        <div className="p-4 pb-3">
          <p className="text-xl font-bold text-stone-900">
            {formatPrice(property.price)}{" "}
            <span className="text-xs font-medium text-stone-500">Asking</span>
          </p>
          <p className="text-sm font-semibold text-emerald-700">Net: {formatPrice(property.netPrice)}</p>
          <h3 className="mt-1 truncate text-sm font-semibold text-stone-800">{property.title}</h3>
          <p className="truncate text-xs text-stone-500">{[property.address, property.area].filter(Boolean).join(", ")}</p>
          <div className="mt-2 flex items-center gap-3 text-xs text-stone-500">
            {property.bedrooms != null && (
              <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" />{property.bedrooms}</span>
            )}
            {property.bathrooms != null && (
              <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{property.bathrooms}</span>
            )}
            {property.size != null && (
              <span className="flex items-center gap-1">
                <Maximize className="h-3.5 w-3.5" />
                {property.size} {property.sizeUnit}
              </span>
            )}
          </div>
          <p className="mt-1 text-[11px] text-stone-400">Ref {property.ref}</p>
        </div>
      </Link>
      <Link href={href} className="block border-t border-stone-100 py-3 text-center text-sm font-semibold text-[#0F3D2E] hover:bg-stone-50">
        View details →
      </Link>
    </article>
  );
}

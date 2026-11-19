"use client";

import Image from "next/image";
import { Bed, Bath, Maximize, MoreVertical, Send } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export default function PropertyCard({
  property,
  isSelected,
  onSelect,
}: PropertyCardProps) {
  return (
    <div
      onClick={() => onSelect?.(property.id)}
      className={cn(
        "group cursor-pointer overflow-hidden rounded-xl border bg-white transition-all hover:shadow-md",
        isSelected
          ? "border-blue-500 ring-2 ring-blue-100 shadow-md"
          : "border-gray-200"
      )}
    >
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 320px"
          unoptimized
        />
        <div className="absolute left-2.5 top-2.5">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              property.status === "Available"
                ? "bg-emerald-100 text-emerald-700"
                : property.status === "Sold"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-amber-100 text-amber-700"
            )}
          >
            {property.status}
          </span>
        </div>
        <button
          type="button"
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-600 opacity-0 transition group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3.5">
        <p className="text-lg font-bold text-gray-900">
          {formatPrice(property.price)}
        </p>
        <h3 className="mt-0.5 truncate text-sm font-semibold text-gray-800">
          {property.title}
        </h3>
        <p className="mt-0.5 truncate text-xs text-gray-500">
          {property.address}, {property.area}
        </p>

        {/* Specs */}
        <div className="mt-2.5 flex items-center gap-3 text-xs text-gray-500">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              {property.bathrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" />
            {property.size} {property.sizeUnit}
          </span>
        </div>

        {/* Category + Action */}
        <div className="mt-3 flex items-center justify-between">
          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
            {property.category}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              // Enquiry action
            }}
            className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <Send className="h-3 w-3" />
            Send Enquiry
          </button>
        </div>
      </div>
    </div>
  );
}

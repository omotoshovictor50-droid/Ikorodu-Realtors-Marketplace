"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { properties, formatPriceShort } from "@/data/properties";
import { areas, categories } from "@/lib/market";

const PropertyMap = dynamic(() => import("@/components/PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-stone-100 text-sm text-stone-500">
      Loading map…
    </div>
  ),
});

const selectCls =
  "rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-700";

export default function MapPage() {
  const [category, setCategory] = useState("all");
  const [area, setArea] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      properties.filter(
        (p) =>
          p.status === "Available" &&
          (category === "all" || p.category === category) &&
          (area === "all" || p.area === area)
      ),
    [category, area]
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 bg-white px-4 py-3">
        <select aria-label="Type" className={selectCls} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All types</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select aria-label="Area" className={selectCls} value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="all">All areas</option>
          {areas.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <span className="text-sm text-stone-500">{filtered.length} on the map</span>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <ul className="hidden w-80 overflow-y-auto border-r border-stone-200 bg-white md:block">
          {filtered.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setSelectedId(p.id)}
                className={`w-full border-b border-stone-100 px-4 py-3 text-left hover:bg-stone-50 ${
                  selectedId === p.id ? "bg-emerald-50" : ""
                }`}
              >
                <span className="block text-sm font-bold text-stone-900">{formatPriceShort(p.price)}</span>
                <span className="block truncate text-sm text-stone-700">{p.title}</span>
                <span className="block truncate text-xs text-stone-500">{p.area}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="relative flex-1">
          <PropertyMap
            properties={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
            linkBase="/listings"
          />
        </div>
      </div>
    </div>
  );
}

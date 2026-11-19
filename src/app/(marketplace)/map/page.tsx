"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { formatPriceShort } from "@/data/properties";
import { CATEGORIES, useListings } from "@/lib/listings";

const MarketMap = dynamic(() => import("@/components/market/MarketMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-stone-100 text-sm text-stone-500">Loading map…</div>
  ),
});

const selectCls = "rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-700";

export default function MapPage() {
  const { listings, loading } = useListings();
  const [category, setCategory] = useState("all");
  const [area, setArea] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const mappable = useMemo(
    () => listings.filter((p) => p.status === "Available" && p.latitude != null && p.longitude != null),
    [listings]
  );
  const areas = useMemo(() => Array.from(new Set(mappable.map((p) => p.area).filter(Boolean))).sort(), [mappable]);
  const filtered = useMemo(
    () => mappable.filter((p) => (category === "all" || p.category === category) && (area === "all" || p.area === area)),
    [mappable, category, area]
  );

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 bg-white px-4 py-3">
        <select aria-label="Type" className={selectCls} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All types</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select aria-label="Area" className={selectCls} value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="all">All areas</option>
          {areas.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <span className="text-sm text-stone-500">{loading ? "Loading…" : `${filtered.length} on the map`}</span>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <ul className="hidden w-80 overflow-y-auto border-r border-stone-200 bg-white md:block">
          {filtered.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setSelectedId(p.id)}
                className={`w-full border-b border-stone-100 px-4 py-3 text-left hover:bg-stone-50 ${selectedId === p.id ? "bg-emerald-50" : ""}`}
              >
                <span className="block text-sm font-bold text-stone-900">{formatPriceShort(p.price)}</span>
                <span className="block truncate text-sm text-stone-700">{p.title}</span>
                <span className="block truncate text-xs text-stone-500">{p.area}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="relative flex-1">
          <MarketMap items={filtered} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </div>
    </div>
  );
}

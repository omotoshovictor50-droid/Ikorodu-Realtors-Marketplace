"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { properties } from "@/data/properties";
import { areas, categories } from "@/lib/market";
import ListingCard from "./ListingCard";

const PAGE_SIZE = 24;

const budgets = [
  { label: "Any budget", min: 0, max: Infinity },
  { label: "Under ₦30M", min: 0, max: 30_000_000 },
  { label: "₦30M – ₦60M", min: 30_000_000, max: 60_000_000 },
  { label: "₦60M – ₦100M", min: 60_000_000, max: 100_000_000 },
  { label: "Over ₦100M", min: 100_000_000, max: Infinity },
];

const selectCls =
  "rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700";

export default function MarketBrowser() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [area, setArea] = useState("all");
  const [status, setStatus] = useState("all");
  const [budget, setBudget] = useState(0);
  const [sort, setSort] = useState("newest");
  const [pages, setPages] = useState(1);

  const reset = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setPages(1);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const b = budgets[budget];
    const result = properties.filter(
      (p) =>
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)) &&
        (category === "all" || p.category === category) &&
        (area === "all" || p.area === area) &&
        (status === "all" || p.status === status) &&
        p.price >= b.min &&
        p.price < b.max
    );
    if (sort === "price-asc") result.sort((a, c) => a.price - c.price);
    if (sort === "price-desc") result.sort((a, c) => c.price - a.price);
    return result;
  }, [search, category, area, status, budget, sort]);

  const shown = filtered.slice(0, pages * PAGE_SIZE);

  return (
    <section id="browse" className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center gap-2">
        {["all", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => reset(setCategory)(c)}
            className={`chip-live rounded-full border px-4 py-2 text-sm font-medium ${
              category === c
                ? "chip-on border-[#0F3D2E] bg-[#0F3D2E] text-white"
                : "border-stone-300 bg-white text-stone-700 hover:border-stone-400"
            }`}
          >
            {c === "all" ? "All types" : c}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => reset(setSearch)(e.target.value)}
            placeholder="Search by title, street or type"
            aria-label="Search listings"
            className="w-full rounded-lg border border-stone-200 bg-white py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>
        <select aria-label="Area" className={selectCls} value={area} onChange={(e) => reset(setArea)(e.target.value)}>
          <option value="all">All areas</option>
          {areas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        <select aria-label="Budget" className={selectCls} value={budget} onChange={(e) => reset(setBudget)(Number(e.target.value))}>
          {budgets.map((b, i) => (
            <option key={b.label} value={i}>{b.label}</option>
          ))}
        </select>
        <select aria-label="Status" className={selectCls} value={status} onChange={(e) => reset(setStatus)(e.target.value)}>
          <option value="all">Any status</option>
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <select aria-label="Sort" className={selectCls} value={sort} onChange={(e) => reset(setSort)(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <p className="mb-4 mt-6 text-sm text-stone-500">
        Showing {shown.length} of {filtered.length} properties
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((p) => (
          <ListingCard key={p.id} property={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-stone-300 bg-white p-10 text-center text-sm text-stone-500">
          No properties match these filters.
        </div>
      )}

      {shown.length < filtered.length && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setPages((n) => n + 1)}
            className="btn-live glow-forest rounded-lg border border-[#0F3D2E] px-6 py-2.5 text-sm font-semibold text-[#0F3D2E]"
          >
            Show more
          </button>
        </div>
      )}
    </section>
  );
}

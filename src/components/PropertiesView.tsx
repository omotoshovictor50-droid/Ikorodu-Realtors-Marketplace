"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  Plus,
  Download,
  ChevronDown,
  Save,
} from "lucide-react";
import { properties as allProperties, Property } from "@/data/properties";
import PropertyCard from "./PropertyCard";

const PropertyMap = dynamic(() => import("./PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-100 rounded-xl">
      <p className="text-sm text-gray-500">Loading map…</p>
    </div>
  ),
});

export default function PropertiesView() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">(
    "newest"
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    let result = [...allProperties];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    // newest keeps original order

    return result;
  }, [search, statusFilter, sortBy]);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Page header + toolbar */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Properties</h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Property
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search properties..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Save className="h-4 w-4" />
            Save Search
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Bulk Actions
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          <div className="flex rounded-lg border border-gray-200 bg-white">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex h-9 w-9 items-center justify-center rounded-l-lg ${
                viewMode === "list"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex h-9 w-9 items-center justify-center rounded-r-lg ${
                viewMode === "grid"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All statuses</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Unavailable">Unavailable</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "newest" | "price-asc" | "price-desc")
            }
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="newest">Newest to Oldest</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
          </select>
        </div>
      </div>

      {/* Main split: list + map */}
      <div className="flex flex-1 overflow-hidden">
        {/* Property list */}
        <div className="w-full max-w-md overflow-y-auto border-r border-gray-200 bg-gray-50 p-4 lg:w-[420px]">
          <p className="mb-3 text-xs font-medium text-gray-500">
            Showing {filtered.length} of {allProperties.length} properties
          </p>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
                : "flex flex-col gap-3"
            }
          >
            {filtered.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSelected={selectedId === property.id}
                onSelect={setSelectedId}
              />
            ))}
            {filtered.length === 0 && (
              <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
                <p className="text-sm text-gray-500">No properties found</p>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="relative hidden flex-1 md:block">
          <PropertyMap
            properties={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </div>
    </div>
  );
}

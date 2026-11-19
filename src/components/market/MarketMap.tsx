"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { formatPrice, formatPriceShort } from "@/data/properties";
import { Listing } from "@/lib/listings";

const priceIcon = (price: number, selected: boolean) =>
  L.divIcon({
    className: "",
    html: `<div style="background:${selected ? "#C9962B" : "#0F3D2E"};color:#fff;padding:4px 10px;border-radius:9999px;font-size:12px;font-weight:600;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.25);border:2px solid #fff;transform:translate(-50%,-100%)">${formatPriceShort(price)}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

function Fly({ selected, items }: { selected: string | null; items: Listing[] }) {
  const map = useMap();
  useEffect(() => {
    const p = items.find((i) => i.id === selected);
    if (p && p.latitude != null && p.longitude != null) map.flyTo([p.latitude, p.longitude], 15, { duration: 0.8 });
  }, [selected, items, map]);
  return null;
}

export default function MarketMap({
  items, selectedId, onSelect,
}: { items: Listing[]; selectedId: string | null; onSelect: (id: string) => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="flex h-full items-center justify-center bg-stone-100 text-sm text-stone-500">Loading map…</div>;

  return (
    <MapContainer center={[6.6194, 3.5105]} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Fly selected={selectedId} items={items} />
      {items.map((p) => (
        <Marker
          key={p.id}
          position={[p.latitude as number, p.longitude as number]}
          icon={priceIcon(p.price, selectedId === p.id)}
          eventHandlers={{ click: () => onSelect(p.id) }}
        >
          <Popup minWidth={220}>
            <div style={{ fontFamily: "system-ui" }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{formatPrice(p.price)}</div>
              <div style={{ fontWeight: 600 }}>{p.title}</div>
              <div style={{ color: "#666", fontSize: 12 }}>{p.area}</div>
              <Link href={`/property/?id=${p.id}`} style={{ color: "#0F3D2E", fontWeight: 600, fontSize: 13, textDecoration: "underline" }}>
                View details
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

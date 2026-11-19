"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { Bed, Bath, Maximize, ExternalLink } from "lucide-react";
import { Property, formatPrice, formatPriceShort } from "@/data/properties";
import Link from "next/link";

// Fix default marker icons in Next.js
const createPriceIcon = (price: number, isSelected: boolean) => {
  const label = formatPriceShort(price);
  return L.divIcon({
    className: "",
    html: `
      <div style="
        background: ${isSelected ? "#1d4ed8" : "#2563eb"};
        color: white;
        padding: 4px 10px;
        border-radius: 9999px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        border: 2px solid white;
        transform: translate(-50%, -100%);
      ">
        ${label}
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

function MapController({
  selectedId,
  properties,
}: {
  selectedId: string | null;
  properties: Property[];
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedId) {
      const prop = properties.find((p) => p.id === selectedId);
      if (prop) {
        map.flyTo([prop.latitude, prop.longitude], 15, { duration: 0.8 });
      }
    }
  }, [selectedId, properties, map]);

  return null;
}

interface PropertyMapProps {
  properties: Property[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  linkBase?: string;
}

export default function PropertyMap({
  properties,
  selectedId,
  onSelect,
  linkBase = "/properties",
}: PropertyMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
        <p className="text-sm text-gray-500">Loading map…</p>
      </div>
    );
  }

  // Center of Ikorodu
  const center: [number, number] = [6.6194, 3.5105];

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="h-full w-full rounded-xl"
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController selectedId={selectedId} properties={properties} />

      {properties
        .filter((p) => p.status === "Available")
        .map((property) => (
          <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
            icon={createPriceIcon(property.price, selectedId === property.id)}
            eventHandlers={{
              click: () => onSelect(property.id),
            }}
          >
            <Popup className="property-popup" minWidth={260}>
              <div className="overflow-hidden rounded-lg">
                <div className="relative h-32 w-full">
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-3">
                  <p className="text-base font-bold text-gray-900">
                    {formatPrice(property.price)}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-gray-800">
                    {property.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {property.address}, {property.area}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
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
                  <Link
                    href={`${linkBase}/${property.id}`}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
                  >
                    View Property
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}

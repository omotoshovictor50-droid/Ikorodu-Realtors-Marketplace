"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const pin = L.divIcon({
  className: "",
  html: '<div style="width:22px;height:22px;border-radius:50% 50% 50% 0;background:#C9962B;border:3px solid #0F3D2E;transform:translate(-50%,-100%) rotate(-45deg)"></div>',
  iconSize: [0, 0],
});

function Clicker({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({ click: (e) => onPick(Number(e.latlng.lat.toFixed(6)), Number(e.latlng.lng.toFixed(6))) });
  return null;
}

function Recenter({ lat, lng }: { lat: number | null; lng: number | null }) {
  const map = useMap();
  useEffect(() => {
    if (lat != null && lng != null) map.setView([lat, lng], Math.max(map.getZoom(), 15));
  }, [lat, lng, map]);
  return null;
}

export default function LocationPicker({
  lat, lng, onPick,
}: { lat: number | null; lng: number | null; onPick: (lat: number, lng: number) => void }) {
  const has = lat != null && lng != null;
  return (
    <MapContainer center={has ? [lat, lng] : [6.6194, 3.5105]} zoom={has ? 15 : 13} style={{ height: 320, width: "100%" }} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Clicker onPick={onPick} />
      <Recenter lat={lat} lng={lng} />
      {has && <Marker position={[lat, lng]} icon={pin} />}
    </MapContainer>
  );
}

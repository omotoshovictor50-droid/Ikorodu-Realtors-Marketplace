"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { AREAS, CATEGORIES, Listing, ListingStatus, youtubeId } from "@/lib/listings";
import { compressImage, saveListing, uploadMedia } from "@/lib/admin-api";
import { formatPrice } from "@/data/properties";

const LocationPicker = dynamic(() => import("./LocationPicker"), {
  ssr: false,
  loading: () => <div className="flex h-80 items-center justify-center bg-stone-100 text-sm text-stone-500">Loading map…</div>,
});

const inp = "mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700";
const num = (v: string) => (v === "" ? null : Number(v));

function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block text-sm font-medium text-stone-700 ${className}`}>
      {label}
      {children}
      {hint && <span className="mt-1 block text-xs font-normal text-stone-500">{hint}</span>}
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6">
      <h2 className="mb-4 text-base font-bold text-[#0F3D2E]">{title}</h2>
      {children}
    </section>
  );
}

export default function ListingEditor({
  initial, isNew, onDone,
}: { initial: Listing; isNew: boolean; onDone: (saved: boolean) => void }) {
  const [l, setL] = useState<Listing>(initial);
  const [featuresText, setFeaturesText] = useState(initial.features.join("\n"));
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof Listing>(k: K, v: Listing[K]) => setL((p) => ({ ...p, [k]: v }));

  const addImages = async (files: FileList | null) => {
    // Snapshot the FileList before the input is cleared in onChange.
    // Clearing input.value can empty the original FileList during async uploads.
    const selectedFiles = files ? Array.from(files) : [];
    if (selectedFiles.length === 0) return;

    setError(null);
    const urls: string[] = [];
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setUploading(`Uploading photo ${i + 1} of ${selectedFiles.length}…`);
        const blob = await compressImage(file);
        const filename = file.name.replace(/\.[^.]+$/, "") + ".jpg";
        urls.push(await uploadMedia(l.id, blob, filename));
      }
      setL((p) => ({ ...p, images: [...p.images, ...urls] }));
    } catch (e) {
      setError(`Photo upload failed: ${(e as Error).message}`);
    } finally {
      setUploading(null);
    }
  };

  const addVideo = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setError("Please choose a video file.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError("That video is over 50 MB. Please shorten or compress it and choose it again.");
      return;
    }
    setError(null);
    setUploading("Uploading video… this can take a minute");
    try {
      set("videoUrl", await uploadMedia(l.id, file, file.name));
    } catch (e) {
      setError(`Video upload failed: ${(e as Error).message}`);
    }
    setUploading(null);
  };

  const move = (i: number, d: number) =>
    setL((p) => {
      const a = [...p.images];
      const j = i + d;
      if (j < 0 || j >= a.length) return p;

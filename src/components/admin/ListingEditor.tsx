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
    if (!files?.length) return;
    setError(null);
    const urls: string[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        setUploading(`Uploading photo ${i + 1} of ${files.length}…`);
        const blob = await compressImage(files[i]);
        urls.push(await uploadMedia(l.id, blob, files[i].name.replace(/\.[^.]+$/, "") + ".jpg"));
      }
      setL((p) => ({ ...p, images: [...p.images, ...urls] }));
    } catch (e) {
      setError(`Photo upload failed: ${(e as Error).message}`);
    }
    setUploading(null);
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
      [a[i], a[j]] = [a[j], a[i]];
      return { ...p, images: a };
    });

  const locate = () =>
    navigator.geolocation?.getCurrentPosition(
      (pos) => setL((p) => ({ ...p, latitude: Number(pos.coords.latitude.toFixed(6)), longitude: Number(pos.coords.longitude.toFixed(6)) })),
      () => setError("Could not get your location. Click the map instead.")
    );

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!l.title.trim()) return setError("Please enter a title.");
    if (!l.price) return setError("Please enter the asking price.");
    setBusy(true);
    setError(null);
    try {
      await saveListing(
        { ...l, title: l.title.trim(), features: featuresText.split("\n").map((s) => s.trim()).filter(Boolean) },
        isNew
      );
      onDone(true);
    } catch (e) {
      setError(`Could not save: ${(e as Error).message}`);
      setBusy(false);
    }
  };

  const yt = youtubeId(l.videoUrl);

  return (
    <form onSubmit={save} className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">{isNew ? "Add property" : `Edit ${l.ref || "property"}`}</h1>
        <button type="button" onClick={() => onDone(false)} className="text-sm font-semibold text-stone-600 underline">Cancel</button>
      </div>

      <Section title="Basic details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title *" className="sm:col-span-2">
            <input className={inp} value={l.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. 4 Bedroom Detached Duplex" />
          </Field>
          <Field label="Property type">
            <select className={inp} value={l.category} onChange={(e) => set("category", e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select className={inp} value={l.status} onChange={(e) => set("status", e.target.value as ListingStatus)}>
              <option>Available</option><option>Sold</option><option>Unavailable</option>
            </select>
          </Field>
          <Field label="Asking price (₦) *" hint={l.price ? formatPrice(l.price) : undefined}>
            <input type="number" min={0} className={inp} value={l.price || ""} onChange={(e) => set("price", Number(e.target.value))} />
          </Field>
          <Field label="Net price (₦)" hint={l.netPrice ? formatPrice(l.netPrice) : "Lowest price the owner will accept"}>
            <input type="number" min={0} className={inp} value={l.netPrice || ""} onChange={(e) => set("netPrice", Number(e.target.value))} />
          </Field>
          <label className="flex items-center gap-2 text-sm font-medium text-stone-700 sm:col-span-2">
            <input type="checkbox" checked={l.published} onChange={(e) => set("published", e.target.checked)} className="h-4 w-4" />
            Show this property on the website
          </label>
        </div>
      </Section>

      <Section title="Property details">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Size"><input type="number" min={0} className={inp} value={l.size ?? ""} onChange={(e) => set("size", num(e.target.value))} /></Field>
          <Field label="Size unit">
            <select className={inp} value={l.sizeUnit} onChange={(e) => set("sizeUnit", e.target.value)}>
              <option>sqm</option><option>sqft</option><option>plots</option><option>acres</option>
            </select>
          </Field>
          <Field label="Year built"><input type="number" className={inp} value={l.yearBuilt ?? ""} onChange={(e) => set("yearBuilt", num(e.target.value))} /></Field>
          <Field label="Bedrooms"><input type="number" min={0} className={inp} value={l.bedrooms ?? ""} onChange={(e) => set("bedrooms", num(e.target.value))} /></Field>
          <Field label="Bathrooms"><input type="number" min={0} className={inp} value={l.bathrooms ?? ""} onChange={(e) => set("bathrooms", num(e.target.value))} /></Field>
          <Field label="Toilets"><input type="number" min={0} className={inp} value={l.toilets ?? ""} onChange={(e) => set("toilets", num(e.target.value))} /></Field>
          <Field label="Parking spaces"><input type="number" min={0} className={inp} value={l.parking ?? ""} onChange={(e) => set("parking", num(e.target.value))} /></Field>
          <Field label="Furnishing">
            <select className={inp} value={l.furnishing ?? ""} onChange={(e) => set("furnishing", e.target.value || null)}>
              <option value="">Not applicable</option><option>Unfurnished</option><option>Semi-furnished</option><option>Furnished</option>
            </select>
          </Field>
          <span className="hidden sm:block" />
          <Field label="Title documents" className="sm:col-span-3" hint="Example: C of O, Governor’s Consent, Deed of Assignment. Only write what is true.">
            <input className={inp} value={l.titleDocuments} onChange={(e) => set("titleDocuments", e.target.value)} />
          </Field>
          <Field label="Payment options" className="sm:col-span-3">
            <input className={inp} value={l.paymentOptions} onChange={(e) => set("paymentOptions", e.target.value)} />
          </Field>
          <Field label="Description" className="sm:col-span-3">
            <textarea rows={5} className={inp} value={l.description} onChange={(e) => set("description", e.target.value)} />
          </Field>
          <Field label="Features (one per line)" className="sm:col-span-3">
            <textarea rows={5} className={inp} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder={"Fitted kitchen\n24/7 security\nBorehole water"} />
          </Field>
        </div>
      </Section>

      <Section title="Location">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Street / address" className="sm:col-span-3">
            <input className={inp} value={l.address} onChange={(e) => set("address", e.target.value)} placeholder="e.g. 12 Unity Close, Agric" />
          </Field>
          <Field label="Area">
            <input list="areas" className={inp} value={l.area} onChange={(e) => set("area", e.target.value)} />
            <datalist id="areas">{AREAS.map((a) => <option key={a} value={a} />)}</datalist>
          </Field>
          <Field label="City"><input className={inp} value={l.city} onChange={(e) => set("city", e.target.value)} /></Field>
          <span className="hidden sm:block" />
          <Field label="Latitude"><input type="number" step="any" className={inp} value={l.latitude ?? ""} onChange={(e) => set("latitude", num(e.target.value))} /></Field>
          <Field label="Longitude"><input type="number" step="any" className={inp} value={l.longitude ?? ""} onChange={(e) => set("longitude", num(e.target.value))} /></Field>
          <div className="flex items-end">
            <button type="button" onClick={locate} className="w-full rounded-lg border border-[#0F3D2E] px-3 py-2.5 text-sm font-semibold text-[#0F3D2E]">Use my current location</button>
          </div>
        </div>
        <p className="mb-2 mt-4 text-sm text-stone-600">Or click the map to place the pin. Properties without a pin do not appear on the map page.</p>
        <div className="overflow-hidden rounded-xl border border-stone-200">
          <LocationPicker lat={l.latitude} lng={l.longitude} onPick={(la, lo) => setL((p) => ({ ...p, latitude: la, longitude: lo }))} />
        </div>
      </Section>

      <Section title="Photos">
        <input type="file" accept="image/*" multiple onChange={(e) => { addImages(e.target.files); e.target.value = ""; }}
          className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#0F3D2E] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" />
        <p className="mt-1 text-xs text-stone-500">Photos are resized automatically. The first photo is the cover on the website.</p>
        {l.images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {l.images.map((src, i) => (
              <div key={src} className="overflow-hidden rounded-lg border border-stone-200 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-24 w-full object-cover" />
                <div className="flex items-center justify-between px-2 py-1.5 text-xs">
                  <span className="font-semibold text-[#0F3D2E]">{i === 0 ? "Cover" : i + 1}</span>
                  <span className="flex gap-1">
                    <button type="button" aria-label="Move left" onClick={() => move(i, -1)} className="rounded p-1 hover:bg-stone-100"><ArrowLeft className="h-3.5 w-3.5" /></button>
                    <button type="button" aria-label="Move right" onClick={() => move(i, 1)} className="rounded p-1 hover:bg-stone-100"><ArrowRight className="h-3.5 w-3.5" /></button>
                    <button type="button" aria-label="Remove photo" onClick={() => setL((p) => ({ ...p, images: p.images.filter((_, j) => j !== i) }))} className="rounded p-1 text-red-600 hover:bg-red-50"><X className="h-3.5 w-3.5" /></button>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Video tour">
        <label className="block text-sm font-medium text-stone-700">
          Choose a video file from your phone or computer
          <input type="file" accept="video/*" onChange={(e) => { addVideo(e.target.files?.[0]); e.target.value = ""; }}
            className="mt-2 block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#0F3D2E] file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white" />
        </label>
        <p className="mt-1 text-xs text-stone-500">MP4 works best. Maximum size 50 MB. Choosing a new file replaces the current video.</p>
        {l.videoUrl && (
          <div className="mt-4">
            {yt ? (
              <iframe className="aspect-video w-full max-w-md rounded-lg" src={`https://www.youtube.com/embed/${yt}`} title="Video preview" allowFullScreen />
            ) : (
              <video src={l.videoUrl} controls playsInline className="max-h-64 w-full max-w-md rounded-lg bg-black" />
            )}
            <button type="button" onClick={() => set("videoUrl", null)} className="mt-2 text-sm font-semibold text-red-600 underline">Remove video</button>
          </div>
        )}
      </Section>

      {uploading && <p className="rounded-lg bg-amber-50 p-3 text-sm font-medium text-amber-800">{uploading}</p>}
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}

      <div className="sticky bottom-0 -mx-4 flex gap-3 border-t border-stone-200 bg-stone-100/95 px-4 py-4 backdrop-blur">
        <button type="submit" disabled={busy || !!uploading}
          className="btn-live glow-forest rounded-lg bg-[#0F3D2E] px-8 py-3 text-sm font-semibold text-white disabled:opacity-60">
          {busy ? "Saving…" : isNew ? "Publish property" : "Save changes"}
        </button>
        <button type="button" onClick={() => onDone(false)} className="rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700">Cancel</button>
      </div>
    </form>
  );
}

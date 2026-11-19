"use client";

import { useState } from "react";
import Image from "next/image";
import { youtubeId } from "@/lib/listings";

export default function ListingMedia({
  images, videoUrl, poster, title,
}: { images: string[]; videoUrl: string | null; poster?: string | null; title: string }) {
  const [tab, setTab] = useState<"photos" | "video">("photos");
  const [i, setI] = useState(0);
  const yt = youtubeId(videoUrl);

  const tabCls = (on: boolean) =>
    `chip-live rounded-full border px-4 py-2 text-sm font-medium ${
      on ? "chip-on border-[#0F3D2E] bg-[#0F3D2E] text-white" : "border-stone-300 bg-white text-stone-700"
    }`;

  return (
    <div>
      <div className="mb-3 flex gap-2">
        <button type="button" className={tabCls(tab === "photos")} onClick={() => setTab("photos")}>
          Photos ({images.length})
        </button>
        {videoUrl && (
          <button type="button" className={tabCls(tab === "video")} onClick={() => setTab("video")}>
            Video tour
          </button>
        )}
      </div>

      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-stone-900">
        {tab === "photos" ? (
          images.length ? (
            <Image
              key={images[i]} src={images[i]} alt={`${title} photo ${i + 1}`} fill unoptimized
              className="object-cover" sizes="(max-width: 1024px) 100vw, 720px" priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-stone-400">Photos coming soon</div>
          )
        ) : yt ? (
          <iframe
            className="h-full w-full" src={`https://www.youtube.com/embed/${yt}`} title={`${title} video tour`}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen
          />
        ) : (
          <video
            src={videoUrl ?? undefined} poster={poster ?? undefined} controls autoPlay muted loop playsInline
            className="h-full w-full object-contain"
          />
        )}
      </div>

      {tab === "photos" && images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, idx) => (
            <button
              key={src} type="button" onClick={() => setI(idx)} aria-label={`Show photo ${idx + 1}`}
              className={`relative h-16 w-24 flex-none overflow-hidden rounded-lg border-2 transition hover:scale-105 ${idx === i ? "border-[#0F3D2E]" : "border-transparent opacity-80"}`}
            >
              <Image src={src} alt="" fill unoptimized className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/assets";

// Branded loading screen: the logo with a gold shine and a progress bar.
// Shown on every full page load for at least 1.6s, then fades out.
export default function Splash() {
  const [state, setState] = useState<"show" | "hide" | "gone">("show");

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const finish = () => {
      t = setTimeout(() => setState("hide"), Math.max(0, 1600 - performance.now()));
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", finish);
    };
  }, []);

  useEffect(() => {
    if (state !== "hide") return;
    const t = setTimeout(() => setState("gone"), 700);
    return () => clearTimeout(t);
  }, [state]);

  if (state === "gone") return null;

  return (
    <div
      className={`splash fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white ${state === "hide" ? "splash-hide" : ""}`}
      role="status"
      aria-label="Loading Ikorodu Realtors"
    >
      <div className="splash-logo relative w-[min(78vw,460px)] overflow-hidden">
        <Image
          src={asset("/brand/logo.webp")}
          alt="Ikorodu Realtors - Discover, Connect, Own"
          width={900}
          height={600}
          unoptimized
          priority
          className="h-auto w-full"
        />
      </div>
      <div className="splash-bar mt-6 h-[3px] w-40 overflow-hidden rounded-full bg-stone-200">
        <div className="splash-fill h-full w-full origin-left rounded-full bg-[#C9962B]" />
      </div>
    </div>
  );
}

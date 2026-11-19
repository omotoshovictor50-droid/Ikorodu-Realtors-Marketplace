"use client";

import { useRef } from "react";
import { AREAS as areas, CATEGORIES as categories } from "@/lib/listings";
import { mailtoLink, whatsappText } from "@/lib/contact";

const field =
  "mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700";

export default function SellPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const build = () => {
    const f = formRef.current;
    if (!f || !f.reportValidity()) return null;
    const d = new FormData(f);
    const g = (k: string) => String(d.get(k) || "").trim() || "-";
    return `I want to list a property on Ikorodu Realtors.\nName: ${g("name")}\nPhone: ${g("phone")}\nProperty type: ${g("type")}\nArea: ${g("area")}\nAsking price (₦): ${g("price")}\nDetails: ${g("details")}`;
  };

  const send = (via: "wa" | "mail") => {
    const text = build();
    if (!text) return;
    const url =
      via === "wa" ? whatsappText(text) : mailtoLink("List my property", text);
    window.open(url, via === "wa" ? "_blank" : "_self", "noopener");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-900">List your property with us</h1>
      <p className="mt-2 text-stone-600">
        Tell us about your property and we will contact you. Your details are
        sent straight to our WhatsApp or email.
      </p>

      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        className="mt-8 grid gap-4 rounded-2xl border border-stone-200 bg-white p-6"
      >
        <label className="text-sm font-medium text-stone-700">
          Your name
          <input name="name" required className={field} />
        </label>
        <label className="text-sm font-medium text-stone-700">
          Phone number
          <input name="phone" type="tel" required className={field} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-stone-700">
            Property type
            <select name="type" className={field}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-stone-700">
            Area
            <select name="area" className={field}>
              {areas.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="text-sm font-medium text-stone-700">
          Asking price (₦)
          <input name="price" inputMode="numeric" placeholder="e.g. 45000000" className={field} />
        </label>
        <label className="text-sm font-medium text-stone-700">
          Details
          <textarea name="details" rows={4} placeholder="Bedrooms, size, street, documents…" className={field} />
        </label>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={() => send("wa")}
            className="btn-live glow-green rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-stone-900"
          >
            Send on WhatsApp
          </button>
          <button
            type="button"
            onClick={() => send("mail")}
            className="btn-live glow-forest rounded-lg border border-[#0F3D2E] px-6 py-3 text-sm font-semibold text-[#0F3D2E]"
          >
            Send by Email
          </button>
        </div>
      </form>
    </div>
  );
}

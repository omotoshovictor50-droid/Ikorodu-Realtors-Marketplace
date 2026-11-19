import Link from "next/link";
import { pages, steps } from "@/data/content";
import { ENQUIRY_EMAIL, whatsappLink } from "@/lib/contact";

export function AboutSection() {
  const about = pages.about.blocks
    .flatMap((b) => (b.t === "p" ? [b.x] : []))
    .slice(0, 2);
  return (
    <section className="bg-white py-14">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">About Us</p>
          <h2 className="mt-2 text-3xl font-bold text-stone-900">Ikorodu’s digital property marketplace</h2>
        </div>
        <div>
          {about.map((b) => (
            <p key={b} className="mb-4 leading-relaxed text-stone-700">{b}</p>
          ))}
          <Link href="/about" className="font-semibold text-[#0F3D2E] underline">
            Read more about us
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PartnersSection() {
  return (
    <section className="bg-[#0F3D2E] py-14 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Realtor Partnerships</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-bold">Reach more customers in Ikorodu</h2>
        <p className="mt-3 max-w-3xl text-emerald-100">
          Independent agents, property owners and developers can submit listings, photographs and
          videos for publication, and receive customer enquiries through our platform. Any referral
          arrangement is set out in a separate written agreement.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/sell" className="btn-live glow-amber inline-block rounded-lg bg-amber-400 px-6 py-3 font-semibold text-stone-900">
            List a property
          </Link>
          <Link href="/partners" className="btn-live glow-white inline-block rounded-lg border border-white/60 px-6 py-3 font-semibold">
            How partnerships work
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-stone-900">How it works</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {steps.map(([n, title, text]) => (
            <div key={n} className="rounded-2xl border border-stone-200 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F3D2E] font-bold text-white">{n}</div>
              <h3 className="mt-4 font-bold text-stone-900">{title}</h3>
              <p className="mt-1 text-sm text-stone-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-stone-900">Contact us</h2>
        <p className="mt-2 max-w-2xl text-stone-600">
          Property enquiries, inspection requests and partnership enquiries.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-live glow-green inline-block rounded-lg bg-[#25D366] px-6 py-3 font-semibold text-stone-900">
            WhatsApp +234 913 925 5152
          </a>
          <a href={`mailto:${ENQUIRY_EMAIL}`} className="btn-live glow-forest inline-block rounded-lg border border-[#0F3D2E] px-6 py-3 font-semibold text-[#0F3D2E]">
            {ENQUIRY_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}

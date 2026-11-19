import Link from "next/link";
import { pages } from "@/data/content";

const ctaCls: Record<string, string> = {
  pri: "btn-live glow-amber bg-amber-400 text-stone-900",
  wa: "btn-live glow-green bg-[#25D366] text-stone-900",
  sec: "btn-live glow-forest border border-[#0F3D2E] text-[#0F3D2E]",
};

export default function ContentPage({ slug }: { slug: string }) {
  const page = pages[slug];
  return (
    <>
      <section className="bg-[#0F3D2E] py-14 text-white">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">
            Ikorodu Realtors
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{page.title}</h1>
          <p className="mt-3 max-w-2xl text-emerald-100">{page.sub}</p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-10">
        {page.blocks.map((b, i) => {
          if (b.t === "h")
            return (
              <h2 key={i} className="mb-2 mt-8 text-xl font-bold text-stone-900">
                {b.x}
              </h2>
            );
          if (b.t === "p")
            return (
              <p key={i} className="mb-4 leading-relaxed text-stone-700">
                {b.x}
              </p>
            );
          if (b.t === "ul")
            return (
              <ul key={i} className="mb-4 list-disc space-y-1 pl-6 text-stone-700">
                {b.x.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            );
          return (
            <dl key={i} className="mb-4 grid gap-3 sm:grid-cols-2">
              {b.x.map(([term, desc]) => (
                <div key={term} className="rounded-xl border border-stone-200 bg-white p-4">
                  <dt className="font-semibold text-[#0F3D2E]">{term}</dt>
                  <dd className="mt-1 text-sm text-stone-600">{desc}</dd>
                </div>
              ))}
            </dl>
          );
        })}

        {page.cta && (
          <div className="mt-8 flex flex-wrap gap-3">
            {page.cta.map(([label, href, kind]) => {
              const cls = `inline-block rounded-lg px-6 py-3 text-sm font-semibold ${ctaCls[kind]}`;
              return /^(https?:|mailto:)/.test(href) ? (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>
                  {label}
                </a>
              ) : (
                <Link key={label} href={href} className={cls}>
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </article>
    </>
  );
}

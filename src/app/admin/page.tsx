"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { Listing, blankListing } from "@/lib/listings";
import { adminList, deleteListing, quickUpdate } from "@/lib/admin-api";
import { formatPrice } from "@/data/properties";
import LoginForm from "@/components/admin/LoginForm";
import ListingEditor from "@/components/admin/ListingEditor";
import MfaGate from "@/components/admin/MfaGate";
import NewPassword from "@/components/admin/NewPassword";
import { IDLE_MINUTES } from "@/lib/admin-config";

function Setup() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-bold text-[#0F3D2E]">Connect your database first</h1>
      <p className="mt-3 text-stone-700">
        The admin page needs a free Supabase database to store listings, photos and videos. Until it is connected,
        the website shows its built-in sample listings.
      </p>
      <p className="mt-3 text-stone-700">
        Follow the numbered steps in <strong>ADMIN-SETUP.md</strong> (included in the project folder). It takes about 10 minutes and needs no coding.
      </p>
    </div>
  );
}

function Dashboard({ name }: { name: string }) {
  const [rows, setRows] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ listing: Listing; isNew: boolean } | null>(null);
  const [q, setQ] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setRows(await adminList()); setError(null); }
    catch (e) { setError((e as Error).message); }
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  // Automatic sign-out after a period of inactivity
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(t);
      t = setTimeout(() => supabase?.auth.signOut(), IDLE_MINUTES * 60000);
    };
    const ev = ["pointerdown", "keydown", "scroll", "touchstart"];
    ev.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => { clearTimeout(t); ev.forEach((e) => window.removeEventListener(e, reset)); };
  }, []);

  const patch = async (id: string, p: Record<string, unknown>) => {
    try { await quickUpdate(id, p); await load(); }
    catch (e) { setError((e as Error).message); }
  };

  if (editing)
    return (
      <ListingEditor
        key={editing.listing.id}
        initial={editing.listing}
        isNew={editing.isNew}
        onDone={(saved) => {
          setEditing(null);
          if (saved) { setNotice("Saved. The website shows the change right away."); load(); }
        }}
      />
    );

  const shown = rows.filter((r) => `${r.title} ${r.ref} ${r.area}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0F3D2E]">Property listings</h1>
          <p className="text-sm text-stone-500">Signed in as {name} · auto sign-out after {IDLE_MINUTES} min of inactivity</p>
        </div>
        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link href="/" target="_blank" className="text-[#0F3D2E] underline">View website</Link>
          <button type="button" onClick={() => supabase?.auth.signOut()} className="text-stone-600 underline">Sign out</button>
          <button type="button" onClick={() => setEditing({ listing: blankListing(), isNew: true })}
            className="btn-live glow-amber rounded-lg bg-amber-400 px-5 py-2.5 text-stone-900">+ Add property</button>
        </div>
      </div>

      {notice && <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-800">{notice}</p>}
      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title, reference or area"
        className="mt-5 w-full max-w-md rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700" />

      <div className="mt-4 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase text-stone-500">
            <tr>
              <th className="px-4 py-3">Property</th><th className="px-4 py-3">Asking / Net</th>
              <th className="px-4 py-3">Status</th><th className="px-4 py-3">On website</th><th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id} className="border-b border-stone-100 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {r.images[0] ? <img src={r.images[0]} alt="" className="h-12 w-16 rounded object-cover" /> : <div className="h-12 w-16 rounded bg-stone-100" />}
                    <div>
                      <div className="font-semibold text-stone-900">{r.title}</div>
                      <div className="text-xs text-stone-500">{r.ref} · {r.category} · {r.area}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3"><div>{formatPrice(r.price)}</div><div className="text-xs text-emerald-700">{formatPrice(r.netPrice)}</div></td>
                <td className="px-4 py-3">
                  <select value={r.status} onChange={(e) => patch(r.id, { status: e.target.value })} className="rounded border border-stone-300 px-2 py-1">
                    <option>Available</option><option>Sold</option><option>Unavailable</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={r.published} onChange={(e) => patch(r.id, { published: e.target.checked })} className="h-4 w-4" />
                    {r.published ? "Visible" : "Hidden"}
                  </label>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <button type="button" onClick={() => setEditing({ listing: r, isNew: false })} className="font-semibold text-[#0F3D2E] underline">Edit</button>
                  <button type="button" className="ml-4 font-semibold text-red-600 underline"
                    onClick={async () => {
                      if (!confirm(`Delete “${r.title}”? This cannot be undone.`)) return;
                      try { await deleteListing(r); await load(); } catch (e) { setError((e as Error).message); }
                    }}>Delete</button>
                </td>
              </tr>
            ))}
            {!loading && shown.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-stone-500">{rows.length ? "No matches." : "No properties yet. Click “Add property” to create the first one."}</td></tr>
            )}
          </tbody>
        </table>
        {loading && <p className="p-4 text-sm text-stone-500">Loading…</p>}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [recovery, setRecovery] = useState(false);
  const [tick, setTick] = useState(0);
  const [stage, setStage] = useState<"loading" | "login" | "mfa" | "recovery" | "ready">("loading");

  useEffect(() => {
    if (!supabase) { setSession(null); return; }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase || session === undefined) return;
    if (!session) { setStage("login"); return; }
    let off = false;
    supabase.auth.mfa.getAuthenticatorAssuranceLevel().then(({ data }) => {
      if (off) return;
      const aal2 = data?.currentLevel === "aal2";
      if (recovery) setStage(!aal2 && data?.nextLevel === "aal2" ? "mfa" : "recovery");
      else setStage(aal2 ? "ready" : "mfa");
    });
    return () => { off = true; };
  }, [session, recovery, tick]);

  if (!supabaseConfigured) return <Setup />;
  if (stage === "loading") return <p className="p-10 text-center text-stone-500">Loading…</p>;
  if (stage === "login") return <LoginForm />;
  if (stage === "mfa") return <MfaGate onVerified={() => setTick((t) => t + 1)} />;
  if (stage === "recovery")
    return <NewPassword onDone={() => { setRecovery(false); setTick((t) => t + 1); }} />;
  const meta = session?.user.user_metadata as { full_name?: string } | undefined;
  return <Dashboard name={meta?.full_name || session?.user.email || "admin"} />;
}

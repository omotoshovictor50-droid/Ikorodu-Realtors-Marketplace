"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Second step of sign-in: a 6-digit code from an authenticator app
// (Google Authenticator, Microsoft Authenticator, Authy...). The first time,
// the owner scans a QR code to link the app.
export default function MfaGate({ onVerified }: { onVerified: () => void }) {
  const [mode, setMode] = useState<"loading" | "enroll" | "verify">("loading");
  const [factorId, setFactorId] = useState("");
  const [qr, setQr] = useState("");
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    let off = false;
    (async () => {
      const { data: f, error: fe } = await supabase.auth.mfa.listFactors();
      if (off) return;
      if (fe) { setError(fe.message); return; }
      const verified = f?.totp?.[0];
      if (verified) { setFactorId(verified.id); setMode("verify"); return; }
      for (const x of f?.all ?? []) if (x.status === "unverified") await supabase.auth.mfa.unenroll({ factorId: x.id });
      const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: `Ikorodu admin ${Date.now()}` });
      if (off) return;
      if (error || !data) { setError(error?.message ?? "Could not start two-step setup"); return; }
      setFactorId(data.id);
      setQr(data.totp.qr_code);
      setSecret(data.totp.secret);
      setMode("enroll");
    })();
    return () => { off = true; };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { data: ch, error: ce } = await supabase.auth.mfa.challenge({ factorId });
    if (ce || !ch) { setError(ce?.message ?? "Try again"); setBusy(false); return; }
    const { error } = await supabase.auth.mfa.verify({ factorId, challengeId: ch.id, code: code.trim() });
    setBusy(false);
    if (error) { setError("That code is not right. Check the app and try again."); setCode(""); return; }
    onVerified();
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 py-8">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-bold text-[#0F3D2E]">Two-step verification</h1>
        {mode === "loading" && <p className="mt-4 text-sm text-stone-500">Loading…</p>}
        {mode === "enroll" && (
          <>
            <p className="mt-2 text-sm text-stone-600">
              First-time setup. Open an authenticator app (Google Authenticator or Microsoft Authenticator),
              add an account, and scan this code.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qr} alt="QR code to link your authenticator app" className="mx-auto mt-4 h-44 w-44" />
            <p className="mt-2 break-all text-center text-xs text-stone-500">Can’t scan? Enter this key: <span className="font-mono">{secret}</span></p>
          </>
        )}
        {mode === "verify" && <p className="mt-2 text-sm text-stone-600">Enter the 6-digit code from your authenticator app.</p>}
        {mode !== "loading" && (
          <>
            <label className="mt-5 block text-sm font-medium text-stone-700">
              6-digit code
              <input inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-3 text-center text-xl tracking-[0.4em] focus:outline-none focus:ring-2 focus:ring-emerald-700" />
            </label>
            <button type="submit" disabled={busy || code.length !== 6}
              className="btn-live glow-forest mt-5 w-full rounded-lg bg-[#0F3D2E] py-3 text-sm font-semibold text-white disabled:opacity-60">
              {busy ? "Checking…" : mode === "enroll" ? "Link app and continue" : "Verify"}
            </button>
          </>
        )}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button type="button" onClick={() => supabase?.auth.signOut()} className="mt-4 w-full text-center text-sm text-stone-500 underline">Cancel and sign out</button>
      </form>
    </div>
  );
}

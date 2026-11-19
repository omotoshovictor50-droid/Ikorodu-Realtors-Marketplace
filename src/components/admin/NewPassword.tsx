"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewPassword({ onDone }: { onDone: () => void }) {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    if (pw.length < 12) return setError("Use at least 12 characters.");
    if (pw !== pw2) return setError("The two passwords do not match.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) return setError(error.message);
    onDone();
  };

  const cls = "mt-1 w-full rounded-lg border border-stone-300 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-700";
  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 py-8">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-bold text-[#0F3D2E]">Set a new password</h1>
        <p className="mt-1 text-sm text-stone-500">At least 12 characters. Use a long phrase you do not use anywhere else.</p>
        <label className="mt-5 block text-sm font-medium text-stone-700">New password
          <input type="password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} className={cls} /></label>
        <label className="mt-4 block text-sm font-medium text-stone-700">Repeat new password
          <input type="password" autoComplete="new-password" value={pw2} onChange={(e) => setPw2(e.target.value)} className={cls} /></label>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={busy} className="btn-live glow-forest mt-6 w-full rounded-lg bg-[#0F3D2E] py-3 text-sm font-semibold text-white disabled:opacity-60">
          {busy ? "Saving…" : "Save password"}
        </button>
      </form>
    </div>
  );
}

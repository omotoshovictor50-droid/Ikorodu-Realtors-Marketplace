"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ADMIN_EMAIL, ADMIN_USERNAME, LOCK_MINUTES, MAX_FAILED_LOGINS } from "@/lib/admin-config";

const KEY = "ik_login_guard";
const read = (): { n: number; until: number } => {
  try { return JSON.parse(localStorage.getItem(KEY) || "") || { n: 0, until: 0 }; } catch { return { n: 0, until: 0 }; }
};
const write = (v: { n: number; until: number }) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} };

const masked = ADMIN_EMAIL.replace(/^(.).*(@.*)$/, "$1•••••$2");
const inp = "mt-1 w-full rounded-lg border border-stone-300 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-700";

export default function LoginForm() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setError(null);
    setInfo(null);
    const g = read();
    if (g.until > Date.now()) {
      setError(`Too many wrong attempts. Try again in ${Math.ceil((g.until - Date.now()) / 60000)} minutes.`);
      return;
    }
    const id = user.trim();
    const email = id.includes("@") ? id : id.toLowerCase() === ADMIN_USERNAME.toLowerCase() ? ADMIN_EMAIL : id;
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      const n = g.n + 1;
      write(n >= MAX_FAILED_LOGINS ? { n: 0, until: Date.now() + LOCK_MINUTES * 60000 } : { n, until: 0 });
      setError("Wrong username or password.");
    } else write({ n: 0, until: 0 });
  };

  const forgot = async () => {
    if (!supabase) return;
    setError(null);
    const redirectTo = `${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH || ""}/admin/`;
    await supabase.auth.resetPasswordForEmail(ADMIN_EMAIL, { redirectTo });
    setInfo(`If the account exists, a reset link has been sent to ${masked}. Open it on this device.`);
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 py-8">
      <form onSubmit={submit} autoComplete="on" className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-bold text-[#0F3D2E]">Ikorodu Realtors Admin</h1>
        <p className="mt-1 text-sm text-stone-500">Authorised staff only.</p>
        <label className="mt-6 block text-sm font-medium text-stone-700">
          Username or email
          <input value={user} onChange={(e) => setUser(e.target.value)} required autoComplete="username" className={inp} />
        </label>
        <label className="mt-4 block text-sm font-medium text-stone-700">
          Password
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className={inp} />
        </label>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        {info && <p className="mt-3 text-sm text-emerald-700">{info}</p>}
        <button type="submit" disabled={busy}
          className="btn-live glow-forest mt-6 w-full rounded-lg bg-[#0F3D2E] py-3 text-sm font-semibold text-white disabled:opacity-60">
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <button type="button" onClick={forgot} className="mt-4 w-full text-center text-sm font-semibold text-[#0F3D2E] underline">
          Forgot password? Email me a reset link
        </button>
      </form>
    </div>
  );
}
